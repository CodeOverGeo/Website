// Interactive Design Decision Picker runtime (#47)
// Dynamically updates CSS custom properties for Accent, Canvas, Fonts, Shape, and Headline Emphasis.

const ACCENTS = {
  pine: {
    label: 'Pine Mint (/ai bridge)',
    hex: '#5EC29A',
    hover: '#76CFA9',
  },
  gold: {
    label: 'Signal Gold (/ai amber)',
    hex: '#F0B429',
    hover: '#F5C44E',
  },
  sky: {
    label: 'Arctic Sky',
    hex: '#67B7F7',
    hover: '#86C7FA',
  },
  cobalt: {
    label: 'Electric Cobalt',
    hex: '#60A5FA',
    hover: '#7DB6FC',
  },
  teal: {
    label: 'Mineral Verdigris',
    hex: '#38C6BD',
    hover: '#57D3CB',
  },
  lime: {
    label: 'Editorial Chartreuse',
    hex: '#B8E04A',
    hover: '#C7E86B',
  },
  crimson: {
    label: 'Stage Vermilion',
    hex: '#F26B6B',
    hover: '#F68787',
  },
  ivory: {
    label: 'Monochrome Ivory',
    hex: '#F3EFE6',
    hover: '#FFFFFF',
  },
};

const CANVASES = {
  obsidian: {
    label: 'Warm Obsidian',
    scheme: 'dark',
    bg: '#111210',
    surface: '#191B18',
    elevated: '#222520',
    text: '#F3EFE6',
    muted: '#B0ACA2',
    border: '#2C302A',
    headerBg: 'rgb(17 18 16 / 0.92)',
  },
  pineNight: {
    label: 'Deep Pine Night',
    scheme: 'dark',
    bg: '#0C1411',
    surface: '#131F1A',
    elevated: '#1B2B24',
    text: '#ECF3EF',
    muted: '#9FB3A8',
    border: '#253930',
    headerBg: 'rgb(12 20 17 / 0.92)',
  },
  slate: {
    label: 'Midnight Slate',
    scheme: 'dark',
    bg: '#0B0F17',
    surface: '#131926',
    elevated: '#1B2334',
    text: '#F1F5F9',
    muted: '#94A3B8',
    border: '#243046',
    headerBg: 'rgb(11 15 23 / 0.92)',
  },
  graphite: {
    label: 'Studio Graphite',
    scheme: 'dark',
    bg: '#121214',
    surface: '#1A1A1E',
    elevated: '#232329',
    text: '#F4F4F6',
    muted: '#A1A1AA',
    border: '#2C2C34',
    headerBg: 'rgb(18 18 20 / 0.92)',
  },
  paper: {
    label: 'Warm Paper (Light check)',
    scheme: 'light',
    bg: '#F4F5F1',
    surface: '#FFFFFF',
    elevated: '#EAECE5',
    text: '#161E1A',
    muted: '#4A5750',
    border: '#D2DBD4',
    headerBg: 'rgb(244 245 241 / 0.94)',
  },
};

const DISPLAY_FONTS = {
  newsreader: { label: 'Newsreader (Editorial Serif)', stack: "'Newsreader', Georgia, serif" },
  fraunces: { label: 'Fraunces (Warm Book Serif)', stack: "'Fraunces', Georgia, serif" },
  instrumentSerif: { label: 'Instrument Serif (Tall Stage Serif)', stack: "'Instrument Serif', Georgia, serif" },
  spaceGrotesk: { label: 'Space Grotesk (Architectural Sans)', stack: "'Space Grotesk', system-ui, sans-serif" },
  jakarta: { label: 'Plus Jakarta Sans (Executive Sans)', stack: "'Plus Jakarta Sans', system-ui, sans-serif" },
  outfit: { label: 'Outfit (Clean Geometric Sans)', stack: "'Outfit', system-ui, sans-serif" },
};

const BODY_FONTS = {
  dmSans: { label: 'DM Sans', stack: "'DM Sans', system-ui, -apple-system, sans-serif" },
  atkinson: { label: 'Atkinson Hyperlegible (/ai font)', stack: "'Atkinson Hyperlegible', system-ui, sans-serif" },
  jakarta: { label: 'Plus Jakarta Sans', stack: "'Plus Jakarta Sans', system-ui, sans-serif" },
  inter: { label: 'Inter', stack: "'Inter', system-ui, -apple-system, sans-serif" },
};

const MONO_FONTS = {
  fira: { label: 'Fira Code', stack: "'Fira Code', ui-monospace, monospace" },
  jetbrains: { label: 'JetBrains Mono', stack: "'JetBrains Mono', ui-monospace, monospace" },
  plex: { label: 'IBM Plex Mono', stack: "'IBM Plex Mono', ui-monospace, monospace" },
  spaceMono: { label: 'Space Mono', stack: "'Space Mono', ui-monospace, monospace" },
};

const SHAPES = {
  pill: { label: 'Stage Pill', btnRadius: '999px', cardRadius: '1rem' },
  editorial: { label: 'Editorial Soft', btnRadius: '0.5rem', cardRadius: '0.75rem' },
  crisp: { label: 'Architectural Crisp', btnRadius: '0.25rem', cardRadius: '0.375rem' },
};

const DEFAULT_STATE = {
  accent: 'cobalt',
  customHex: '#60A5FA',
  canvas: 'slate',
  displayFont: 'spaceGrotesk',
  bodyFont: 'atkinson',
  monoFont: 'fira',
  shape: 'pill',
  italicAccent: 'off',
};

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const num = parseInt(full, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function srgbChannel(c) {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  return 0.2126 * srgbChannel(r) + 0.7152 * srgbChannel(g) + 0.0722 * srgbChannel(b);
}

function contrastRatio(hexA, hexB) {
  const l1 = relativeLuminance(hexA);
  const l2 = relativeLuminance(hexB);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function darkenHex(hex, amount = 0.35) {
  const { r, g, b } = hexToRgb(hex);
  const f = 1 - amount;
  const toHex = (n) => Math.max(0, Math.min(255, Math.round(n * f))).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function lightenHex(hex, amount = 0.14) {
  const { r, g, b } = hexToRgb(hex);
  const toHex = (n) => Math.max(0, Math.min(255, Math.round(n + (255 - n) * amount))).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function initDesignPicker() {
  const form = document.getElementById('design-picker-form');
  const panel = document.getElementById('picker-panel');
  const toggleBtn = document.getElementById('picker-toggle');
  const closeBtn = document.getElementById('picker-minimize');
  const resetBtn = document.getElementById('picker-reset');
  const summaryEl = document.getElementById('picker-token-summary');
  const contrastBadge = document.getElementById('picker-contrast-badge');
  const customColorInput = document.getElementById('custom-accent-color');
  const customHexLabel = document.getElementById('custom-hex-label');

  if (!form) return;

  let state = { ...DEFAULT_STATE };
  try {
    const saved = JSON.parse(localStorage.getItem('geo_design_picker_v1') || 'null');
    if (saved && typeof saved === 'object') {
      state = { ...DEFAULT_STATE, ...saved };
    }
  } catch {}

  function applyState() {
    const canvas = CANVASES[state.canvas] || CANVASES.obsidian;
    const isLight = canvas.scheme === 'light';

    let rawAccentHex = state.accent === 'custom' ? state.customHex : (ACCENTS[state.accent]?.hex || ACCENTS.pine.hex);
    let hoverHex = state.accent === 'custom' ? lightenHex(rawAccentHex, 0.14) : (ACCENTS[state.accent]?.hover || lightenHex(rawAccentHex, 0.14));

    // On light paper canvas, ensure accent text/borders still hold strong contrast
    let effectiveAccent = rawAccentHex;
    if (isLight && contrastRatio(rawAccentHex, canvas.bg) < 4.5) {
      effectiveAccent = state.accent === 'ivory' ? '#161E1A' : darkenHex(rawAccentHex, 0.48);
      hoverHex = darkenHex(effectiveAccent, 0.15);
    }

    const { r, g, b } = hexToRgb(effectiveAccent);
    const onAccentInk = contrastRatio(effectiveAccent, '#111210') >= contrastRatio(effectiveAccent, '#FFFFFF') ? '#111210' : '#FFFFFF';
    const textContrast = contrastRatio(effectiveAccent, canvas.bg).toFixed(1);

    const display = DISPLAY_FONTS[state.displayFont] || DISPLAY_FONTS.newsreader;
    const body = BODY_FONTS[state.bodyFont] || BODY_FONTS.dmSans;
    const mono = MONO_FONTS[state.monoFont] || MONO_FONTS.jetbrains;
    const shape = SHAPES[state.shape] || SHAPES.pill;

    const root = document.documentElement;
    root.style.colorScheme = canvas.scheme;
    root.style.setProperty('--bg-primary', canvas.bg);
    root.style.setProperty('--bg-surface', canvas.surface);
    root.style.setProperty('--bg-elevated', canvas.elevated);
    root.style.setProperty('--text-primary', canvas.text);
    root.style.setProperty('--text-muted', canvas.muted);
    root.style.setProperty('--border-subtle', canvas.border);
    root.style.setProperty('--header-bg', canvas.headerBg);

    root.style.setProperty('--accent-primary', effectiveAccent);
    root.style.setProperty('--accent-hover', hoverHex);
    root.style.setProperty('--accent-ink', onAccentInk);
    root.style.setProperty('--accent-soft', `rgb(${r} ${g} ${b} / ${isLight ? '0.11' : '0.14'})`);
    root.style.setProperty('--accent-border', `rgb(${r} ${g} ${b} / 0.34)`);
    root.style.setProperty('--spotlight-glow', `rgb(${r} ${g} ${b} / ${isLight ? '0.08' : '0.11'})`);

    root.style.setProperty('--font-display', display.stack);
    root.style.setProperty('--font-body', body.stack);
    root.style.setProperty('--font-mono', mono.stack);
    root.style.setProperty('--radius-btn', shape.btnRadius);
    root.style.setProperty('--radius-card', shape.cardRadius);
    root.style.setProperty('--hero-em-style', state.italicAccent === 'on' ? 'italic' : 'normal');

    if (customColorInput) customColorInput.value = rawAccentHex;
    if (customHexLabel) customHexLabel.textContent = rawAccentHex.toUpperCase();

    if (contrastBadge) {
      const pass = parseFloat(textContrast) >= 4.5 ? 'WCAG AA ✓' : parseFloat(textContrast) >= 3.0 ? 'AA Large ✓' : 'Low contrast';
      contrastBadge.textContent = `${effectiveAccent.toUpperCase()} · ${textContrast}:1 (${pass})`;
    }

    const accentLabel = state.accent === 'custom' ? `Custom (${effectiveAccent.toUpperCase()})` : `${ACCENTS[state.accent]?.label} (${effectiveAccent.toUpperCase()})`;
    if (summaryEl) {
      summaryEl.value = [
        `Layout Base: Keynote Stage (Direction C)`,
        `Canvas: ${canvas.label} (bg ${canvas.bg}, surface ${canvas.surface})`,
        `Accent: ${accentLabel} (contrast ${textContrast}:1 on canvas, CTA text ${onAccentInk})`,
        `Display Font: ${display.label} (Italic emphasis: ${state.italicAccent === 'on' ? 'On' : 'Off'})`,
        `Body Font: ${body.label}`,
        `Mono Font: ${mono.label}`,
        `Geometry: ${shape.label} (buttons ${shape.btnRadius}, cards ${shape.cardRadius})`,
      ].join('\n');
    }

    try {
      localStorage.setItem('geo_design_picker_v1', JSON.stringify(state));
    } catch {}

    // Re-trigger responsive navbar measurement when font metrics change
    window.dispatchEvent(new Event('resize'));
  }

  function syncControlsFromState() {
    for (const [key, val] of Object.entries(state)) {
      if (key === 'customHex') continue;
      const radio = form.querySelector(`input[name="${key}"][value="${val}"]`);
      if (radio) radio.checked = true;
      const select = form.querySelector(`select[name="${key}"]`);
      if (select) select.value = val;
    }
    if (customColorInput) customColorInput.value = state.customHex;
  }

  form.addEventListener('input', (event) => {
    const target = event.target;
    if (target === customColorInput) {
      state.accent = 'custom';
      state.customHex = target.value;
      const customRadio = form.querySelector('input[name="accent"][value="custom"]');
      if (customRadio) customRadio.checked = true;
      applyState();
      return;
    }
    if (target.name && target.name in state) {
      state[target.name] = target.value;
      applyState();
    }
  });

  resetBtn?.addEventListener('click', () => {
    state = { ...DEFAULT_STATE };
    syncControlsFromState();
    applyState();
  });

  function setExpanded(expanded) {
    if (!panel || !toggleBtn) return;
    panel.hidden = !expanded;
    toggleBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  }

  toggleBtn?.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    setExpanded(!isExpanded);
  });

  closeBtn?.addEventListener('click', () => {
    setExpanded(false);
    toggleBtn?.focus();
  });

  // Start open on desktop (>= 900px) so Geo sees it immediately, collapsed on narrow mobile so it doesn't cover the hero
  if (window.innerWidth < 900) {
    setExpanded(false);
  } else {
    setExpanded(true);
  }

  syncControlsFromState();
  applyState();
}

document.addEventListener('DOMContentLoaded', initDesignPicker);
