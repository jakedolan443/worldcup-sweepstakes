#!/usr/bin/env python3
"""
Generate a World Cup sweepstakes bingo/lotto-style MP4.

Data snapshot:
- Qualified teams: FIFA qualified teams article crawled May 2026.
- Rankings: FIFA/Coca-Cola Men's World Ranking, official update 1 April 2026.
"""

from __future__ import annotations

import argparse
import json
import logging
import math
import os
import random
import subprocess
import sys
import tempfile
import wave
from dataclasses import dataclass
from pathlib import Path
from typing import Any

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont


WIDTH = 1920
HEIGHT = 1080
FPS = 30


@dataclass(frozen=True)
class Team:
    name: str
    code: str
    confederation: str
    fifa_rank: int
    points: float


@dataclass(frozen=True)
class PlayerDraw:
    name: str
    teams: list[Team]


TEAMS: list[Team] = [
    Team("France", "FRA", "UEFA", 1, 1877.32),
    Team("Spain", "ESP", "UEFA", 2, 1876.40),
    Team("Argentina", "ARG", "CONMEBOL", 3, 1874.81),
    Team("England", "ENG", "UEFA", 4, 1825.97),
    Team("Portugal", "POR", "UEFA", 5, 1763.83),
    Team("Brazil", "BRA", "CONMEBOL", 6, 1761.16),
    Team("Netherlands", "NED", "UEFA", 7, 1757.87),
    Team("Morocco", "MAR", "CAF", 8, 1755.87),
    Team("Belgium", "BEL", "UEFA", 9, 1734.71),
    Team("Germany", "GER", "UEFA", 10, 1730.37),
    Team("Croatia", "CRO", "UEFA", 11, 1717.07),
    Team("Colombia", "COL", "CONMEBOL", 13, 1693.09),
    Team("Senegal", "SEN", "CAF", 15, 1681.03),
    Team("Mexico", "MEX", "CONCACAF", 14, 1688.99),
    Team("United States", "USA", "CONCACAF", 16, 1673.13),
    Team("Uruguay", "URU", "CONMEBOL", 17, 1673.07),
    Team("Japan", "JPN", "AFC", 18, 1660.43),
    Team("Switzerland", "SUI", "UEFA", 19, 1649.40),
    Team("IR Iran", "IRN", "AFC", 21, 1615.30),
    Team("Turkiye", "TUR", "UEFA", 22, 1599.04),
    Team("Ecuador", "ECU", "CONMEBOL", 23, 1594.78),
    Team("Austria", "AUT", "UEFA", 24, 1593.45),
    Team("Korea Republic", "KOR", "AFC", 25, 1588.66),
    Team("Australia", "AUS", "AFC", 27, 1580.67),
    Team("Algeria", "ALG", "CAF", 28, 1564.26),
    Team("Egypt", "EGY", "CAF", 29, 1563.24),
    Team("Canada", "CAN", "CONCACAF", 30, 1556.48),
    Team("Norway", "NOR", "UEFA", 31, 1550.94),
    Team("Panama", "PAN", "CONCACAF", 33, 1540.64),
    Team("Cote d'Ivoire", "CIV", "CAF", 34, 1532.98),
    Team("Sweden", "SWE", "UEFA", 38, 1514.77),
    Team("Paraguay", "PAR", "CONMEBOL", 40, 1503.50),
    Team("Czechia", "CZE", "UEFA", 41, 1501.38),
    Team("Scotland", "SCO", "UEFA", 43, 1498.35),
    Team("Tunisia", "TUN", "CAF", 44, 1483.05),
    Team("Congo DR", "COD", "CAF", 46, 1478.35),
    Team("Uzbekistan", "UZB", "AFC", 50, 1465.34),
    Team("Qatar", "QAT", "AFC", 61, 1421.43),
    Team("Iraq", "IRQ", "AFC", 65, 1385.84),
    Team("South Africa", "RSA", "CAF", 60, 1429.73),
    Team("Saudi Arabia", "KSA", "AFC", 55, 1454.96),
    Team("Jordan", "JOR", "AFC", 63, 1391.45),
    Team("Bosnia and Herzegovina", "BIH", "UEFA", 57, 1447.14),
    Team("Cabo Verde", "CPV", "CAF", 69, 1366.13),
    Team("Ghana", "GHA", "CAF", 74, 1346.31),
    Team("Curacao", "CUW", "CONCACAF", 82, 1294.65),
    Team("Haiti", "HAI", "CONCACAF", 83, 1291.71),
    Team("New Zealand", "NZL", "OFC", 85, 1281.57),
]


CONFED_COLORS = {
    "AFC": (219, 54, 70),
    "CAF": (28, 146, 96),
    "CONCACAF": (42, 126, 214),
    "CONMEBOL": (244, 196, 48),
    "OFC": (86, 202, 214),
    "UEFA": (104, 84, 214),
}


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf",
    ]
    for candidate in candidates:
        if os.path.exists(candidate):
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


FONTS = {
    "title": font(42, True),
    "subtitle": font(24, False),
    "card_name": font(23, True),
    "team": font(20, True),
    "team_small": font(16, True),
    "tiny": font(13, False),
    "badge": font(16, True),
    "number": font(22, True),
}


def load_players(path: Path) -> list[str]:
    raw = json.loads(path.read_text(encoding="utf-8"))
    players_raw = raw.get("players", raw if isinstance(raw, list) else None)
    if not isinstance(players_raw, list):
        raise ValueError("Player JSON must be a list or an object with a 'players' list.")
    if not players_raw:
        raise ValueError("Player JSON must contain at least one player.")

    players: list[str] = []
    for index, item in enumerate(players_raw, start=1):
        name = ""
        if isinstance(item, str):
            name = item.strip()
        elif isinstance(item, dict):
            name = str(item.get("name", "")).strip()
        else:
            raise ValueError(f"Player {index} must be a string or object.")
        players.append(name or f"Player {index}")
    return players


def prepare_draw(players: list[str], seed: int) -> tuple[list[PlayerDraw], list[Team]]:
    if len(players) > len(TEAMS):
        raise ValueError(f"{len(players)} players is more than the {len(TEAMS)} available teams.")

    remainder = len(TEAMS) % len(players)
    teams_per_player = len(TEAMS) // len(players)
    logging.info("%s teams / %s players = %s team(s) each, remainder %s.", len(TEAMS), len(players), teams_per_player, remainder)

    trimmed: list[Team] = []
    eligible = list(TEAMS)
    if remainder:
        trimmed = sorted(eligible, key=lambda team: team.fifa_rank, reverse=True)[:remainder]
        trimmed_names = ", ".join(f"{team.name} (rank {team.fifa_rank})" for team in trimmed)
        logging.info("Removing %s lowest-ranked team(s) to make the draw even: %s", remainder, trimmed_names)
        trimmed_codes = {team.code for team in trimmed}
        eligible = [team for team in eligible if team.code not in trimmed_codes]

    teams_per_player = len(eligible) // len(players)
    rng = random.Random(seed)
    rng.shuffle(eligible)

    draws: list[PlayerDraw] = []
    for index, player in enumerate(players):
        assigned = eligible[index * teams_per_player : (index + 1) * teams_per_player]
        draws.append(PlayerDraw(player, assigned))
        logging.info("%s: %s", player, ", ".join(team.name for team in assigned))
    return draws, trimmed


def rounded_rect(draw: ImageDraw.ImageDraw, xy: tuple[int, int, int, int], radius: int, fill: tuple[int, int, int, int], outline=None, width=1) -> None:
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)


def text_width(draw: ImageDraw.ImageDraw, text: str, fnt: ImageFont.ImageFont) -> int:
    box = draw.textbbox((0, 0), text, font=fnt)
    return box[2] - box[0]


def fit_text(draw: ImageDraw.ImageDraw, text: str, max_width: int, fnt: ImageFont.ImageFont) -> str:
    if text_width(draw, text, fnt) <= max_width:
        return text
    ellipsis = "..."
    candidate = text
    while candidate and text_width(draw, candidate + ellipsis, fnt) > max_width:
        candidate = candidate[:-1]
    return (candidate.rstrip() + ellipsis) if candidate else text[:1]


def make_background() -> Image.Image:
    img = Image.new("RGB", (WIDTH, HEIGHT), (6, 27, 40))
    arr = np.zeros((HEIGHT, WIDTH, 3), dtype=np.uint8)
    yy = np.linspace(0, 1, HEIGHT)[:, None]
    xx = np.linspace(0, 1, WIDTH)[None, :]
    red = 7 + 12 * (1 - yy) + 8 * np.sin(xx * math.pi)
    green = 32 + 30 * (1 - yy) + np.zeros_like(xx)
    blue = 52 + 44 * (1 - yy) + np.zeros_like(xx)
    sky = np.stack(
        [
            np.broadcast_to(red, (HEIGHT, WIDTH)),
            np.broadcast_to(green, (HEIGHT, WIDTH)),
            np.broadcast_to(blue, (HEIGHT, WIDTH)),
        ],
        axis=2,
    )
    arr[:] = np.clip(sky, 0, 255).astype(np.uint8)
    img = Image.fromarray(arr, "RGB")
    draw = ImageDraw.Draw(img, "RGBA")

    # Stadium glow and pitch
    for i, x in enumerate(range(-80, WIDTH + 120, 160)):
        color = [(226, 49, 65), (255, 212, 73), (46, 166, 107), (50, 132, 220), (255, 255, 255)][i % 5]
        draw.polygon([(x, 74), (x + 90, 74), (x + 45, 132)], fill=(*color, 190))
    draw.rectangle((0, 868, WIDTH, HEIGHT), fill=(20, 110, 62, 255))
    for x in range(-160, WIDTH + 200, 260):
        draw.arc((x, 870, x + 320, 1160), 195, 345, fill=(255, 255, 255, 46), width=3)
    draw.line((0, 918, WIDTH, 918), fill=(255, 255, 255, 42), width=3)
    draw.ellipse((WIDTH // 2 - 155, 884, WIDTH // 2 + 155, 1194), outline=(255, 255, 255, 52), width=3)

    for x, y, r, a in [(185, 90, 190, 56), (1710, 120, 220, 46), (960, 40, 260, 36)]:
        for radius in range(r, 20, -18):
            alpha = max(0, int(a * radius / r))
            draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=(255, 255, 220, alpha))

    return img.filter(ImageFilter.GaussianBlur(0.2))


def draw_wheel(draw: ImageDraw.ImageDraw, cx: int, cy: int, radius: int, angle: float, phase: float, confed: str) -> None:
    confed_color = CONFED_COLORS.get(confed, (230, 230, 230))
    draw.ellipse((cx - radius - 7, cy - radius - 7, cx + radius + 7, cy + radius + 7), fill=(8, 12, 20, 170), outline=(255, 255, 255, 90), width=2)
    for i in range(12):
        start = angle + i * 30
        fill = (*confed_color, 210) if i % 2 == 0 else (246, 246, 246, 205)
        draw.pieslice((cx - radius, cy - radius, cx + radius, cy + radius), start=start, end=start + 30, fill=fill)
    draw.ellipse((cx - radius + 15, cy - radius + 15, cx + radius - 15, cy + radius - 15), fill=(15, 27, 42, 210), outline=(255, 255, 255, 125), width=2)
    for i in range(8):
        spoke = angle + i * 45
        ex = cx + math.cos(math.radians(spoke)) * (radius - 9)
        ey = cy + math.sin(math.radians(spoke)) * (radius - 9)
        draw.line((cx, cy, ex, ey), fill=(255, 255, 255, 95), width=2)
    ball_angle = math.radians(-angle * 1.9 + phase * 720)
    bx = cx + math.cos(ball_angle) * (radius - 8)
    by = cy + math.sin(ball_angle) * (radius - 8)
    draw.ellipse((bx - 7, by - 7, bx + 7, by + 7), fill=(255, 255, 255, 245), outline=(35, 35, 35, 190), width=1)
    draw.ellipse((cx - 7, cy - 7, cx + 7, cy + 7), fill=(255, 226, 88, 240))


def team_for_card(draw_item: PlayerDraw, reveal_index: int) -> Team:
    reveal_index = min(max(reveal_index, 0), len(draw_item.teams) - 1)
    return draw_item.teams[reveal_index]


def card_positions(count: int) -> list[tuple[int, int, int, int]]:
    cols = 5
    card_w = 344
    card_h = 205
    gap_x = 20
    gap_y = 16
    start_x = (WIDTH - (cols * card_w + (cols - 1) * gap_x)) // 2
    start_y = 143
    positions = []
    for i in range(count):
        row = i // cols
        col = i % cols
        x = start_x + col * (card_w + gap_x)
        y = start_y + row * (card_h + gap_y)
        positions.append((x, y, card_w, card_h))
    return positions


def draw_team_slot(draw: ImageDraw.ImageDraw, x: int, y: int, w: int, team: Team | None, label: str, revealed: bool) -> None:
    fill = (245, 248, 250, 236) if revealed else (18, 30, 44, 205)
    outline = (255, 255, 255, 90) if not revealed else (255, 255, 255, 160)
    rounded_rect(draw, (x, y, x + w, y + 38), 8, fill, outline, 1)
    if revealed and team:
        color = CONFED_COLORS.get(team.confederation, (42, 42, 42))
        draw.rounded_rectangle((x + 8, y + 7, x + 51, y + 31), radius=6, fill=(*color, 245))
        draw.text((x + 29, y + 19), team.code, font=FONTS["badge"], fill=(255, 255, 255), anchor="mm")
        name = fit_text(draw, team.name, w - 77, FONTS["team"])
        draw.text((x + 60, y + 19), name, font=FONTS["team"], fill=(10, 20, 28), anchor="lm")
    else:
        draw.text((x + 16, y + 19), label, font=FONTS["team_small"], fill=(190, 204, 218), anchor="lm")


def render_frame(background: Image.Image, draws: list[PlayerDraw], frame: int, total_frames: int, duration: float) -> bytes:
    t = frame / FPS
    img = background.copy()
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay, "RGBA")

    draw.rectangle((0, 0, WIDTH, 120), fill=(2, 11, 24, 140))
    draw.text((WIDTH // 2, 42), "WORLD CUP SWEEPSTAKES DRAW", font=FONTS["title"], fill=(255, 255, 255), anchor="mm")
    draw.text((WIDTH // 2, 86), "17 simultaneous bingo cards - teams revealed from a spinning wheel", font=FONTS["subtitle"], fill=(215, 226, 235), anchor="mm")

    first_reveal = duration * 0.48
    second_reveal = duration * 0.78
    positions = card_positions(len(draws))
    for idx, (draw_item, (x, y, w, h)) in enumerate(zip(draws, positions)):
        jitter = (idx * 0.137) % 1
        card_alpha = 216
        rounded_rect(draw, (x + 4, y + 5, x + w + 4, y + h + 5), 12, (0, 0, 0, 96))
        rounded_rect(draw, (x, y, x + w, y + h), 12, (248, 250, 252, card_alpha), (255, 255, 255, 165), 1)
        draw.rectangle((x, y, x + w, y + 45), fill=(7, 23, 42, 230))
        draw.text((x + 18, y + 23), fit_text(draw, draw_item.name, w - 88, FONTS["card_name"]), font=FONTS["card_name"], fill=(255, 255, 255), anchor="lm")
        draw.text((x + w - 24, y + 23), str(idx + 1), font=FONTS["number"], fill=(255, 220, 78), anchor="mm")

        reveal_count = 0
        if t >= first_reveal:
            reveal_count = 1
        if len(draw_item.teams) > 1 and t >= second_reveal:
            reveal_count = 2

        current_reveal_index = 0 if t < second_reveal else min(1, len(draw_item.teams) - 1)
        spin_target = first_reveal if t < second_reveal else second_reveal
        spin_phase = min(1.0, max(0.0, t / spin_target if spin_target else 1.0))
        if t >= first_reveal and t < second_reveal:
            spin_phase = min(1.0, max(0.0, (t - first_reveal) / (second_reveal - first_reveal)))
        if t >= second_reveal:
            spin_phase = 1.0

        spin_speed = (1 - min(spin_phase, 1)) ** 2 * 44 + 1.6
        angle = 270 + (t * 165 * spin_speed) + idx * 29
        active_team = team_for_card(draw_item, current_reveal_index)
        draw_wheel(draw, x + 69, y + 105, 42, angle, jitter, active_team.confederation)

        if reveal_count:
            draw.text((x + 69, y + 166), "LOCKED", font=FONTS["tiny"], fill=(15, 70, 46), anchor="mm")
        else:
            draw.text((x + 69, y + 166), "SPINNING", font=FONTS["tiny"], fill=(120, 78, 18), anchor="mm")

        slot_x = x + 128
        draw_team_slot(draw, slot_x, y + 72, w - 146, draw_item.teams[0] if reveal_count >= 1 else None, "Team 1 drawing...", reveal_count >= 1)
        second_team = draw_item.teams[1] if len(draw_item.teams) > 1 else None
        draw_team_slot(draw, slot_x, y + 122, w - 146, second_team if reveal_count >= 2 else None, "Team 2 drawing...", reveal_count >= 2)

        if reveal_count == len(draw_item.teams):
            draw.rounded_rectangle((x + w - 93, y + h - 30, x + w - 13, y + h - 9), radius=7, fill=(13, 111, 69, 220))
            draw.text((x + w - 53, y + h - 19), "DONE", font=FONTS["tiny"], fill=(255, 255, 255), anchor="mm")

    progress_w = 760
    progress = min(1.0, frame / max(1, total_frames - 1))
    px = (WIDTH - progress_w) // 2
    py = HEIGHT - 46
    draw.rounded_rectangle((px, py, px + progress_w, py + 14), radius=7, fill=(255, 255, 255, 58))
    draw.rounded_rectangle((px, py, px + int(progress_w * progress), py + 14), radius=7, fill=(255, 218, 74, 210))

    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    return img.tobytes()


def make_audio(path: Path, duration: float, reveal_times: list[float], sample_rate: int = 44100) -> None:
    n = int(duration * sample_rate)
    t = np.arange(n) / sample_rate
    spin_env = np.clip(1 - (t / duration) * 0.45, 0.16, 1.0)
    hum = 0.035 * np.sin(2 * np.pi * (95 + 18 * np.sin(t * 2.2)) * t) * spin_env
    whir = 0.020 * np.sin(2 * np.pi * (420 + 120 * np.sin(t * 4.4)) * t) * spin_env
    audio = hum + whir

    click_rate = 18 + 22 * (1 - t / duration)
    click_phase = np.cumsum(click_rate) / sample_rate
    clicks = (np.diff(np.floor(click_phase), prepend=0) > 0).astype(float)
    kernel_t = np.arange(int(sample_rate * 0.018)) / sample_rate
    kernel = np.sin(2 * np.pi * 1700 * kernel_t) * np.exp(-kernel_t * 170)
    audio += 0.11 * np.convolve(clicks, kernel, mode="same")

    for reveal_time in reveal_times:
        start = int(reveal_time * sample_rate)
        bell_t = np.arange(int(sample_rate * 0.85)) / sample_rate
        bell = (
            0.19 * np.sin(2 * np.pi * 880 * bell_t)
            + 0.09 * np.sin(2 * np.pi * 1320 * bell_t)
        ) * np.exp(-bell_t * 4.2)
        end = min(n, start + len(bell))
        audio[start:end] += bell[: end - start]

    audio = np.clip(audio, -0.95, 0.95)
    pcm = (audio * 32767).astype(np.int16)
    with wave.open(str(path), "wb") as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(sample_rate)
        wav.writeframes(pcm.tobytes())


def write_results(path: Path, draws: list[PlayerDraw], trimmed: list[Team], seed: int) -> None:
    data = {
        "seed": seed,
        "teams_source": "FIFA 2026 qualified teams snapshot",
        "ranking_source": "FIFA/Coca-Cola Men's World Ranking, 1 April 2026 snapshot",
        "trimmed_teams": [
            {"name": team.name, "code": team.code, "fifa_rank": team.fifa_rank}
            for team in trimmed
        ],
        "draw": [
            {
                "player": item.name,
                "teams": [
                    {
                        "name": team.name,
                        "code": team.code,
                        "confederation": team.confederation,
                        "fifa_rank": team.fifa_rank,
                        "points": team.points,
                    }
                    for team in item.teams
                ],
            }
            for item in draws
        ],
    }
    path.write_text(json.dumps(data, indent=2), encoding="utf-8")


def render_video(draws: list[PlayerDraw], output: Path, seed: int, duration: float, fps: int) -> None:
    total_frames = int(duration * fps)
    background = make_background()
    reveal_times = [duration * 0.48, duration * 0.78]

    with tempfile.TemporaryDirectory() as tmp_dir:
        audio_path = Path(tmp_dir) / "wheel_sound.wav"
        make_audio(audio_path, duration, reveal_times)
        cmd = [
            "ffmpeg",
            "-y",
            "-f",
            "rawvideo",
            "-pix_fmt",
            "rgb24",
            "-s",
            f"{WIDTH}x{HEIGHT}",
            "-r",
            str(fps),
            "-i",
            "-",
            "-i",
            str(audio_path),
            "-shortest",
            "-c:v",
            "libx264",
            "-preset",
            "medium",
            "-crf",
            "18",
            "-pix_fmt",
            "yuv420p",
            "-c:a",
            "aac",
            "-b:a",
            "160k",
            str(output),
        ]
        logging.info("Rendering %s frames to %s", total_frames, output)
        process = subprocess.Popen(cmd, stdin=subprocess.PIPE)
        assert process.stdin is not None
        try:
            for frame in range(total_frames):
                process.stdin.write(render_frame(background, draws, frame, total_frames, duration))
                if frame and frame % max(1, fps * 2) == 0:
                    logging.info("Rendered %.0f%%", frame / total_frames * 100)
        finally:
            process.stdin.close()
        return_code = process.wait()
        if return_code:
            raise RuntimeError(f"ffmpeg failed with exit code {return_code}")
    logging.info("Video written to %s", output)


def parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Generate a World Cup sweepstakes bingo draw MP4.")
    parser.add_argument("--players", type=Path, required=True, help="JSON file with a players list.")
    parser.add_argument("--output", type=Path, default=Path("world_cup_sweepstakes_draw.mp4"), help="Output MP4 path.")
    parser.add_argument("--results", type=Path, help="Optional results JSON path. Defaults beside the MP4.")
    parser.add_argument("--seed", type=int, default=2026, help="Random seed for reproducible draws.")
    parser.add_argument("--duration", type=float, default=16.0, help="Video duration in seconds.")
    parser.add_argument("--fps", type=int, default=FPS, help="Frames per second.")
    return parser.parse_args(argv)


def main(argv: list[str]) -> int:
    logging.basicConfig(level=logging.INFO, format="%(message)s")
    args = parse_args(argv)
    players = load_players(args.players)
    draws, trimmed = prepare_draw(players, args.seed)
    results_path = args.results or args.output.with_suffix(".results.json")
    write_results(results_path, draws, trimmed, args.seed)
    logging.info("Results JSON written to %s", results_path)
    render_video(draws, args.output, args.seed, args.duration, args.fps)
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
