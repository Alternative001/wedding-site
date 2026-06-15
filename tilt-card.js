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

// Peak rotation (degrees) at full cursor/tilt deflection, before each layer's
// own multiplier. Keep it small — 5–10 is the subtle range.
const MAX_TILT_DEG = 6;

// Peak parallax shift (px) at full deflection, before each layer's multiplier.
const MAX_SHIFT_PX = 9;

// Per-layer intensity. `rot` scales the rotation, `shift` scales the parallax
// translate. Background moves least. The two foreground subjects sit close
// together in the photo, so layer1 and layer2 are kept CLOSE to each other —
// a big gap makes them visibly slide apart. THESE are the knobs to tune.
const LAYERS = [
  { key: 'bg',     rot: 0.10, shift: 0.05 },   // background — barely moves
  { key: 'layer1', rot: 0.70, shift: 0.66 },   // foreground subject
  { key: 'layer2', rot: 0.82, shift: 0.78 },   // front subject — only a touch more than layer1
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

  const clamp = (v) => Math.max(-1, Math.min(1, v));

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
      this._mode = 'norm';           // 'ptr' (cursor) or 'norm' (orientation / reset)
      this._nx = 0; this._ny = 0;    // normalized target for 'norm' mode
      this._px = 0; this._py = 0;    // last cursor viewport coords for 'ptr' mode
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

      // Desktop pointer: listen on the whole window so the card follows the
      // cursor anywhere on the page, not just while hovering the picture.
      window.addEventListener('mousemove', this._onMove);
      // Ease back to neutral when the cursor leaves the document entirely.
      document.documentElement.addEventListener('mouseleave', this._onLeave);

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
      window.removeEventListener('mousemove', this._onMove);
      document.documentElement.removeEventListener('mouseleave', this._onLeave);
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
    // The cursor can be anywhere on the page; its offset from the card centre
    // (relative to the viewport) becomes the tilt, so the picture turns toward
    // the cursor wherever it is. The card-centre read happens in the rAF below
    // so there's at most one layout read per frame.
    _onMove(e) {
      this._px = e.clientX;
      this._py = e.clientY;
      this._mode = 'ptr';
      this._schedule();
    }

    _onLeave() { this._mode = 'norm'; this._nx = 0; this._ny = 0; this._schedule(); }

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
      this._nx = clamp((e.gamma - this._base.gamma) / ORIENT_RANGE_DEG); // left/right
      this._ny = clamp((e.beta - this._base.beta) / ORIENT_RANGE_DEG);   // front/back
      this._mode = 'norm';
      this._schedule();
    }

    // ── Apply (rAF-throttled; one layout read per frame) ─────────────────────
    _schedule() {
      if (this._raf) return;
      this._raf = requestAnimationFrame(() => {
        this._raf = 0;
        let nx, ny;
        if (this._mode === 'ptr') {
          const r = this._scene.getBoundingClientRect();
          if (!r.width || !r.height) return;
          nx = clamp((this._px - (r.left + r.width / 2)) / (window.innerWidth / 2));
          ny = clamp((this._py - (r.top + r.height / 2)) / (window.innerHeight / 2));
        } else {
          nx = this._nx;
          ny = this._ny;
        }
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
