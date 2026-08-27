/* Engine defaults, mirrored from qml/engine/engine_defaults/*.json in the VNgine repo.
   Keep in sync when the engine defaults change. */

window.ENGINE_DEFAULTS = {
  textbox: {
    style: {
      position: "bottom",
      height: 0.25,
      margins: { left: 0, right: 0, top: 0, bottom: 0 },
      padding: { left: 24, right: 24, top: 24, bottom: 24 },
      background: { color: "#000000", opacity: 0.7 },
      border: { width: 0, color: "#000000", opacity: 1 },
      radius: 0
    }
  },
  choice: {
    style: {
      grid: {
        columns: 1,
        spacing: 16,
        width: 0.8,
        margins: { left: 0, right: 0, top: 0, bottom: 0 },
        padding: { left: 0, right: 0, top: 0, bottom: 0 },
        background: { color: "#000000", opacity: 0 },
        border: { width: 0, color: "#000000", opacity: 1 },
        radius: 0
      },
      option: {
        min_height: 0,
        padding: { left: 24, right: 24, top: 16, bottom: 16 },
        background: { color: "#000000", opacity: 0.7 },
        border: { width: 0, color: "#000000", opacity: 1 },
        radius: 0,
        text: { color: null }
      }
    }
  },
  hud: {
    style: { color: "#000000", opacity: 0.7 }
  }
};

/* Device profiles for the previews, given as the portrait (short × long) resolution.
   Silica's Theme.pixelRatio scales against a 540 px wide reference screen, so the
   generators derive it as shortSide / 540 rather than hard-coding a number.
   The game screen itself is landscape (GameScreen.qml forces Orientation.Landscape). */
window.PIXEL_RATIO_REFERENCE = 540;

window.DEVICE_PROFILES = [
  { id: "xperia10iii", label: "Xperia 10 III — 1080×2520", width: 1080, height: 2520 },
  { id: "jolla-c2",    label: "Jolla C2 — 720×1600",       width: 720,  height: 1600 },
  { id: "xperia-xa2",  label: "Xperia XA2 — 1080×1920",    width: 1080, height: 1920 },
  { id: "base",        label: "Reference — 540×960",       width: 540,  height: 960 },
  { id: "custom",      label: "Custom…",                   width: 1080, height: 2340, custom: true }
];
