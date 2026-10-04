// FAQ.jsx — accordion of common questions
const BRIDESMAIDS = [
  { name: 'Hanna Nyssen', display: '+971 55 147 6701', tel: '+971551476701' },
  { name: 'Kristina Nikolendzic', display: '+971 50 886 5709', tel: '+971508865709' },
  { name: 'Michelle Matuzzi', display: '+971 55 820 3129', tel: '+971558203129' },
];

const BridesmaidList = () => (
  <ul className="jl-faq-contacts">
    {BRIDESMAIDS.map((b) => (
      <li key={b.tel}>
        <strong>{b.name}</strong>
        <a href={`tel:${b.tel}`}>{b.display}</a>
        <a href={`https://wa.me/${b.tel.replace('+', '')}`} target="_blank" rel="noopener">WhatsApp</a>
      </li>
    ))}
  </ul>
);

const FAQ_ITEMS = [
  {
    q: 'Was sollen wir Euch schenken?',
    a: 'Das Wichtigste zuerst: nichts. Dass Ihr zu unserer Hochzeit an den Lago di Garda kommt — mit allen Kosten, der Anreise und der Organisation Eures Aufenthalts — ist für uns mehr als genug. Ihr müsst uns wirklich nichts mitbringen, fühlt Euch also bitte zu nichts verpflichtet außer dazu, selbst da zu sein. Vor allem bitte keine Sachgeschenke — wir müssen alles zurück nach Dubai transportieren. Falls Ihr uns trotzdem unbedingt etwas schenken möchtet, freuen wir uns über einen kleinen Beitrag zu unseren Flitterwochen. Dafür richten wir eine einfache Möglichkeit ein — ganz freiwillig. Aber ehrlich: Ihr, Eure Zeit und dass Ihr mit uns feiert, ist mehr als genug.',
  },
  {
    q: 'Sind Kinder willkommen?',
    a: 'Klaro! Bitte gebt uns im RSVP Bescheid, damit wir entsprechend planen können.',
  },
  {
    q: 'Möchtest Du etwas zum Programm beitragen — z. B. eine Rede halten?',
    a: (
      <>
        Wie schön! Bitte meldet Euch <strong>vorab</strong> bei unseren Brautjungfern —
        sie koordinieren das Programm und geben Euch einen Zeitslot (für alles, was
        nicht peinlich ist 😉). Alle drei sprechen Deutsch und Englisch:
        <BridesmaidList />
      </>
    ),
  },
  {
    q: 'Wo können wir übernachten?',
    a: 'Direkt an unserer Location haben wir Zimmer für Euch reserviert — die ganze Anlage ist für unsere Gäste gebucht (Preise und Optionen findet Ihr oben im Bereich „am Lago di Garda“). Ihr müsst aber nicht bei uns übernachten: Wer lieber woanders in der Nähe schläft, ist dazu völlig frei — ein paar schöne Alternativen haben wir Euch ebenfalls oben verlinkt.',
  },
  {
    q: 'Wie ist das Wetter Ende Juli am Gardasee?',
    a: 'Erwartbar warm — 28-32 °C tagsüber, abends mild um die 22 °C. Sonnenbrille und vielleicht ein leichter Schal für später am Abend und ihr seid top vorbereitet.',
  },
  {
    q: 'Wann müssen wir spätestens zusagen?',
    a: 'Bis zum 1. Februar 2027. Danach geben wir die finale Gästeliste an das Catering und die Location weiter.',
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
