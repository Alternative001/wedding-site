// Footer.en.jsx — English footer
const Footer = () => (
  <footer className="jl-footer" data-screen-label="Footer">
    <div className="jl-footer-inner">
      <div className="jl-footer-mark" aria-label="Lisa & Julian">
        <span>LISA</span>
        <span className="jl-footer-amp">&amp;</span>
        <span>JULIAN</span>
      </div>
      <div className="jl-footer-date">
        <span className="jl-script-md">until then —</span>
        <div className="jl-footer-countdown">24 · 07 · 2027</div>
        <div className="jl-eyebrow" style={{ color: 'var(--color-cobalt)' }}>Lago di Garda · Italia</div>
      </div>

      <div className="jl-footer-meta">
        <a href="mailto:hallo@lisa-und-julian.de">hallo@lisa-und-julian.de</a>
        <span>·</span>
        <a href="#">Wish list</a>
        <span>·</span>
        <a href="#">Imprint</a>
        <span>·</span>
        <a href="#">Privacy</a>
      </div>
      <div className="jl-footer-fine">
        Made with love · in Munich &amp; Dubai 💛
      </div>
    </div>
  </footer>
);

window.Footer = Footer;
