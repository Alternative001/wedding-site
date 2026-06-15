/**
 * <tilt-card> — interactive 3D tilt / parallax built from stacked image layers.
 *
 * Three same-size images are stacked (background, then subject-1, then
 * subject-2). On desktop the layers tilt toward the cursor; on mobile they
 * tilt with the phone (DeviceOrientation). Each layer moves by its own
 * multiplier so the front subject travels most and the background least,
 * producing a depth illusion. With JS off, no sensors, or reduced-motion
 * preference, the three images simply show as a static composite.
 *
 * Usage (matches image-slot.js — load once, then use the tag in markup/JSX):
 *   <script src="tilt-card.js"></script>
 *   <tilt-card
 *     bg="assets/3d%20picture/3d-bg.jpg"
 *     layer1="assets/3d%20picture/3d-subject-1.png"
 *     layer2="assets/3d%20picture/3d-subject-2.png"
 *     ratio="1448 / 1086"
 *     radius="14"
 *     alt="Lisa and Julian"></tilt-card>
 *
 * Attributes:
 *   bg, layer1, layer2  Image URLs, painted back-to-front in that order.
 *   ratio   CSS aspect-ratio for the card box.   (default '1448 / 1086')
 *   radius  Corner radius in px.                  (default 14)
 *   alt     Accessible name for the composite.    (default '')
 */

/* ──────────────────────────────────────────────────────────────────────────
 * TUNING — tweak these to dial the effect in after seeing it live.
 * ────────────────────────────────────────────────────────────────────────── */

// Peak rotation (degrees) applied at the very edge of the card, before each
// layer's own multiplier. Keep it small — 5–10 is the subtle range.
const MAX_TILT_DEG = 8;

// Peak parallax shift (px) at the edge, before each layer's own multiplier.
const MAX_SHIFT_PX = 16;

// Per-layer intensity. `rot` scales the rotation, `shift` scales the parallax
// translate. Background moves least, the front subject moves most. THESE are
// the knobs to play with per layer.
const LAYERS = [
  { key: 'bg',     rot: 0.12, shift: 0.10 },   // background — barely moves
  { key: 'layer1', rot: 0.55, shift: 0.50 },   // mid subject
  { key: 'layer2', rot: 1.00, shift: 1.00 },   // front subject — moves most
];

// Slight constant zoom so rotation/shift never exposes the card edges.
const OVERSCALE = 1.06;

// Depth of the CSS perspective (px). Smaller = stronger 3D.
const PERSPECTIVE_PX = 900;

// Smoothing of layer motion + ease-back to neutral (ms).
const EASE_MS = 220;

// How many degrees of phone tilt map to the full effect (mobile).
const ORIENT_RANGE_DEG = 28;

/* ────────────────────────────────────────────────────────────────────────── */

(() => {
  const reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const layerTransform = (cfg, nx, ny) => {
    // nx, ny are normalized cursor/tilt offsets in [-1, 1] (0,0 = centre).
    const rx = (-ny * MAX_TILT_DEG * cfg.rot).toFixed(2);   // tilt up/down
    const ry = ( nx * MAX_TILT_DEG * cfg.rot).toFixed(2);   // tilt left/right
    const tx = ( nx * MAX_SHIFT_PX * cfg.shift).toFixed(1);
    const ty = ( ny * MAX_SHIFT_PX * cfg.shift).toFixed(1);
    return 'rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) ' +
           'translate3d(' + tx + 'px,' + ty + 'px,0) scale(' + OVERSCALE + ')';
  };

  const styles =
    ':host{display:block;width:100%;line-height:0}' +
    '.scene{position:relative;width:100%;height:100%;overflow:hidden;' +
    '  perspective:' + PERSPECTIVE_PX + 'px;perspective-origin:50% 50%;' +
    '  background:var(--color-cream,#FFFBF2)}' +
    '.layer{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;' +
    '  transform:scale(' + OVERSCALE + ');transform-origin:50% 50%;' +
    '  backface-visibility:hidden;will-change:transform;' +
    '  transition:transform ' + EASE_MS + 'ms cubic-bezier(.2,.6,.2,1);' +
    '  -webkit-user-drag:none;user-select:none;pointer-events:none}' +
    '.enable{position:absolute;right:10px;bottom:10px;display:none;' +
    '  appearance:none;border:0;border-radius:999px;cursor:pointer;' +
    '  padding:7px 12px;font:600 12px/1 system-ui,-apple-system,sans-serif;' +
    '  letter-spacing:.01em;color:#fff;background:rgba(30,71,181,.85);' +
    '  backdrop-filter:blur(6px);box-shadow:0 2px 8px rgba(0,0,0,.18)}' +
    '.enable[data-show]{display:block}';

  class TiltCard extends HTMLElement {
    static get observedAttributes() { return ['bg', 'layer1', 'layer2', 'ratio', 'radius', 'alt']; }

    constructor() {
      super();
      const root = this.attachShadow({ mode: 'open' });
      root.innerHTML =
        '<style>' + styles + '</style>' +
        '<div class="scene" part="scene">' +
        '  <img class="layer" data-k="bg" alt="" draggable="false">' +
        '  <img class="layer" data-k="layer1" alt="" draggable="false">' +
        '  <img class="layer" data-k="layer2" alt="" draggable="false">' +
        '  <button class="enable" type="button">Enable tilt</button>' +
        '</div>';
      this._scene = root.querySelector('.scene');
      this._imgs = {
        bg: root.querySelector('[data-k=bg]'),
        layer1: root.querySelector('[data-k=layer1]'),
        layer2: root.querySelector('[data-k=layer2]'),
      };
      this._btn = root.querySelector('.enable');
      this._raf = 0;
      this._target = { nx: 0, ny: 0 };
      this._base = null;             // orientation baseline (first reading)
      // Bound once so connect/disconnect stay symmetric across React remounts.
      this._onMove = this._onMove.bind(this);
      this._onLeave = this._onLeave.bind(this);
      this._onOrient = this._onOrient.bind(this);
      this._onEnable = this._onEnable.bind(this);
    }

    attributeChangedCallback() { if (this.shadowRoot) this._render(); }

    connectedCallback() {
      this._render();
      if (reduceMotion) return;     // static composite — honour the OS setting

      // Desktop pointer: harmless on touch (rarely fires there).
      this._scene.addEventListener('mousemove', this._onMove);
      this._scene.addEventListener('mouseleave', this._onLeave);

      // Mobile motion.
      const DOE = window.DeviceOrientationEvent;
      const needsPermission = DOE && typeof DOE.requestPermission === 'function';
      const isTouch = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
      if (needsPermission) {
        // iOS 13+: permission must be requested from a user gesture.
        this._btn.setAttribute('data-show', '');
        this._btn.addEventListener('click', this._onEnable);
      } else if (DOE && isTouch) {
        // Android / older iOS: no permission gate.
        window.addEventListener('deviceorientation', this._onOrient);
      }
    }

    disconnectedCallback() {
      this._scene.removeEventListener('mousemove', this._onMove);
      this._scene.removeEventListener('mouseleave', this._onLeave);
      this._btn.removeEventListener('click', this._onEnable);
      window.removeEventListener('deviceorientation', this._onOrient);
      if (this._raf) cancelAnimationFrame(this._raf);
      this._raf = 0;
    }

    _render() {
      this.style.aspectRatio = this.getAttribute('ratio') || '1448 / 1086';
      const r = parseFloat(this.getAttribute('radius'));
      this._scene.style.borderRadius = (Number.isFinite(r) ? r : 14) + 'px';
      this.shadowRoot.host.setAttribute('role', 'img');
      const alt = this.getAttribute('alt') || '';
      this.shadowRoot.host.setAttribute('aria-label', alt);
      this._setSrc('bg', this.getAttribute('bg'));
      this._setSrc('layer1', this.getAttribute('layer1'));
      this._setSrc('layer2', this.getAttribute('layer2'));
    }

    _setSrc(key, url) {
      const img = this._imgs[key];
      if (url && img.getAttribute('src') !== url) img.setAttribute('src', url);
    }

    // ── Desktop ────────────────────────────────────────────────────────────
    _onMove(e) {
      const rect = this._scene.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      this._schedule(nx, ny);
    }

    _onLeave() { this._schedule(0, 0); }

    // ── Mobile ─────────────────────────────────────────────────────────────
    _onEnable() {
      const DOE = window.DeviceOrientationEvent;
      if (!DOE || typeof DOE.requestPermission !== 'function') return;
      DOE.requestPermission().then((state) => {
        if (state === 'granted') {
          window.addEventListener('deviceorientation', this._onOrient);
          this._btn.removeAttribute('data-show');
        }
      }).catch(() => {});
    }

    _onOrient(e) {
      if (e.beta == null || e.gamma == null) return;
      // First reading becomes neutral, so the effect is relative to however
      // the phone is being held rather than absolute level.
      if (!this._base) this._base = { beta: e.beta, gamma: e.gamma };
      const clamp = (v) => Math.max(-1, Math.min(1, v));
      const nx = clamp((e.gamma - this._base.gamma) / ORIENT_RANGE_DEG); // left/right
      const ny = clamp((e.beta - this._base.beta) / ORIENT_RANGE_DEG);   // front/back
      this._schedule(nx, ny);
    }

    // ── Apply (rAF-throttled) ────────────────────────────────────────────────
    _schedule(nx, ny) {
      this._target.nx = nx;
      this._target.ny = ny;
      if (this._raf) return;
      this._raf = requestAnimationFrame(() => {
        this._raf = 0;
        const { nx, ny } = this._target;
        for (const cfg of LAYERS) {
          this._imgs[cfg.key].style.transform = layerTransform(cfg, nx, ny);
        }
      });
    }
  }

  if (!customElements.get('tilt-card')) {
    customElements.define('tilt-card', TiltCard);
  }
})();
