// FAQ.jsx — accordion of common questions
const FAQ_ITEMS = [
  {
    q: 'Sind Kinder willkommen?',
    a: 'Sehr gerne! Es gibt einen kleinen Spielbereich im Garten und eine Babysitterin vor Ort. Bitte gebt uns im RSVP Bescheid, damit wir entsprechend planen können.',
  },
  {
    q: 'Gibt es ein Geschenketisch oder eine Wunschliste?',
    a: 'Eure Anwesenheit ist das schönste Geschenk. Falls Ihr trotzdem etwas beitragen möchtet: Wir sammeln für unsere Flitterwochen in Apulien — den Link findet Ihr unten im Footer.',
  },
  {
    q: 'Wie ist das Wetter Ende Juli am Gardasee?',
    a: 'Erwartbar warm — 28-32 °C tagsüber, abends mild um die 22 °C. Sonnenbrille und ein leichter Schal für später am Abend schaden nicht.',
  },
  {
    q: 'Bekomme ich Hilfe bei der Hotelbuchung?',
    a: 'Klar — schreibt einfach eine kurze Mail an hallo@lisa-und-julian.de und Lisas Mama Christina kümmert sich (sie ist Reise­agentin).',
  },
  {
    q: 'Wann müssen wir spätestens zusagen?',
    a: 'Bis Sonntag, den 1. Mai 2027. Danach geben wir die finale Gästeliste an das Catering und an Villa Limone weiter.',
  },
  {
    q: 'Gibt es Allergien-Optionen beim Essen?',
    a: 'Ja, vegan/vegetarisch/glutenfrei alles möglich. Im RSVP-Formular gibt es ein Feld dafür — wir leiten alles an die Köchin weiter.',
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
