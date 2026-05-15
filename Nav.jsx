// Nav.jsx — sticky top bar with anchor links
const Nav = ({ active, onNav }) => {
  const links = [
    ['hero', 'Start'],
    ['story', 'Wir'],
    ['program', 'Programm'],
    ['venue', 'Anreise'],
    ['faq', 'FAQ'],
    ['rsvp', 'RSVP'],
  ];
  return (
    <nav className="jl-nav">
      <a className="jl-nav-mark" href="#hero" onClick={(e) => { e.preventDefault(); onNav('hero'); }}>
        <img src={(window.__resources && window.__resources.monogramSvg) || "assets/logo-monogram.svg"} alt="" height="36" />
      </a>
      <ul className="jl-nav-links">
        {links.map(([id, label]) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={active === id ? 'is-active' : ''}
              onClick={(e) => { e.preventDefault(); onNav(id); }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
      <a href="#rsvp" className="jl-nav-cta" onClick={(e) => { e.preventDefault(); onNav('rsvp'); }}>
        Jetzt zusagen
      </a>
    </nav>
  );
};

window.Nav = Nav;
