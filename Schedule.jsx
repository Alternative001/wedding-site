// Schedule.jsx — three-day program with Friday pool+pizza, Saturday wedding, Sunday open
const SCHEDULE = [
  {
    day: 'Freitag',
    date: '23. Juli',
    label: 'Ankommen',
    items: [
      { time: 'ab Mittag', title: 'Pooltag', note: 'Kommt vorbei, wann es Euch passt — Liegestühle, Spritz, Badesachen einpacken' },
      { time: '19:30', title: 'Pizzanacht', note: 'für alle, die schon da sind — Tische unter den Olivenbäumen' },
    ],
  },
  {
    day: 'Samstag',
    date: '24. Juli',
    label: 'Der Tag',
    featured: true,
    items: [
      { time: '13:30', title: 'Eintreffen am Forte Benedek', note: 'Aperitif, Schatten, Musik' },
      { time: '14:00', title: 'Trauung', note: 'unter dem alten Olivenbaum' },
      { time: '15:30', title: 'Limoncello & Foto', note: 'Prendi un Limoncello 🍋' },
      { time: '18:00', title: 'Abendessen', note: '7-Gang-Menü, lange Tafel, blau-gelbe Streifen' },
      { time: '21:00', title: 'Eröffnungstanz · Party', note: 'bis die Sonne aufgeht' },
    ],
  },
  {
    day: 'Sonntag',
    date: '25. Juli',
    label: 'Open End',
    open: true,
    items: [],
  },
];

const Schedule = () => {
  const [activeDay, setActiveDay] = React.useState(1);
  const [switching, setSwitching] = React.useState(false);

  const switchDay = (i) => {
    if (i === activeDay || switching) return;
    setSwitching(true);
    setTimeout(() => {
      setActiveDay(i);
      setSwitching(false);
      // Re-register new timeline rows with reveal observer
      if (window.jlRefreshReveal) setTimeout(window.jlRefreshReveal, 50);
    }, 200);
  };

  const day = SCHEDULE[activeDay];

  return (
    <section id="program" className="jl-section jl-section-paper" data-screen-label="Program">
      <div className="jl-section-head">
        <div className="jl-eyebrow">Was passiert wann</div>
        <h2 className="jl-h2">Das <em>Programm</em></h2>
      </div>

      <div className="jl-day-tabs-hint">3 Tage · Fr. bis So. · tippt auf einen Tag ↓</div>

      <div className="jl-day-tabs">
        {SCHEDULE.map((d, i) => (
          <button
            key={d.day}
            className={`jl-day-tab ${i === activeDay ? 'is-active' : ''} ${d.featured ? 'is-featured' : ''}`}
            onClick={() => switchDay(i)}
            aria-pressed={i === activeDay}
          >
            <span className="jl-day-tab-day">{d.day}</span>
            <span className="jl-day-tab-date">{d.date}</span>
            <span className="jl-day-tab-label">{d.featured ? '★ ' : ''}{d.label}</span>
          </button>
        ))}
      </div>

      <div className={`jl-schedule-card ${day.featured ? 'is-featured' : ''} ${switching ? 'is-switching' : ''}`}>
        {day.featured && (
          <div className="jl-schedule-flag">
            <span className="jl-script-md">der grosse Tag</span>
          </div>
        )}

        {day.open ? (
          <div className="jl-schedule-open">
            <div className="jl-script-md" style={{ fontSize: 44, marginBottom: 8 }}>Open End</div>
            <p>
              Wir haben für Sonntag bewusst nichts geplant. Schlaft aus, springt nochmal
              in den See, oder fahrt entspannt nach Hause — ganz wie Ihr mögt.
            </p>
            <p className="jl-fine" style={{ marginTop: 12 }}>
              Falls sich spontan eine kleine Gruppe für Brunch oder einen Bootsausflug
              findet, sagen wir Samstagabend Bescheid.
            </p>
          </div>
        ) : (
          <ul className="jl-timeline">
            {day.items.map((item, i) => (
              <li key={i} className="jl-timeline-row">
                <div className="jl-timeline-time">{item.time}</div>
                <div className="jl-timeline-dot" aria-hidden="true"></div>
                <div className="jl-timeline-body">
                  <div className="jl-timeline-title">{item.title}</div>
                  <div className="jl-timeline-note">{item.note}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="jl-dresscode">
        <div className="jl-eyebrow">Dresscode</div>
        <div className="jl-dresscode-body">
          <strong>Sommerlich-fein.</strong> Helle Farben, leichte Stoffe — denkt Italian Riviera,
          nicht Münchner Standesamt. Bequeme Schuhe sind eine gute Idee, wir feiern auf Gras und Stein.
        </div>
      </div>
    </section>
  );
};

window.Schedule = Schedule;
