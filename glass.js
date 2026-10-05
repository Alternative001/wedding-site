// glass.js — cursor-follow reflection for the liquid-glass surfaces.
// Delegated pointermove: set --mx/--my on whichever glass element the cursor is
// over, so each element's CSS ::before radial sheen tracks the pointer. Uses the
// live DOM on every move, so it keeps working across React re-renders.
(function () {
  var SEL = '.jl-nav-cta, .jl-btn, .jl-info-card, .jl-schedule-card, .jl-rsvp, ' +
            '.jl-faq, .jl-hero-eyebrow, .jl-day-tab, .jl-room-card, .jl-stay-card';
  document.addEventListener('pointermove', function (e) {
    var el = e.target && e.target.closest ? e.target.closest(SEL) : null;
    if (!el) return;
    var r = el.getBoundingClientRect();
    el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    el.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }, { passive: true });
})();
