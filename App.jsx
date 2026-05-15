// App.jsx — top-level shell wiring components
const { Nav, Hero, Story, Schedule, Venue, FAQ, RSVP, Footer } = window;

const App = () => {
  const [active, setActive] = React.useState('hero');

  const goTo = (id) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Track which section is in view (rough — uses intersection observer)
  React.useEffect(() => {
    const ids = ['hero', 'story', 'program', 'venue', 'faq', 'rsvp'];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.1, 0.5] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Re-render lucide icons after each commit
  React.useEffect(() => {
    if (window.lucide && window.lucide.createIcons) window.lucide.createIcons();
  });

  return (
    <div className="jl-app">
      <Nav active={active} onNav={goTo} />
      <Hero />
      <Story />
      <Schedule />
      <Venue />
      <FAQ />
      <RSVP />
      <Footer />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
