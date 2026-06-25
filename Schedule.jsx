// Schedule.jsx — three-day program with Friday pool+pizza, Saturday wedding, Sunday open
const SCHEDULE = [
  {
    day: 'Freitag',
    date: '23. Juli',
    label: 'Ankommen',
    arrival: true,
    items: [
      { time: 'ab 12 Uhr', title: 'Ankommen', note: 'Tröpfelt über den Tag ein — ganz wie es Euch passt.' },
      { time: 'den ganzen Tag', title: 'Pooltag', note: 'Liegestühle, Spritz, Badesachen — der ganze Tag gehört dem Pool.' },
      { time: '18:00', title: 'Pizzanacht', note: 'Tische unter den Olivenbäumen. Pizza und zwei Stunden Wein gehen aufs Haus 🍕🍷' },
      { time: 'später', title: 'Bleibt, solange Ihr mögt', note: 'Aber seid morgen bereit für den großen Tag — schlaft rechtzeitig aus. 😴' },
    ],
    dress: {
      title: 'Ganz in Weiß',
      text: 'Für den Freitag bitten wir Euch in Weiß oder Beige — luftig, hell und leicht.',
      swatches: [
        { name: 'Weiß', hex: '#FFFFFF' },
        { name: 'Creme', hex: '#FBF6EC' },
        { name: 'Champagner', hex: '#F1E7CF' },
        { name: 'Beige', hex: '#E7D6BC' },
      ],
    },
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
    dress: {
      title: 'Blau · Grün · Gelb',
      text: 'Am großen Tag wird es farbig: wählt einen Ton in Blau, Grün oder Gelb. Ein paar Beispiele:',
      swatches: [
        { name: 'Kobalt', hex: '#1E47B5' },
        { name: 'Himmelblau', hex: '#87B0E0' },
        { name: 'Salbei', hex: '#88A176' },
        { name: 'Olive', hex: '#A7B98C' },
        { name: 'Zitrone', hex: '#F8D34A' },
        { name: 'Butter', hex: '#FCE789' },
      ],
    },
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
  const [activeDay, setActiveDay] = React.useState(0);
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

        {day.arrival && (
          <div className="jl-arrival">
            <svg className="jl-arrival-svg" viewBox="0 0 620 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path id="jlArrivalPath" className="jl-arrival-path" pathLength="1" d="M 12,44 C 130,44 150,18 260,24 S 440,52 600,20" stroke="#1E47B5" strokeWidth="2.5" strokeLinecap="round" />
              <circle className="jl-arrival-start" cx="12" cy="44" r="4" fill="#1E47B5" />
              <circle className="jl-arrival-sun" cx="600" cy="20" r="8" fill="#F8D34A" stroke="#1E47B5" strokeWidth="1.5" />
              {window.ArrivalFloaties && <window.ArrivalFloaties />}
            </svg>
            <div className="jl-arrival-label">
              <strong>Ankommen, wann Ihr möchtet</strong>
              <span>Kein fester Zeitpunkt — kommt über den Tag verteilt, ganz wie es passt.</span>
            </div>
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

      {day.dress && (
        <div className={`jl-dresscode ${switching ? 'is-switching' : ''}`}>
          <div className="jl-eyebrow">Dresscode · {day.day}</div>
          <div className="jl-dresscode-head">{day.dress.title}</div>
          <div className="jl-dresscode-body">{day.dress.text}</div>
          {day.dress.swatches && (
            <div className="jl-swatches">
              {day.dress.swatches.map((s) => (
                <div className="jl-swatch" key={s.name}>
                  <span className="jl-swatch-dot" style={{ background: s.hex }}></span>
                  <span className="jl-swatch-name">{s.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

window.Schedule = Schedule;
