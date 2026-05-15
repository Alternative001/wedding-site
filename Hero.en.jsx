// Hero.en.jsx — English hero section
const Hero = () => (
  <section id="hero" className="jl-hero" data-screen-label="Hero">
    <div className="jl-hero-stripes" aria-hidden="true"></div>

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


      <p className="jl-hero-tag">
        🍋 come and spend a day of
        <span className="jl-script-md">La Dolce Vita</span>
        with us 🍋
      </p>

      <div className="jl-hero-cta-row">
        <a href="#rsvp" className="jl-btn jl-btn-primary" onClick={(e) => { e.preventDefault(); document.getElementById('rsvp')?.scrollIntoView({behavior:'smooth'}); }}>
          RSVP now
        </a>
        <a href="#program" className="jl-btn jl-btn-ghost" onClick={(e) => { e.preventDefault(); document.getElementById('program')?.scrollIntoView({behavior:'smooth'}); }}>
          View schedule →
        </a>
      </div>
    </div>
  </section>
);

window.Hero = Hero;
