/* animations.js — scroll reveals, parallax, progress bar, cursor trail, confetti */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else { fn(); }
  }

  // ── Scroll Progress Bar ────────────────────────────────────────────────────
  var bar;
  ready(function () {
    bar = document.createElement('div');
    bar.id = 'jl-progress';
    document.body.prepend(bar);
  });
  window.addEventListener('scroll', function () {
    if (!bar) return;
    const h = document.documentElement;
    const pct = h.scrollTop / (h.scrollHeight - h.clientHeight) || 0;
    bar.style.transform = 'scaleX(' + pct + ')';
  }, { passive: true });

  // ── Intersection Observer Reveals ──────────────────────────────────────────
  const revealIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        revealIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

  function setupReveal() {
    var selectors = [
      '.jl-section-head',
      '.jl-prose p',
      '.jl-story-grid > img',
      '.jl-info-card',
      '.jl-timeline-row',
      '.jl-faq-item',
      '.jl-dresscode',
      '.jl-day-tabs',
      '.jl-schedule-card',
      '.jl-venue-map',
    ];
    selectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        if (el.dataset.rvDone) return;
        el.dataset.rvDone = '1';
        el.classList.add('jl-reveal');
        revealIO.observe(el);
      });
    });
    // Stagger timeline rows within each card
    document.querySelectorAll('.jl-timeline').forEach(function (tl) {
      tl.querySelectorAll('.jl-timeline-row').forEach(function (r, i) {
        r.style.transitionDelay = (i * 85) + 'ms';
      });
    });
    // Stagger info-cards within venue grid
    document.querySelectorAll('.jl-venue-grid').forEach(function (grid) {
      grid.querySelectorAll('.jl-info-card').forEach(function (c, i) {
        c.style.transitionDelay = (i * 90) + 'ms';
      });
    });
  }

  // React mounts after window.load (in-browser Babel compile), so watch #root
  // for new nodes and (re)run setupReveal whenever the tree changes.
  function attachReactWatcher() {
    var rootEl = document.getElementById('root');
    if (!rootEl) { setTimeout(attachReactWatcher, 100); return; }
    setupReveal();
    var mo = new MutationObserver(function () { setupReveal(); });
    mo.observe(rootEl, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachReactWatcher);
  } else {
    attachReactWatcher();
  }
  window.addEventListener('load', function () { setTimeout(setupReveal, 150); });
  // Re-run after React re-renders (e.g. schedule tab switches reveal new timeline rows)
  window.jlRefreshReveal = setupReveal;

  // ── Parallax (hero stripes only) ──────────────────────────────────────────
  window.addEventListener('scroll', function () {
    var stripes = document.querySelector('.jl-hero-stripes');
    if (stripes) stripes.style.transform = 'translateY(' + (window.scrollY * 0.3) + 'px)';
  }, { passive: true });

  // ── Lemon Cursor Trail (desktop only) ────────────────────────────────────
  if (!('ontouchstart' in window)) {
    var EMOJIS = ['🍋', '🍋', '🍋', '✨', '💛'];
    var lastTrail = 0;
    document.addEventListener('mousemove', function (e) {
      var now = Date.now();
      if (now - lastTrail < 88) return;
      lastTrail = now;
      var el = document.createElement('span');
      el.className = 'jl-trail';
      el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
      el.style.left = e.clientX + 'px';
      el.style.top  = e.clientY + 'px';
      document.body.appendChild(el);
      // Double rAF so transition kicks in after paint
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { el.classList.add('is-gone'); });
      });
      setTimeout(function () { el.remove(); }, 950);
    });
  }

  // ── Confetti ───────────────────────────────────────────────────────────────
  window.triggerConfetti = function () {
    var COLORS = ['#FFE566', '#FFF4C9', '#1E47B5', '#7EA7E0', '#FFFBF2', '#B8D2F1'];
    var EMOJIS  = ['🍋', '✨', '💛', '🎉'];
    for (var i = 0; i < 90; i++) {
      (function (delay) {
        setTimeout(function () {
          var el = document.createElement('span');
          el.className = 'jl-confetti';
          if (Math.random() < 0.22) {
            el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
            el.style.fontSize = '20px';
          } else {
            el.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
            var sz = 7 + Math.random() * 8;
            el.style.width  = sz + 'px';
            el.style.height = sz + 'px';
            el.style.borderRadius = Math.random() > 0.5 ? '50%' : '3px';
          }
          el.style.left = (8 + Math.random() * 84) + 'vw';
          var dur = 1.3 + Math.random() * 1.5;
          el.style.animationDuration = dur + 's';
          document.body.appendChild(el);
          setTimeout(function () { el.remove(); }, (dur + 0.3) * 1000);
        }, delay);
      }(Math.random() * 450));
    }
  };

})();
