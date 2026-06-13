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

  // ── Hero scroll-takeover scrub ────────────────────────────────────────────
  // The hero is wrapped in .jl-hero-scroll-wrap (height: 220vh) with a sticky
  // .jl-hero-stage inside. Compute progress 0→1 across the scrub range and
  // write it as --p; CSS in site.css maps that to the illustration zoom and
  // the text fade. Skipped under prefers-reduced-motion.
  var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var heroWrap = null;
  var heroStage = null;
  var heroIll = null;
  var heroScrubTicking = false;

  function findHero() {
    heroWrap = document.querySelector('.jl-hero-scroll-wrap');
    heroStage = heroWrap && heroWrap.querySelector('.jl-hero-stage');
    heroIll = heroWrap && heroWrap.querySelector('.jl-hero-illustration');
  }

  // Measure how far the illustration's centre is from the viewport (= stage)
  // centre and expose it as --dx / --dy. CSS then translates the illustration
  // by (dx*p, dy*p) while scaling around its own centre — keeping the scaled
  // image centred in the viewport. Runs on mount and resize; values are stable
  // while scrolling because the stage is sticky.
  function updateHeroOrigin() {
    if (!heroWrap || !heroStage || !heroIll || prefersReducedMotion) return;
    var prevTransform = heroIll.style.transform;
    heroIll.style.transform = 'none';
    var stageRect = heroStage.getBoundingClientRect();
    var illRect = heroIll.getBoundingClientRect();
    heroIll.style.transform = prevTransform;
    var illCenterX = illRect.left + illRect.width / 2;
    var illCenterY = illRect.top + illRect.height / 2;
    var stageCenterX = stageRect.left + stageRect.width / 2;
    var stageCenterY = stageRect.top + stageRect.height / 2;
    var dx = stageCenterX - illCenterX;
    var dy = stageCenterY - illCenterY;
    heroWrap.style.setProperty('--dx', dx.toFixed(2) + 'px');
    heroWrap.style.setProperty('--dy', dy.toFixed(2) + 'px');
  }

  function updateHeroScrub() {
    heroScrubTicking = false;
    if (!heroWrap || prefersReducedMotion) return;
    var rect = heroWrap.getBoundingClientRect();
    var range = rect.height - window.innerHeight;
    if (range <= 0) return;
    var p = -rect.top / range;
    if (p < 0) p = 0; else if (p > 1) p = 1;
    heroWrap.style.setProperty('--p', p.toFixed(4));
    if (p > 0.9) heroWrap.classList.add('is-faded');
    else heroWrap.classList.remove('is-faded');
  }

  function onHeroScroll() {
    if (heroScrubTicking) return;
    heroScrubTicking = true;
    requestAnimationFrame(updateHeroScrub);
  }

  function onHeroResize() {
    updateHeroOrigin();
    onHeroScroll();
  }

  ready(function () {
    findHero();
    updateHeroOrigin();
    updateHeroScrub();
  });
  // The wrap is rendered by React after window.load — re-bind once it appears.
  var heroBindAttempts = 0;
  function bindHeroWhenReady() {
    if (heroWrap) return;
    findHero();
    if (heroWrap) { updateHeroOrigin(); updateHeroScrub(); return; }
    if (heroBindAttempts++ < 40) setTimeout(bindHeroWhenReady, 100);
  }
  bindHeroWhenReady();
  window.addEventListener('scroll', onHeroScroll, { passive: true });
  window.addEventListener('resize', onHeroResize, { passive: true });

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
