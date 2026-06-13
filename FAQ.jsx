// FAQ.jsx — accordion of common questions
const FAQ_ITEMS = [
  {
    q: 'Sind Kinder willkommen?',
    a: 'Klaro! Bitte gebt uns im RSVP Bescheid, damit wir entsprechend planen können.',
  },
  {
    q: 'Gibt es ein Geschenketisch oder eine Wunschliste?',
    a: 'Ja! Eure Anwesenheit ist das schönste Geschenk. Falls Ihr trotzdem etwas beitragen möchtet: bedenkt bitte, dass wir nach Dubai zurück fliegen. Also keine großen Geschenke bitte.',
  },
  {
    q: 'Wie ist das Wetter Ende Juli am Gardasee?',
    a: 'Erwartbar warm — 28-32 °C tagsüber, abends mild um die 22 °C. Sonnenbrille und vielleicht ein leichter Schal für später am Abend und ihr seid top vorbereitet.',
  },
  {
    q: 'Wie sieht es aus mit der Hotelbuchung?',
    a: 'Schaut oben auf dieser Seite, da stehen vorschläge zur Unterkunft.',
  },
  {
    q: 'Wann müssen wir spätestens zusagen?',
    a: 'Bis Donnerstag, den 1. Oktober 2027. Danach geben wir die finale Gästeliste an das Catering und die Location weiter.',
  },
  {
    q: 'Gibt es Optionen beim Essen?',
    a: 'Ja, wir haben vegetarische Optionen. Solltet ihr diätetische Einschränkung haben, gebt das bitte im RSVP-Formular an.',
  },
];

const FAQ = () => {
  const [open, setOpen] = React.useState(0);
  return (
    <section id="faq" className="jl-section jl-section-paper" data-screen-label="FAQ">
      <div className="jl-section-head">
        <div className="jl-eyebrow">Häufige Fragen</div>
        <h2 className="jl-h2">Was Ihr noch wissen wollt</h2>
      </div>

      <ul className="jl-faq">
        {FAQ_ITEMS.map((item, i) => (
          <li key={i} className={`jl-faq-item ${open === i ? 'is-open' : ''}`}>
            <button
              className="jl-faq-q"
              onClick={() => setOpen(open === i ? -1 : i)}
              aria-expanded={open === i}
            >
              <span>{item.q}</span>
              <i data-lucide={open === i ? 'minus' : 'plus'} width="18" height="18"></i>
            </button>
            {open === i && <div className="jl-faq-a">{item.a}</div>}
          </li>
        ))}
      </ul>
    </section>
  );
};

window.FAQ = FAQ;
