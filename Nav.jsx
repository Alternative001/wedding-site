// Nav.jsx — sticky top bar with anchor links (collapses to a menu on mobile)
const Nav = ({ active, onNav }) => {
  const [open, setOpen] = React.useState(false);
  const links = [
    ['hero', 'Start'],
    ['story', 'Wir'],
    ['program', 'Programm'],
    ['venue', 'Anreise'],
    ['faq', 'FAQ'],
    ['rsvp', 'RSVP'],
  ];
  const go = (id) => { setOpen(false); onNav(id); };
  return (
    <nav className={`jl-nav ${open ? 'is-open' : ''}`}>
      <a className="jl-nav-mark" href="#hero" onClick={(e) => { e.preventDefault(); go('hero'); }}>
        <img src={(window.__resources && window.__resources.monogramSvg) || "assets/logo-monogram.svg"} alt="" height="36" />
      </a>
      <button
        type="button"
        className="jl-nav-toggle"
        aria-label="Menü"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span></span><span></span><span></span>
      </button>
      <ul className={`jl-nav-links ${open ? 'is-open' : ''}`}>
        {links.map(([id, label]) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={active === id ? 'is-active' : ''}
              onClick={(e) => { e.preventDefault(); go(id); }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
      <a href="#rsvp" className="jl-nav-cta" onClick={(e) => { e.preventDefault(); go('rsvp'); }}>
        Jetzt zusagen
      </a>
    </nav>
  );
};

window.Nav = Nav;
