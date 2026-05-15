// Footer.jsx — wordmark, date, German legal lines
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
        <a href="#">Wunschliste</a>
        <span>·</span>
        <a href="#">Impressum</a>
        <span>·</span>
        <a href="#">Datenschutz</a>
      </div>
      <div className="jl-footer-fine">
        Mit viel Liebe gemacht · Made with 💛 in München
      </div>
    </div>
  </footer>
);

window.Footer = Footer;
