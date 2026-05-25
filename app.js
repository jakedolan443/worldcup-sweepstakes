const FLAG_BASE = "https://hatscripts.github.io/circle-flags/flags/";
const BASE_SHARE_URL = "";

const TEAMS = [
  { name: "France", code: "FRA", flag: "fr", confed: "UEFA", rank: 1, points: 1877.32 },
  { name: "Spain", code: "ESP", flag: "es", confed: "UEFA", rank: 2, points: 1876.40 },
  { name: "Argentina", code: "ARG", flag: "ar", confed: "CONMEBOL", rank: 3, points: 1874.81 },
  { name: "England", code: "ENG", flag: "gb-eng", confed: "UEFA", rank: 4, points: 1825.97 },
  { name: "Portugal", code: "POR", flag: "pt", confed: "UEFA", rank: 5, points: 1763.83 },
  { name: "Brazil", code: "BRA", flag: "br", confed: "CONMEBOL", rank: 6, points: 1761.16 },
  { name: "Netherlands", code: "NED", flag: "nl", confed: "UEFA", rank: 7, points: 1757.87 },
  { name: "Morocco", code: "MAR", flag: "ma", confed: "CAF", rank: 8, points: 1755.87 },
  { name: "Belgium", code: "BEL", flag: "be", confed: "UEFA", rank: 9, points: 1734.71 },
  { name: "Germany", code: "GER", flag: "de", confed: "UEFA", rank: 10, points: 1730.37 },
  { name: "Croatia", code: "CRO", flag: "hr", confed: "UEFA", rank: 11, points: 1717.07 },
  { name: "Colombia", code: "COL", flag: "co", confed: "CONMEBOL", rank: 13, points: 1693.09 },
  { name: "Senegal", code: "SEN", flag: "sn", confed: "CAF", rank: 14, points: 1688.99 },
  { name: "Mexico", code: "MEX", flag: "mx", confed: "CONCACAF", rank: 15, points: 1681.03 },
  { name: "United States", code: "USA", flag: "us", confed: "CONCACAF", rank: 16, points: 1673.13 },
  { name: "Uruguay", code: "URU", flag: "uy", confed: "CONMEBOL", rank: 17, points: 1673.07 },
  { name: "Japan", code: "JPN", flag: "jp", confed: "AFC", rank: 18, points: 1660.43 },
  { name: "Switzerland", code: "SUI", flag: "ch", confed: "UEFA", rank: 19, points: 1649.40 },
  { name: "IR Iran", code: "IRN", flag: "ir", confed: "AFC", rank: 21, points: 1615.30 },
  { name: "Turkiye", code: "TUR", flag: "tr", confed: "UEFA", rank: 22, points: 1599.04 },
  { name: "Ecuador", code: "ECU", flag: "ec", confed: "CONMEBOL", rank: 23, points: 1594.78 },
  { name: "Austria", code: "AUT", flag: "at", confed: "UEFA", rank: 24, points: 1593.45 },
  { name: "Korea Republic", code: "KOR", flag: "kr", confed: "AFC", rank: 25, points: 1588.66 },
  { name: "Australia", code: "AUS", flag: "au", confed: "AFC", rank: 27, points: 1580.67 },
  { name: "Algeria", code: "ALG", flag: "dz", confed: "CAF", rank: 28, points: 1564.26 },
  { name: "Egypt", code: "EGY", flag: "eg", confed: "CAF", rank: 29, points: 1563.24 },
  { name: "Canada", code: "CAN", flag: "ca", confed: "CONCACAF", rank: 30, points: 1556.48 },
  { name: "Norway", code: "NOR", flag: "no", confed: "UEFA", rank: 31, points: 1550.94 },
  { name: "Panama", code: "PAN", flag: "pa", confed: "CONCACAF", rank: 33, points: 1540.64 },
  { name: "Cote d'Ivoire", code: "CIV", flag: "ci", confed: "CAF", rank: 34, points: 1532.98 },
  { name: "Sweden", code: "SWE", flag: "se", confed: "UEFA", rank: 38, points: 1514.77 },
  { name: "Paraguay", code: "PAR", flag: "py", confed: "CONMEBOL", rank: 40, points: 1503.50 },
  { name: "Czechia", code: "CZE", flag: "cz", confed: "UEFA", rank: 41, points: 1501.38 },
  { name: "Scotland", code: "SCO", flag: "gb-sct", confed: "UEFA", rank: 43, points: 1498.35 },
  { name: "Tunisia", code: "TUN", flag: "tn", confed: "CAF", rank: 44, points: 1483.05 },
  { name: "Congo DR", code: "COD", flag: "cd", confed: "CAF", rank: 46, points: 1478.35 },
  { name: "Uzbekistan", code: "UZB", flag: "uz", confed: "AFC", rank: 50, points: 1465.34 },
  { name: "Qatar", code: "QAT", flag: "qa", confed: "AFC", rank: 55, points: 1454.96 },
  { name: "Iraq", code: "IRQ", flag: "iq", confed: "AFC", rank: 57, points: 1447.14 },
  { name: "South Africa", code: "RSA", flag: "za", confed: "CAF", rank: 60, points: 1429.73 },
  { name: "Saudi Arabia", code: "KSA", flag: "sa", confed: "AFC", rank: 61, points: 1421.43 },
  { name: "Jordan", code: "JOR", flag: "jo", confed: "AFC", rank: 63, points: 1391.45 },
  { name: "Bosnia and Herzegovina", code: "BIH", flag: "ba", confed: "UEFA", rank: 65, points: 1385.84 },
  { name: "Cabo Verde", code: "CPV", flag: "cv", confed: "CAF", rank: 69, points: 1366.13 },
  { name: "Ghana", code: "GHA", flag: "gh", confed: "CAF", rank: 74, points: 1346.31 },
  { name: "Curacao", code: "CUW", flag: "cw", confed: "CONCACAF", rank: 82, points: 1294.65 },
  { name: "Haiti", code: "HAI", flag: "ht", confed: "CONCACAF", rank: 83, points: 1291.71 },
  { name: "New Zealand", code: "NZL", flag: "nz", confed: "OFC", rank: 85, points: 1281.57 }
];

const CONFED_COLORS = {
  AFC: "#d93646",
  CAF: "#1c9260",
  CONCACAF: "#2a7ed6",
  CONMEBOL: "#f4c430",
  OFC: "#56cad6",
  UEFA: "#6854d6"
};

const FLAG_COLORS = {
  FRA: "#1f56a7",
  ESP: "#f0c431",
  ARG: "#75aadb",
  ENG: "#c8102e",
  POR: "#0b8f4d",
  BRA: "#229e45",
  NED: "#f36c21",
  MAR: "#c1272d",
  BEL: "#f4cf23",
  GER: "#151515",
  CRO: "#d5142f",
  COL: "#f4c430",
  SEN: "#15975b",
  MEX: "#106b45",
  USA: "#1f5aa6",
  URU: "#5db7e8",
  JPN: "#d7193f",
  SUI: "#d52b1e",
  IRN: "#239f40",
  TUR: "#e30a17",
  ECU: "#f4c430",
  AUT: "#ed2939",
  KOR: "#ffffff",
  AUS: "#153a75",
  ALG: "#007a3d",
  EGY: "#ce1126",
  CAN: "#ff1f32",
  NOR: "#ba0c2f",
  PAN: "#005293",
  CIV: "#f77f00",
  SWE: "#006aa7",
  PAR: "#d52b1e",
  CZE: "#11457e",
  SCO: "#0065bd",
  TUN: "#e70013",
  COD: "#00a3e0",
  UZB: "#1eb6e8",
  QAT: "#8a1538",
  IRQ: "#ce1126",
  RSA: "#007a4d",
  KSA: "#006c35",
  JOR: "#007a3d",
  BIH: "#005eb8",
  CPV: "#003893",
  GHA: "#fcd116",
  CUW: "#002b7f",
  HAI: "#00209f",
  NZL: "#00247d"
};

const SAMPLE_NAMES = [
  "Alex", "Beth", "Charlie", "Dana", "Elliot", "Fatima", "George", "Hannah", "Ibrahim",
  "Jess", "Kai", "Leah", "Marta", "", "Nina", "", "Owen"
];

const DEFAULT_COUNTRIES_PER_PLAYER = 2;
const MIN_COUNTRIES_PER_PLAYER = 1;

const PACE = {
  dramatic: {
    wheelImpulse: 27.5,
    turns: 12,
    minMs: 7800,
    spinMs: 11800,
    pause: 2000,
    friction: 0.978,
    minVelocity: 5.2,
    notchDrag: 0.16,
    tickStrength: 1.0
  }
};

const state = {
  wheelTeams: [...TEAMS],
  eligibleTeams: [...TEAMS],
  draw: [],
  removed: [],
  pendingRemovalCodes: new Set(),
  running: false,
  activePlayer: -1,
  activeTeam: null,
  activeItem: null,
  drawItems: [],
  drawToken: 0,
  drawStartedAtMs: null,
  drawTotalMs: 0,
  audio: null,
  revealedByPlayer: new Map(),
  rng: mulberry32(2026),
  wheel: {
    angle: centeredWheelAngle(TEAMS.length),
    velocity: 0,
    target: null,
    targetTeam: null,
    spinning: false,
    lastTs: 0,
    spinStartedAt: 0,
    wallClockStartMs: null,
    simElapsed: 0,
    physicsAccumulator: 0,
    minSpinMs: 3300,
    friction: 0.955,
    lastPocket: -1,
    lastPegPocket: -1,
    wobble: 0,
    wobbleVelocity: 0,
    clickerAngle: 0,
    clickerVelocity: 0,
    clickerLocked: false,
    forceSettleMs: null,
    deadlineMs: null,
    settleTeam: null,
    settleAngle: null,
    deadlineTimer: null,
    resolve: null
  }
};

const el = {
  names: document.querySelector("#playerNames"),
  playerSetup: document.querySelector("#playerSetup"),
  seed: document.querySelector("#seedInput"),
  countryCount: document.querySelector("#countryCountInput"),
  setupNote: document.querySelector("#setupNote"),
  omissionPreview: document.querySelector("#omissionPreview"),
  scheduleControls: document.querySelector("#scheduleControls"),
  startTime: document.querySelector("#startTimeInput"),
  quickTimes: document.querySelectorAll("[data-start-offset]"),
  start: document.querySelector("#startButton"),
  share: document.querySelector("#shareButton"),
  reset: document.querySelector("#resetButton"),
  buttonRow: document.querySelector(".button-row"),
  countdownPanel: document.querySelector("#countdownPanel"),
  countdownClock: document.querySelector("#countdownClock"),
  omittedPanel: document.querySelector("#omittedPanel"),
  omittedList: document.querySelector("#omittedList"),
  cardsCount: document.querySelector("#cardsCount"),
  grid: document.querySelector("#cardsGrid"),
  canvas: document.querySelector("#wheelCanvas"),
  timeRemaining: document.querySelector("#timeRemaining"),
  pointerLabel: document.querySelector("#pointerLabel"),
  status: document.querySelector("#statusPill"),
  stageTitle: document.querySelector("#stageTitle"),
  activeCard: document.querySelector("#activeCard")
};

const ctx = el.canvas.getContext("2d");
let scheduledStartMs = null;
let countdownTimer = null;
let viewerMode = false;
let flagPreloadPromise = null;

function resizeWheel() {
  const box = el.canvas.parentElement.getBoundingClientRect();
  const size = Math.max(160, Math.floor(Math.min(box.width - 24, box.height - 46)));
  el.canvas.parentElement.style.setProperty("--wheel-size", `${size}px`);
  el.canvas.parentElement.style.setProperty("--wheel-radius", `${Math.round(size * 228 / 520)}px`);
}

function flagUrl(team) {
  return `${FLAG_BASE}${team.flag}.svg`;
}

function preloadCountryFlags() {
  if (flagPreloadPromise) return flagPreloadPromise;
  const seen = new Set();
  const loads = TEAMS.filter((team) => {
    if (seen.has(team.flag)) return false;
    seen.add(team.flag);
    return true;
  }).map((team) => new Promise((resolve) => {
    const image = new Image();
    image.onload = resolve;
    image.onerror = resolve;
    image.src = flagUrl(team);
  }));
  flagPreloadPromise = Promise.all(loads);
  return flagPreloadPromise;
}

function mulberry32(seed) {
  let value = seed >>> 0;
  return function random() {
    value += 0x6D2B79F5;
    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSeed(text) {
  const source = String(text || "2026");
  let hash = 2166136261;
  for (let i = 0; i < source.length; i += 1) {
    hash ^= source.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function shuffle(items, rng) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function parsePlayers() {
  const lines = el.names.value.split(/\r?\n/);
  while (lines.length > 1 && !lines[lines.length - 1].trim()) {
    lines.pop();
  }
  const players = lines.map((line, index) => {
    const name = line.trim();
    return name || `Player ${index + 1}`;
  }).filter((name, index) => name !== `Player ${index + 1}` || lines[index] !== undefined);
  return players.length ? players : SAMPLE_NAMES.map((name, index) => name || `Player ${index + 1}`);
}

function currentPlayersForUrl() {
  return parsePlayers();
}

function maxCountriesForPlayers(players = parsePlayers()) {
  return Math.max(MIN_COUNTRIES_PER_PLAYER, Math.floor(TEAMS.length / Math.max(1, players.length)));
}

function currentCountryCount() {
  const players = parsePlayers();
  const max = maxCountriesForPlayers(players);
  const raw = Number.parseInt(el.countryCount.value, 10);
  const clamped = Math.max(MIN_COUNTRIES_PER_PLAYER, Math.min(max, Number.isFinite(raw) ? raw : DEFAULT_COUNTRIES_PER_PLAYER));
  el.countryCount.max = String(max);
  if (String(clamped) !== el.countryCount.value) {
    el.countryCount.value = String(clamped);
  }
  return clamped;
}

function updateSetupPreview() {
  if (viewerMode) {
    el.playerSetup.hidden = true;
    el.setupNote.hidden = true;
    el.omissionPreview.hidden = true;
    return;
  }
  const players = parsePlayers();
  const max = maxCountriesForPlayers(players);
  el.countryCount.max = String(max);
  const count = currentCountryCount();
  const maxPlayers = Math.floor(TEAMS.length / count);
  if (players.length > TEAMS.length) {
    el.setupNote.textContent = `Each player gets ${count} ${count === 1 ? "country" : "countries"}.`;
    el.omissionPreview.textContent = `Too many players: maximum ${TEAMS.length} players are possible`;
    el.omissionPreview.hidden = false;
    return;
  }
  const omitted = Math.max(0, TEAMS.length - players.length * count);
  const countryWord = count === 1 ? "country" : "countries";
  const omittedWord = omitted === 1 ? "country" : "countries";
  el.setupNote.textContent = `Each player gets ${count} ${countryWord}. Max ${maxPlayers} players at this setting.`;
  el.omissionPreview.textContent = `${omitted} low-ranking ${omittedWord} will be omitted for evenness`;
  el.omissionPreview.hidden = omitted === 0;
}

function hydrateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const seed = params.get("seed");
  const namesParam = params.get("names");
  const start = params.get("start");
  const countries = params.get("countries");
  if (seed !== null) {
    el.seed.value = seed;
  }
  if (countries !== null) {
    el.countryCount.value = countries;
  }
  if (start) {
    const timestamp = Number(start);
    if (Number.isFinite(timestamp)) {
      scheduledStartMs = timestamp;
      viewerMode = true;
      el.playerSetup.hidden = true;
      el.startTime.value = localDateTimeValue(new Date(timestamp));
    }
  }
  if (namesParam) {
    try {
      const names = JSON.parse(decodeShareValue(namesParam));
      if (Array.isArray(names) && names.length) {
        el.names.value = names.map((name, index) => String(name || `Player ${index + 1}`)).join("\n");
      }
    } catch {
      const names = decodeShareValue(namesParam).split("\n").filter(Boolean);
      if (names.length) {
        el.names.value = names.join("\n");
      }
    }
  }
}

function encodeShareValue(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function decodeShareValue(value) {
  const padded = value.replaceAll("-", "+").replaceAll("_", "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function shareBaseUrl() {
  if (BASE_SHARE_URL) return BASE_SHARE_URL;
  return `${window.location.origin}${window.location.pathname}`;
}

function buildShareUrl() {
  const url = new URL(shareBaseUrl(), window.location.href);
  url.searchParams.set("seed", el.seed.value || "2026");
  url.searchParams.set("names", encodeShareValue(JSON.stringify(currentPlayersForUrl())));
  url.searchParams.set("countries", String(currentCountryCount()));
  const startMs = selectedStartMs();
  if (startMs) {
    url.searchParams.set("start", String(startMs));
  } else {
    url.searchParams.delete("start");
  }
  return url.toString();
}

async function copyShareLink() {
  const players = currentPlayersForUrl();
  if (players.length > TEAMS.length) {
    el.stageTitle.textContent = `Maximum ${TEAMS.length} players when each player gets at least one country.`;
    flashShareButton("Too many");
    return;
  }
  const link = buildShareUrl();
  try {
    await navigator.clipboard.writeText(link);
    flashShareButton("Copied");
  } catch {
    window.prompt("Copy share link", link);
    flashShareButton("Ready");
  }
}

function flashShareButton(text) {
  const previous = el.share.textContent;
  el.share.textContent = text;
  window.setTimeout(() => {
    el.share.textContent = previous;
  }, 1200);
}

function selectedStartMs() {
  if (!el.startTime.value) return null;
  const date = new Date(el.startTime.value);
  const timestamp = date.getTime();
  if (!Number.isFinite(timestamp)) return null;
  return timestamp > Date.now() ? timestamp : null;
}

function localDateTimeValue(date) {
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function setStartOffset(minutes) {
  const selected = el.startTime.value ? new Date(el.startTime.value).getTime() : NaN;
  const base = Number.isFinite(selected) && selected > Date.now() ? selected : Date.now();
  const date = new Date(base + minutes * 60 * 1000);
  el.startTime.value = localDateTimeValue(date);
}

function setupScheduledStart() {
  if (!scheduledStartMs) return;
  if (viewerMode) {
    el.scheduleControls.hidden = true;
    el.buttonRow.hidden = true;
    renderOmittedCountries();
  }
  const remaining = scheduledStartMs - Date.now();
  if (remaining > 0) {
    el.countdownPanel.hidden = false;
    updateCountdown();
    countdownTimer = window.setInterval(updateCountdown, 250);
  } else {
    runScheduledDraw();
  }
}

function updateCountdown() {
  if (!scheduledStartMs) return;
  const remaining = scheduledStartMs - Date.now();
  if (remaining <= 0) {
    window.clearInterval(countdownTimer);
    countdownTimer = null;
    el.countdownClock.textContent = "00:00";
    runScheduledDraw();
    return;
  }
  el.countdownClock.textContent = formatDuration(remaining);
}

function runScheduledDraw() {
  const elapsedMs = scheduledStartMs ? Math.max(0, Date.now() - scheduledStartMs) : 0;
  runDraw({ elapsedMs, startedAtMs: scheduledStartMs }).catch(handleDrawError);
}

function handleDrawError(error) {
  state.running = false;
  el.start.disabled = false;
  el.status.textContent = "Error";
  el.stageTitle.textContent = error instanceof Error ? error.message : "Draw failed to start";
}

function formatDuration(ms) {
  const totalSeconds = Math.ceil(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (value) => String(value).padStart(2, "0");
  return hours > 0 ? `${hours}:${pad(minutes)}:${pad(seconds)}` : `${pad(minutes)}:${pad(seconds)}`;
}

function formatRemaining(ms) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${String(seconds).padStart(2, "0")}s`;
}

function updateTimeRemaining() {
  if (!state.running || !state.drawStartedAtMs || !state.drawTotalMs) {
    el.timeRemaining.hidden = true;
    return;
  }
  const remaining = Math.max(0, state.drawStartedAtMs + state.drawTotalMs - Date.now());
  el.timeRemaining.hidden = false;
  el.timeRemaining.textContent = `Time Remaining: ${formatRemaining(remaining)}`;
}

function omittedCountriesForSetup() {
  const players = parsePlayers();
  if (players.length > TEAMS.length) return [];
  const count = currentCountryCount();
  const removeCount = Math.max(0, TEAMS.length - players.length * count);
  return [...TEAMS].sort((a, b) => b.rank - a.rank).slice(0, removeCount);
}

function renderOmittedCountries(teams = omittedCountriesForSetup()) {
  el.omittedList.replaceChildren();
  if (!viewerMode || teams.length === 0) {
    el.omittedPanel.hidden = true;
    return;
  }
  teams.forEach((team) => {
    const item = document.createElement("div");
    item.className = "omitted-team";
    item.append(countryBadge(team));
    el.omittedList.append(item);
  });
  el.omittedPanel.hidden = false;
}

function prepareDraw() {
  const players = parsePlayers();
  if (players.length > TEAMS.length) {
    throw new Error(`Maximum ${TEAMS.length} players when each player gets at least one country.`);
  }

  const countriesPerPlayer = currentCountryCount();
  const targetTeamCount = players.length * countriesPerPlayer;
  const removeCount = Math.max(0, TEAMS.length - targetTeamCount);
  const removed = [...TEAMS].sort((a, b) => b.rank - a.rank).slice(0, removeCount);
  const removedCodes = new Set(removed.map((team) => team.code));
  const eligible = TEAMS.filter((team) => !removedCodes.has(team.code));
  const rng = mulberry32(hashSeed(el.seed.value));
  const shuffled = shuffle(eligible, rng);

  state.removed = removed;
  renderOmittedCountries(removed);
  state.eligibleTeams = eligible;
  state.wheelTeams = eligible;
  state.wheel.angle = centeredWheelAngle(eligible.length);
  state.pendingRemovalCodes = new Set();
  state.draw = players.map((player, index) => ({
    name: player,
    teams: shuffled.slice(index * countriesPerPlayer, (index + 1) * countriesPerPlayer)
  }));
  state.revealedByPlayer = new Map(state.draw.map((_, index) => [index, []]));
  state.rng = rng;
  state.drawItems = buildPhysicalDrawItems();

}

function renderCards() {
  el.grid.replaceChildren();
  el.cardsCount.textContent = String(state.draw.length);
  el.grid.style.setProperty("--player-count", Math.max(1, state.draw.length));
  const maxRounds = Math.max(currentCountryCount(), ...state.draw.map((entry) => entry.teams.length));
  el.grid.style.setProperty("--country-count", Math.max(1, maxRounds));

  const header = document.createElement("div");
  header.className = "results-row results-head";
  const playerHead = document.createElement("span");
  playerHead.textContent = "Player";
  header.append(playerHead);
  for (let teamIndex = 0; teamIndex < maxRounds; teamIndex += 1) {
    const label = document.createElement("span");
    label.textContent = `Spin ${teamIndex + 1}`;
    header.append(label);
  }
  el.grid.append(header);

  state.draw.forEach((entry, playerIndex) => {
    const row = document.createElement("article");
    row.className = "results-row";
    if (playerIndex === state.activePlayer) row.classList.add("active");
    const revealed = state.revealedByPlayer.get(playerIndex) || [];
    if (revealed.length === entry.teams.length) row.classList.add("done");

    const name = document.createElement("span");
    name.className = "player-name";
    name.textContent = entry.name;
    row.append(name);

    for (let teamIndex = 0; teamIndex < maxRounds; teamIndex += 1) {
      const cell = document.createElement("span");
      cell.className = `result-cell${revealed[teamIndex] ? "" : " pending"}`;
      if (revealed[teamIndex]) {
        cell.append(countryBadge(revealed[teamIndex]));
      } else {
        cell.textContent = "Waiting";
      }
      row.append(cell);
    }

    el.grid.append(row);
  });
}

function renderActiveCard() {
  const entry = state.draw[state.activePlayer];
  const revealed = state.revealedByPlayer.get(state.activePlayer) || [];
  el.activeCard.classList.toggle("spinning", state.wheel.spinning);
  if (!entry) {
    const finished = !state.running && state.draw.length > 0 && state.draw.every((drawEntry, index) => {
      const playerRevealed = state.revealedByPlayer.get(index) || [];
      return drawEntry.teams.length > 0 && playerRevealed.length === drawEntry.teams.length;
    });
    el.activeCard.innerHTML = `<p class="eyebrow">Current player</p><h2>${finished ? "Finished" : "No spin yet"}</h2><div class="active-teams"></div>`;
    return;
  }

  const teams = document.createElement("div");
  teams.className = "active-teams";
  teams.style.setProperty("--active-slot-count", Math.max(1, entry.teams.length));
  entry.teams.forEach((_, teamIndex) => {
    const isCurrent = state.activeItem
      && state.activeItem.playerIndex === state.activePlayer
      && state.activeItem.teamIndex === teamIndex;
    teams.append(teamReveal(revealed[teamIndex], teamIndex, isCurrent));
  });

  el.activeCard.replaceChildren();
  const eyebrow = document.createElement("p");
  eyebrow.className = "eyebrow";
  eyebrow.textContent = "Current player";
  const title = document.createElement("h2");
  title.textContent = entry.name;
  el.activeCard.append(eyebrow, title);
  if (entry.teams.length > 1) {
    const pickStatus = document.createElement("p");
    pickStatus.className = "pick-status";
    let currentPick = Math.min(revealed.length + 1, Math.max(1, entry.teams.length));
    if (state.activeItem && state.activeItem.playerIndex === state.activePlayer) {
      currentPick = state.activeItem.teamIndex + 1;
    } else if (state.running && revealed.length > 0) {
      currentPick = Math.min(revealed.length, Math.max(1, entry.teams.length));
    }
    pickStatus.textContent = `Spin ${currentPick} of ${entry.teams.length}`;
    el.activeCard.append(pickStatus);
  }
  el.activeCard.append(teams);
}

function teamReveal(team, teamIndex = 0, isCurrent = false) {
  const item = document.createElement("div");
  item.className = `team-reveal${team ? "" : " empty"}${isCurrent ? " current" : ""}`;
  const label = document.createElement("span");
  label.className = "spin-label";
  label.textContent = `Spin ${teamIndex + 1}`;
  item.append(label);
  if (team) {
    item.append(countryBadge(team));
  } else {
    const waiting = document.createElement("strong");
    waiting.textContent = isCurrent ? "Spinning" : "Waiting";
    item.append(waiting);
  }
  return item;
}

function countryBadge(team) {
  const badge = document.createElement("span");
  badge.className = "country-badge";
  const image = document.createElement("img");
  image.src = flagUrl(team);
  image.alt = "";
  const name = document.createElement("strong");
  name.textContent = team.name;
  badge.append(image, name);
  return badge;
}

function ensureAudio() {
  if (state.audio) return state.audio;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  const context = new AudioContext();
  const master = context.createGain();
  master.gain.value = 0.18;
  master.connect(context.destination);
  state.audio = { context, master };
  return state.audio;
}

function playTick(strength = 1) {
  const audio = state.audio;
  if (!audio) return;
  const now = audio.context.currentTime;
  const osc = audio.context.createOscillator();
  const gain = audio.context.createGain();
  osc.type = "square";
  osc.frequency.setValueAtTime(1100 + strength * 420, now);
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(0.13 * strength, now + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
  osc.connect(gain);
  gain.connect(audio.master);
  osc.start(now);
  osc.stop(now + 0.04);
}

function playChime() {
  const audio = state.audio;
  if (!audio) return;
  const now = audio.context.currentTime;
  [660, 880, 1320].forEach((frequency, index) => {
    const osc = audio.context.createOscillator();
    const gain = audio.context.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(frequency, now);
    gain.gain.setValueAtTime(0.001, now + index * 0.035);
    gain.gain.exponentialRampToValueAtTime(0.16 / (index + 1), now + index * 0.035 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42 + index * 0.06);
    osc.connect(gain);
    gain.connect(audio.master);
    osc.start(now + index * 0.035);
    osc.stop(now + 0.55 + index * 0.06);
  });
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function normalizeAngle(angle) {
  return ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
}

function centeredWheelAngle(count) {
  const slice = (Math.PI * 2) / Math.max(1, count);
  return -Math.PI / 2 - slice / 2;
}

function smoothstep(value) {
  const x = Math.max(0, Math.min(1, value));
  return x * x * (3 - 2 * x);
}

function wheelTargetFor(team, minTurns = 0) {
  const index = state.wheelTeams.findIndex((item) => item.code === team.code);
  const slice = (Math.PI * 2) / state.wheelTeams.length;
  const sliceCenter = index * slice + slice / 2;
  const pointerAngle = -Math.PI / 2;
  const current = normalizeAngle(state.wheel.angle);
  const desiredAngle = normalizeAngle(pointerAngle - sliceCenter);
  let delta = desiredAngle - current;
  if (delta < 0) delta += Math.PI * 2;
  return state.wheel.angle + delta + minTurns * Math.PI * 2;
}

function chooseInitialVelocity(targetAngle, spinMs, seedJitter = 0) {
  const frameDt = 1 / 60;
  const steps = Math.max(1, Math.round(spinMs / 1000 / frameDt));
  const friction = PACE.dramatic.friction;
  const travel = targetAngle - state.wheel.angle;
  const frictionSum = (1 - Math.pow(friction, steps)) / (1 - friction);
  const base = travel / (frameDt * frictionSum);
  return base * (1 + seedJitter * 0.015);
}

function pocketForAngle(angle, count) {
  if (!count) return 0;
  const pointerAngle = -Math.PI / 2;
  const slice = (Math.PI * 2) / count;
  const relative = normalizeAngle(pointerAngle - angle + slice * 0.015);
  return Math.floor(relative / slice) % count;
}

function settleTeamUnderPointer() {
  if (!state.wheelTeams.length) return null;
  const index = currentPocket();
  return state.wheelTeams[index];
}

function spinTo(team, options = {}) {
  const pace = PACE.dramatic;
  return new Promise((resolve) => {
    const elapsedMs = Math.max(0, options.elapsedMs || 0);
    if (options.wheelTeams) {
      state.wheelTeams = [...options.wheelTeams];
    }
    if (Number.isFinite(options.startAngle)) {
      state.wheel.angle = options.startAngle;
    }
    state.activeTeam = team;
    const targetAngle = Number.isFinite(options.landingAngle)
      ? options.landingAngle
      : wheelTargetFor(team, pace.turns + Math.floor(state.rng() * 3));
    state.wheel.target = targetAngle;
    state.wheel.targetTeam = team;
    state.wheel.velocity = options.throwVelocity || chooseInitialVelocity(targetAngle, options.spinMs || pace.spinMs, state.rng());
    state.wheel.spinStartedAt = performance.now() - elapsedMs;
    state.wheel.wallClockStartMs = Number.isFinite(options.wallClockStartMs)
      ? options.wallClockStartMs
      : (Number.isFinite(options.deadlineMs) ? options.deadlineMs - (options.spinMs || pace.spinMs) : null);
    state.wheel.simElapsed = 0;
    state.wheel.physicsAccumulator = 0;
    state.wheel.minSpinMs = pace.minMs;
    state.wheel.friction = pace.friction;
    state.wheel.forceSettleMs = options.spinMs || pace.spinMs;
    state.wheel.lastPocket = -1;
    state.wheel.lastPegPocket = currentPocket();
    state.wheel.wobble = 0;
    state.wheel.wobbleVelocity = 0;
    state.wheel.clickerAngle = 0;
    state.wheel.clickerVelocity = 0;
    state.wheel.clickerLocked = false;
    state.wheel.settleTeam = team;
    state.wheel.settleAngle = Number.isFinite(options.landingAngle) ? options.landingAngle : null;
    state.wheel.deadlineMs = Number.isFinite(options.deadlineMs) ? options.deadlineMs : null;
    if (state.wheel.deadlineTimer) {
      window.clearTimeout(state.wheel.deadlineTimer);
      state.wheel.deadlineTimer = null;
    }
    state.wheel.resolve = resolve;
    state.wheel.spinning = true;
    if (elapsedMs > 0) {
      replayWheelToElapsed(elapsedMs);
    }
    renderActiveCard();
  });
}

function replayWheelToElapsed(elapsedMs) {
  const dt = 1 / 60;
  const steps = Math.min(900, Math.floor(elapsedMs / 1000 / dt));
  for (let index = 0; index < steps; index += 1) {
    stepWheelPhysics(dt, false);
  }
}

function drawWheel(ts = 0) {
  const wheel = state.wheel;
  const dt = Math.min(0.033, Math.max(0.001, (ts - (wheel.lastTs || ts)) / 1000));
  wheel.lastTs = ts;

  if (wheel.spinning && wheel.target !== null) {
    const fixedDt = 1 / 60;
    const wallClockCatchup = wheel.wallClockStartMs
      ? Math.max(0, (Date.now() - wheel.wallClockStartMs - wheel.simElapsed) / 1000)
      : dt;
    wheel.physicsAccumulator = Math.min(0.75, wheel.physicsAccumulator + wallClockCatchup);
    while (wheel.physicsAccumulator >= fixedDt) {
      stepWheelPhysics(fixedDt, true);
      wheel.physicsAccumulator -= fixedDt;
    }
    maybeSettleSpin(ts);
  } else {
    wheel.velocity *= Math.pow(0.985, dt * 60);
    wheel.angle += wheel.velocity * dt;
    if (!wheel.clickerLocked) {
      updateClickerPhysics(dt);
    }
  }

  const width = el.canvas.width;
  const height = el.canvas.height;
  const cx = width / 2;
  const cy = height / 2;
  const radius = 228;
  const slice = (Math.PI * 2) / state.wheelTeams.length;
  updatePointerLabel();
  updateTimeRemaining();

  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.translate(cx, cy);

  const glow = ctx.createRadialGradient(0, 0, 60, 0, 0, 260);
  glow.addColorStop(0, "rgba(255,255,255,0.22)");
  glow.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0, 0, 260, 0, Math.PI * 2);
  ctx.fill();

  ctx.rotate(wheel.angle);
  state.wheelTeams.forEach((team, index) => {
    const start = index * slice;
    const end = start + slice;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, start, end);
    ctx.closePath();
    const sliceColor = sliceColorFor(team, index);
    ctx.fillStyle = sliceColor;
    ctx.fill();
    ctx.strokeStyle = "rgba(8, 18, 30, 0.35)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.save();
    ctx.rotate(start + slice / 2);
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.font = "900 10px system-ui, sans-serif";
    ctx.fillStyle = textColorForSlice(sliceColor);
    ctx.fillText(fitWheelLabel(team.name), radius - 12, 0);
    ctx.restore();
  });

  drawRimPegs(radius, slice);

  ctx.beginPath();
  ctx.arc(0, 0, 82, 0, Math.PI * 2);
  ctx.fillStyle = "#071421";
  ctx.fill();
  ctx.lineWidth = 10;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 28, 0, Math.PI * 2);
  const hub = ctx.createRadialGradient(-10, -10, 4, 0, 0, 30);
  hub.addColorStop(0, "#8ee9ff");
  hub.addColorStop(0.55, "#00a4dc");
  hub.addColorStop(1, "#aa5cc3");
  ctx.fillStyle = hub;
  ctx.fill();
  ctx.restore();

  requestAnimationFrame(drawWheel);
}

function stepWheelPhysics(dt, updateClicker = true) {
  const wheel = state.wheel;
  wheel.simElapsed += dt * 1000;
  const elapsed = wheel.simElapsed;
  const slowZone = smoothstep((elapsed - wheel.forceSettleMs * 0.6) / (wheel.forceSettleMs * 0.4));
  const previousPocket = currentPocket();
  const pegResistance = Math.sin(wheel.angle * state.wheelTeams.length) * PACE.dramatic.notchDrag * (0.18 + slowZone * 1.25);
  wheel.velocity -= pegResistance * dt;
  wheel.velocity *= Math.pow(wheel.friction - slowZone * 0.022, dt * 60);
  if (elapsed < PACE.dramatic.minMs && Math.abs(wheel.velocity) < PACE.dramatic.minVelocity) {
    wheel.velocity = Math.sign(wheel.velocity || 1) * PACE.dramatic.minVelocity;
  }
  wheel.angle += wheel.velocity * dt;
  const nextPocket = currentPocket();
  if (nextPocket !== previousPocket || nextPocket !== wheel.lastPegPocket) {
    wheel.lastPegPocket = nextPocket;
    const kick = 0.72 + Math.min(0.88, Math.abs(wheel.velocity) * 0.06);
    wheel.clickerVelocity -= kick;
    wheel.clickerAngle = Math.max(-0.72, wheel.clickerAngle - kick * 0.34);
    document.documentElement.style.setProperty("--clicker-angle", `${wheel.clickerAngle}rad`);
    if (updateClicker) {
      playTick(Math.min(1, 0.28 + Math.abs(wheel.velocity) / 34));
    }
    wheel.velocity *= 0.995 - slowZone * 0.025;
  }
  if (updateClicker) {
    updateClickerPhysics(dt);
  }
}

function fitWheelLabel(name) {
  const replacements = {
    "Bosnia and Herzegovina": "Bosnia & Herz.",
    "Korea Republic": "Korea Rep."
  };
  return replacements[name] || name;
}

function sliceColorFor(team, index) {
  return FLAG_COLORS[team.code] || CONFED_COLORS[team.confed] || (index % 2 === 0 ? "#6854d6" : "#edf3f8");
}

function textColorForSlice(color) {
  const hex = color.replace("#", "");
  if (hex.length !== 6) return "#ffffff";
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance > 0.58 ? "#14202b" : "#ffffff";
}

function currentPocket() {
  return pocketForAngle(state.wheel.angle, state.wheelTeams.length);
}

function drawRimPegs(radius, slice) {
  ctx.save();
  for (let index = 0; index < state.wheelTeams.length; index += 1) {
    const angle = index * slice;
    const x = Math.cos(angle) * (radius - 3);
    const y = Math.sin(angle) * (radius - 3);
    const shadow = ctx.createRadialGradient(x - 1, y - 1, 1, x, y, 8);
    shadow.addColorStop(0, "rgba(0, 0, 0, 0.18)");
    shadow.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.beginPath();
    ctx.arc(x + 2, y + 2, 7.5, 0, Math.PI * 2);
    ctx.fillStyle = shadow;
    ctx.fill();

    const stud = ctx.createRadialGradient(x - 2, y - 2, 1, x, y, 6.5);
    stud.addColorStop(0, "#ffffff");
    stud.addColorStop(0.42, "#d7e9f2");
    stud.addColorStop(1, "#657584");
    ctx.beginPath();
    ctx.arc(x, y, 5.5, 0, Math.PI * 2);
    ctx.fillStyle = stud;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(5, 12, 20, 0.48)";
    ctx.stroke();
  }
  ctx.restore();
}

function updateClickerPhysics(dt) {
  const wheel = state.wheel;
  const pull = -wheel.clickerAngle * 70;
  const drag = -wheel.clickerVelocity * 5.8;
  wheel.clickerVelocity += (pull + drag) * dt;
  wheel.clickerAngle += wheel.clickerVelocity * dt;
  wheel.clickerAngle = Math.max(-0.72, Math.min(0.28, wheel.clickerAngle));
  wheel.clickerAngle *= Math.pow(0.998, dt * 60);
  document.documentElement.style.setProperty("--clicker-angle", `${wheel.clickerAngle}rad`);
}

function updatePointerLabel() {
  const team = state.wheelTeams[currentPocket()];
  const nextKey = team ? team.code : "complete";
  if (el.pointerLabel.dataset.team === nextKey) return;
  el.pointerLabel.dataset.team = nextKey;
  el.pointerLabel.replaceChildren();
  if (!team) {
    el.pointerLabel.textContent = "Complete";
    return;
  }
  const image = document.createElement("img");
  image.src = flagUrl(team);
  image.alt = "";
  const name = document.createElement("span");
  name.textContent = team.name;
  el.pointerLabel.append(image, name);
}

function maybeSettleSpin(ts) {
  const wheel = state.wheel;
  const elapsed = wheel.simElapsed;
  const wheelSlow = Math.abs(wheel.velocity) < 0.045;
  const clickerSettled = Math.abs(wheel.clickerVelocity) < 0.025 && Math.abs(wheel.clickerAngle) < 0.015;
  const longEnough = elapsed > wheel.minSpinMs;
  const deadlineReached = !wheel.deadlineMs || Date.now() >= wheel.deadlineMs;

  if (!deadlineReached || !longEnough || !wheelSlow || !clickerSettled) {
    return;
  }

  forceSettleSpin();
}

function forceSettleSpin() {
  const wheel = state.wheel;
  if (!wheel.spinning) return;
  const landedTeam = settleTeamUnderPointer();
  const resolve = wheel.resolve;
  wheel.velocity = 0;
  wheel.wobble = 0;
  wheel.wobbleVelocity = 0;
  wheel.clickerVelocity = 0;
  wheel.clickerLocked = true;
  wheel.spinning = false;
  wheel.forceSettleMs = null;
  wheel.deadlineMs = null;
  wheel.wallClockStartMs = null;
  if (wheel.deadlineTimer) {
    window.clearTimeout(wheel.deadlineTimer);
    wheel.deadlineTimer = null;
  }
  wheel.resolve = null;
  wheel.settleTeam = landedTeam;
  wheel.settleAngle = null;
  playChime();
  renderActiveCard();
  if (resolve) {
    requestAnimationFrame(() => resolve(landedTeam));
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function delayUntil(timestampMs) {
  return delay(Math.max(0, timestampMs - Date.now()));
}

function itemSpinDuration(item) {
  if (item.autoAssign) return 0;
  return Math.max(PACE.dramatic.minMs, Math.ceil(item.spinDurationMs || PACE.dramatic.spinMs));
}

function itemSlotDuration(item) {
  if (item.autoAssign) return 0;
  return itemSpinDuration(item) + PACE.dramatic.pause;
}

function drawTotalDuration(flatItems) {
  return flatItems.reduce((total, item) => total + itemSlotDuration(item), 0);
}

function drawPositionForElapsed(flatItems, elapsedMs) {
  const clampedElapsed = Math.max(0, elapsedMs);
  let cursor = 0;
  for (let index = 0; index < flatItems.length; index += 1) {
    const slotMs = itemSlotDuration(flatItems[index]);
    if (clampedElapsed < cursor + slotMs) {
      return {
        itemIndex: index,
        inSlotMs: clampedElapsed - cursor,
        itemStartMs: cursor,
        spinMs: itemSpinDuration(flatItems[index]),
        slotMs
      };
    }
    cursor += slotMs;
  }
  return {
    itemIndex: flatItems.length,
    inSlotMs: 0,
    itemStartMs: cursor,
    spinMs: 0,
    slotMs: 0
  };
}

function applyDrawProgress(flatItems, itemIndex) {
  state.wheelTeams = [...state.eligibleTeams];
  state.pendingRemovalCodes = new Set();
  state.revealedByPlayer = new Map(state.draw.map((_, index) => [index, []]));

  for (let index = 0; index < Math.min(itemIndex, flatItems.length); index += 1) {
    revealFlatItem(flatItems[index]);
    removePendingSlices();
  }

  const currentItem = itemIndex < flatItems.length ? flatItems[itemIndex] : null;
  if (currentItem) {
    state.wheelTeams = [...currentItem.wheelTeams];
  }
}

function flatDrawItems() {
  if (state.drawItems.length) return state.drawItems;
  const maxRounds = Math.max(0, ...state.draw.map((entry) => entry.teams.length));
  const items = [];
  for (let teamIndex = 0; teamIndex < maxRounds; teamIndex += 1) {
    state.draw.forEach((entry, playerIndex) => {
      const team = entry.teams[teamIndex];
      if (team) {
        items.push({ entry, playerIndex, teamIndex, team });
      }
    });
  }
  return items;
}

function buildPhysicalDrawItems() {
  const maxRounds = Math.max(0, ...state.draw.map((entry) => entry.teams.length));
  const simulatedWheel = [...state.wheelTeams];
  let simulatedAngle = state.wheel.angle;
  const items = [];

  for (let round = 0; round < maxRounds; round += 1) {
    state.draw.forEach((entry, playerIndex) => {
      if (!entry.teams[round]) return;

      let throwVelocity = PACE.dramatic.wheelImpulse;
      let landed;
      const wheelTeams = [...simulatedWheel];
      const startAngle = simulatedAngle;
      const autoAssign = wheelTeams.length === 1;

      if (autoAssign) {
        landed = {
          index: 0,
          angle: simulatedAngle,
          elapsedMs: 0
        };
      } else {
        for (let attempt = 0; attempt < 80; attempt += 1) {
          throwVelocity = PACE.dramatic.wheelImpulse + state.rng() * 9.5 + attempt * 0.17;
          landed = simulateLanding(wheelTeams, startAngle, throwVelocity);
          const candidate = wheelTeams[landed.index];
          if (candidate) break;
        }
      }

      simulatedAngle = landed.angle;
      const team = wheelTeams[landed.index];
      items.push({
        entry,
        playerIndex,
        teamIndex: round,
        round,
        team,
        throwVelocity,
        wheelTeams,
        startAngle,
        landingAngle: landed.angle,
        spinDurationMs: landed.elapsedMs,
        autoAssign
      });

      const index = simulatedWheel.findIndex((wheelTeam) => wheelTeam.code === team.code);
      if (index >= 0) simulatedWheel.splice(index, 1);
    });
  }

  return items;
}

function simulateLanding(wheelTeams, angle, velocity) {
  const dt = 1 / 60;
  let currentAngle = angle;
  let currentVelocity = velocity;
  let lastPocket = pocketForAngle(currentAngle, wheelTeams.length);
  let clickerAngle = 0;
  let clickerVelocity = 0;
  let elapsed = 0;
  const maxSteps = Math.round(60 / dt);
  for (let step = 0; step < maxSteps; step += 1) {
    elapsed += dt * 1000;
    const slowZone = smoothstep((elapsed - PACE.dramatic.spinMs * 0.6) / (PACE.dramatic.spinMs * 0.4));
    const previousPocket = pocketForAngle(currentAngle, wheelTeams.length);
    const pegResistance = Math.sin(currentAngle * wheelTeams.length) * PACE.dramatic.notchDrag * (0.18 + slowZone * 1.25);
    currentVelocity -= pegResistance * dt;
    currentVelocity *= Math.pow(PACE.dramatic.friction - slowZone * 0.022, dt * 60);
    if (elapsed < PACE.dramatic.minMs && Math.abs(currentVelocity) < PACE.dramatic.minVelocity) {
      currentVelocity = Math.sign(currentVelocity || 1) * PACE.dramatic.minVelocity;
    }
    currentAngle += currentVelocity * dt;
    const nextPocket = pocketForAngle(currentAngle, wheelTeams.length);
    if (nextPocket !== previousPocket || nextPocket !== lastPocket) {
      lastPocket = nextPocket;
      const kick = 0.72 + Math.min(0.88, Math.abs(currentVelocity) * 0.06);
      clickerVelocity -= kick;
      clickerAngle = Math.max(-0.72, clickerAngle - kick * 0.34);
      currentVelocity *= 0.995 - slowZone * 0.025;
    }

    const pull = -clickerAngle * 70;
    const drag = -clickerVelocity * 5.8;
    clickerVelocity += (pull + drag) * dt;
    clickerAngle += clickerVelocity * dt;
    clickerAngle = Math.max(-0.72, Math.min(0.28, clickerAngle));
    clickerAngle *= Math.pow(0.998, dt * 60);

    const wheelSlow = Math.abs(currentVelocity) < 0.045;
    const clickerSettled = Math.abs(clickerVelocity) < 0.025 && Math.abs(clickerAngle) < 0.015;
    if (elapsed > PACE.dramatic.minMs && wheelSlow && clickerSettled) {
      break;
    }
  }
  const index = pocketForAngle(currentAngle, wheelTeams.length);
  return {
    index,
    angle: currentAngle,
    elapsedMs: elapsed
  };
}

function revealFlatItem(item, landedTeam = item.team) {
  const revealed = state.revealedByPlayer.get(item.playerIndex) || [];
  if (!revealed.some((team) => team.code === landedTeam.code)) {
    revealed.push(landedTeam);
    state.revealedByPlayer.set(item.playerIndex, revealed);
    state.pendingRemovalCodes.add(landedTeam.code);
  }
}

function removePendingSlices() {
  if (!state.pendingRemovalCodes.size) return;
  state.wheelTeams = state.wheelTeams.filter((team) => !state.pendingRemovalCodes.has(team.code));
  state.pendingRemovalCodes.clear();
}

function completeDraw() {
  state.activePlayer = -1;
  state.activeItem = null;
  state.running = false;
  el.start.disabled = false;
  el.status.textContent = "Complete";
  el.stageTitle.textContent = "Draw complete";
  updateTimeRemaining();
  renderCards();
  renderActiveCard();
}

async function runDraw(options = {}) {
  if (state.running) return;
  state.running = true;
  state.drawToken += 1;
  const token = state.drawToken;
  el.start.disabled = true;
  el.status.textContent = "Loading";
  await preloadCountryFlags();
  if (token !== state.drawToken) return;
  const audio = ensureAudio();
  if (audio && audio.context.state === "suspended") {
    audio.context.resume().catch(() => {
      // Scheduled viewer mode may start without a user gesture; the draw still runs.
    });
  }
  document.querySelector(".app-shell").classList.add("sidebar-hidden");
  window.setTimeout(resizeWheel, 0);
  el.status.textContent = "Drawing";
  el.countdownPanel.hidden = true;
  prepareDraw();

  const pace = PACE.dramatic;
  const flatItems = flatDrawItems();
  const requestedElapsedMs = Math.max(0, options.elapsedMs || 0);
  const startedAtMs = Number.isFinite(options.startedAtMs) ? options.startedAtMs : Date.now() - requestedElapsedMs;
  const elapsedMs = Math.max(0, Date.now() - startedAtMs);
  state.drawStartedAtMs = startedAtMs;
  state.drawTotalMs = drawTotalDuration(flatItems);
  updateTimeRemaining();

  renderCards();

  while (true) {
    const position = drawPositionForElapsed(flatItems, Date.now() - startedAtMs);
    let itemIndex = position.itemIndex;
    let inSlotMs = position.inSlotMs;
    applyDrawProgress(flatItems, itemIndex);

    if (itemIndex >= flatItems.length) {
      completeDraw();
      return;
    }

    const item = flatItems[itemIndex];
    const itemStartAtMs = startedAtMs + position.itemStartMs;
    const spinDurationMs = position.spinMs;
    const itemEndAtMs = itemStartAtMs + position.slotMs;
    state.activePlayer = item.playerIndex;
    state.activeItem = item;
    el.stageTitle.textContent = `Now drawing: ${item.entry.name}`;
    renderCards();
    renderActiveCard();
    updateTimeRemaining();

    if (inSlotMs < spinDurationMs) {
      const landedTeam = await spinTo(item.team, {
        elapsedMs: inSlotMs,
        spinMs: pace.spinMs,
        throwVelocity: item.throwVelocity,
        wheelTeams: item.wheelTeams,
        startAngle: item.startAngle,
        landingAngle: item.landingAngle,
        wallClockStartMs: itemStartAtMs,
        deadlineMs: itemStartAtMs + spinDurationMs
      });
      if (token !== state.drawToken) return;
      revealFlatItem(item, landedTeam || item.team);
      renderCards();
      renderActiveCard();
      await delay(Math.max(pace.pause, itemEndAtMs - Date.now()));
    } else {
      state.wheelTeams = [...item.wheelTeams];
      state.wheel.angle = item.landingAngle;
      revealFlatItem(item);
      renderCards();
      renderActiveCard();
      await delayUntil(itemEndAtMs);
    }

    if (token !== state.drawToken) return;
    renderCards();
    renderActiveCard();
  }
}

function resetApp() {
  state.drawToken += 1;
  document.querySelector(".app-shell").classList.remove("sidebar-hidden");
  window.setTimeout(resizeWheel, 0);
  const pendingResolve = state.wheel.resolve;
  state.running = false;
  state.activePlayer = -1;
  state.activeTeam = null;
  state.activeItem = null;
  state.drawStartedAtMs = null;
  state.drawTotalMs = 0;
  updateSetupPreview();
  state.draw = parsePlayers().map((name) => ({ name, teams: Array.from({ length: currentCountryCount() }) }));
  state.removed = [];
  state.pendingRemovalCodes = new Set();
  state.drawItems = [];
  state.revealedByPlayer = new Map();
  state.wheelTeams = [...TEAMS];
  state.wheel.angle = centeredWheelAngle(state.wheelTeams.length);
  state.wheel.target = null;
  state.wheel.velocity = 0;
  state.wheel.wallClockStartMs = null;
  state.wheel.simElapsed = 0;
  state.wheel.physicsAccumulator = 0;
  state.wheel.spinning = false;
  state.wheel.resolve = null;
  state.wheel.settleTeam = null;
  state.wheel.settleAngle = null;
  state.wheel.forceSettleMs = null;
  state.wheel.deadlineMs = null;
  if (state.wheel.deadlineTimer) {
    window.clearTimeout(state.wheel.deadlineTimer);
    state.wheel.deadlineTimer = null;
  }
  state.wheel.lastPegPocket = -1;
  state.wheel.wobble = 0;
  state.wheel.wobbleVelocity = 0;
  state.wheel.clickerAngle = 0;
  state.wheel.clickerVelocity = 0;
  state.wheel.clickerLocked = false;
  document.documentElement.style.setProperty("--clicker-angle", "0rad");
  el.start.disabled = false;
  el.status.textContent = "Idle";
  el.stageTitle.textContent = "Ready for the draw";
  updateTimeRemaining();
  renderActiveCard();
  renderCards();
  if (pendingResolve) pendingResolve();
}

function init() {
  el.names.value = SAMPLE_NAMES.map((name, index) => name || `Player ${index + 1}`).join("\n");
  preloadCountryFlags();
  hydrateFromUrl();
  updateSetupPreview();
  state.draw = parsePlayers().map((name) => ({ name, teams: Array.from({ length: currentCountryCount() }) }));
  state.revealedByPlayer = new Map(state.draw.map((_, index) => [index, []]));
  renderCards();
  renderActiveCard();
  resizeWheel();
  setupScheduledStart();
  requestAnimationFrame(drawWheel);
}

window.addEventListener("resize", resizeWheel);
el.names.addEventListener("input", () => {
  updateSetupPreview();
  if (!state.running) {
    state.draw = parsePlayers().map((name) => ({ name, teams: Array.from({ length: currentCountryCount() }) }));
    state.revealedByPlayer = new Map(state.draw.map((_, index) => [index, []]));
    renderCards();
  }
});
function handleCountryCountChange() {
  updateSetupPreview();
  if (!state.running) {
    state.draw = parsePlayers().map((name) => ({ name, teams: Array.from({ length: currentCountryCount() }) }));
    state.revealedByPlayer = new Map(state.draw.map((_, index) => [index, []]));
    renderCards();
  }
}
el.countryCount.addEventListener("input", handleCountryCountChange);
el.countryCount.addEventListener("change", handleCountryCountChange);

el.start.addEventListener("click", () => {
  runDraw().catch(handleDrawError);
});

el.reset.addEventListener("click", resetApp);
el.share.addEventListener("click", copyShareLink);
el.quickTimes.forEach((button) => {
  button.addEventListener("click", () => {
    setStartOffset(Number(button.dataset.startOffset));
  });
});

init();
