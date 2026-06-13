// Hero.jsx — illustrated couple sketch + big wordmark wedding announcement
// Scroll-driven takeover: as the user scrolls, the illustration zooms to fill
// the viewport while the surrounding text fades out, then releases to the page.
const Hero = () => (
  <section id="hero" className="jl-hero-scroll-wrap" data-screen-label="Hero">
    <div className="jl-hero-stage">
      <div className="jl-hero-stripes" aria-hidden="true"></div>

      <div className="jl-hero">
        <div className="jl-hero-inner">
          <div className="jl-hero-eyebrow">
            <span className="jl-eyebrow">24 · 07 · 2027</span>
            <span className="jl-hero-dot">·</span>
            <span className="jl-eyebrow">Lago di Garda · Italia</span>
          </div>

          <div className="jl-hero-wordmark">
            <div className="jl-hero-names">
              <span>LISA</span>
              <span className="jl-hero-amp">&amp;</span>
              <span>JULIAN's</span>
            </div>
            <div className="jl-hero-wedding">
              <span className="jl-script-xl">Wedding</span>
            </div>
          </div>

          <div className="jl-hero-illustration">
            <img src="assets/illustration-hero-picture.png" alt="Lisa and Julian kissing at sunset on Lago di Garda — yellow line illustration" />
          </div>

          <p className="jl-hero-tag">
             🍋 come and spend a day of
            <span className="jl-script-md">La Dolce Vita</span>
            with us 🍋
          </p>

          <div className="jl-hero-cta-row">
            <a href="#rsvp" className="jl-btn jl-btn-primary" onClick={(e) => { e.preventDefault(); document.getElementById('rsvp')?.scrollIntoView({behavior:'smooth'}); }}>
              Jetzt zusagen
            </a>
            <a href="#program" className="jl-btn jl-btn-ghost" onClick={(e) => { e.preventDefault(); document.getElementById('program')?.scrollIntoView({behavior:'smooth'}); }}>
              Programm ansehen →
            </a>
          </div>
        </div>
      </div>

      <div className="jl-hero-scroll-hint" aria-hidden="true">
        <span>scroll</span>
        <span className="jl-hero-scroll-arrow">↓</span>
      </div>
    </div>
  </section>
);

window.Hero = Hero;
