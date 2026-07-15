export interface Rect {
  left: number;
  top: number;
  width: number;
  height: number;
}

const VIDEO_WIDTH = 3828;
const VIDEO_HEIGHT = 2164;

/** Must match the video element's object-position (70% center). */
const OBJECT_POSITION_X = 0.7;

/**
 * TV glass rect as fractions of the video frame, measured on the first and
 * last frame. The head drifts right as the clip is scrubbed, so callers pass
 * the current scrub fraction and we interpolate between the two keyframes.
 */
const GLASS_AT_START = { x: 0.565, y: 0.27, width: 0.15, height: 0.17 };
const GLASS_AT_END = { x: 0.637, y: 0.257, width: 0.141, height: 0.176 };

/** Below this viewport width the zoom is skipped and the panel goes full screen. */
export const FOCUS_BREAKPOINT = 768;

const PANEL_VIEWPORT_SHARE = 0.8;
const PANEL_ASPECT =
  (GLASS_AT_START.width * VIDEO_WIDTH) / (GLASS_AT_START.height * VIDEO_HEIGHT);

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

/** Viewport-space rect of the TV glass at the given scrub fraction (0..1). */
export function tvScreenRect(vw: number, vh: number, scrubFraction: number): Rect {
  const scale = Math.max(vw / VIDEO_WIDTH, vh / VIDEO_HEIGHT);
  const displayedWidth = VIDEO_WIDTH * scale;
  const displayedHeight = VIDEO_HEIGHT * scale;
  const offsetX = (vw - displayedWidth) * OBJECT_POSITION_X;
  const offsetY = (vh - displayedHeight) / 2;
  return {
    left: offsetX + lerp(GLASS_AT_START.x, GLASS_AT_END.x, scrubFraction) * displayedWidth,
    top: offsetY + lerp(GLASS_AT_START.y, GLASS_AT_END.y, scrubFraction) * displayedHeight,
    width: lerp(GLASS_AT_START.width, GLASS_AT_END.width, scrubFraction) * displayedWidth,
    height: lerp(GLASS_AT_START.height, GLASS_AT_END.height, scrubFraction) * displayedHeight,
  };
}

/** Where focused TV content sits, or null below the breakpoint. */
export function focusPanelRect(vw: number, vh: number): Rect | null {
  if (vw < FOCUS_BREAKPOINT) return null;
  const width = Math.min(vw * PANEL_VIEWPORT_SHARE, vh * PANEL_VIEWPORT_SHARE * PANEL_ASPECT);
  const height = width / PANEL_ASPECT;
  return { left: (vw - width) / 2, top: (vh - height) / 2, width, height };
}

function zoomScale(panel: Rect, glass: Rect) {
  return Math.max(panel.width / glass.width, panel.height / glass.height);
}

/** CSS transform that zooms the stage so the TV glass lands on the focus panel. */
export function stageTransform(vw: number, vh: number, scrubFraction: number): string {
  const panel = focusPanelRect(vw, vh);
  if (!panel) return 'none';
  const glass = tvScreenRect(vw, vh, scrubFraction);
  const scale = zoomScale(panel, glass);
  const tx = panel.left + panel.width / 2 - (glass.left + glass.width / 2) * scale;
  const ty = panel.top + panel.height / 2 - (glass.top + glass.height / 2) * scale;
  return `translate(${tx}px, ${ty}px) scale(${scale})`;
}

export interface BroadcastLayout {
  left: number;
  top: number;
  width: number;
  height: number;
  scale: number;
}

/**
 * Layout for the broadcast layer that lives inside the stage: content is laid
 * out at full panel size and counter-scaled down onto the glass, so the stage
 * zoom cancels the scale exactly (net 1:1) and text lands crisp on the panel.
 * Null below the breakpoint — the mobile fallback skips the zoom entirely.
 */
export function broadcastLayout(vw: number, vh: number, scrubFraction: number): BroadcastLayout | null {
  const panel = focusPanelRect(vw, vh);
  if (!panel) return null;
  const glass = tvScreenRect(vw, vh, scrubFraction);
  const scale = zoomScale(panel, glass);
  return {
    left: glass.left + glass.width / 2 - panel.width / (2 * scale),
    top: glass.top + glass.height / 2 - panel.height / (2 * scale),
    width: panel.width,
    height: panel.height,
    scale: 1 / scale,
  };
}
