// Schedule.en.jsx — English three-day programme
const SCHEDULE = [
  {
    day: 'Friday',
    date: '23 July',
    label: 'Arrive',
    arrival: true,
    items: [
      { time: 'from 12 noon', title: 'Arrival', note: 'Drift in across the day — whenever it suits you.' },
      { time: 'all day', title: 'Pool day', note: 'Sun loungers, Spritz, swimwear — the whole day belongs to the pool.' },
      { time: '18:00', title: 'Pizza night', note: 'Tables under the olive trees. Pizza and two hours of wine are on us 🍕🍷' },
      { time: 'later', title: 'Stay as long as you like', note: 'But make sure you’re ready for the big day tomorrow — get your rest in time. 😴' },
    ],
    dress: {
      title: 'All in White',
      text: 'For Friday we’re asking you in white or beige — airy, bright and light.',
      swatches: [
        { name: 'White', hex: '#FFFFFF' },
        { name: 'Cream', hex: '#FBF6EC' },
        { name: 'Champagne', hex: '#F1E7CF' },
        { name: 'Beige', hex: '#E7D6BC' },
      ],
    },
  },
  {
    day: 'Saturday',
    date: '24 July',
    label: 'The Day',
    featured: true,
    items: [
      { time: '13:30', title: 'Arrive at Forte Benedek', note: 'Aperitif, shade, music' },
      { time: '14:00', title: 'Ceremony', note: 'under the old olive tree' },
      { time: '15:30', title: 'Limoncello & Photos', note: 'Prendi un Limoncello 🍋' },
      { time: '18:00', title: 'Dinner', note: '7-course menu, long tables, blue-and-yellow stripes' },
      { time: '21:00', title: 'First dance · Party', note: 'until the sun comes up' },
    ],
    dress: {
      title: 'Blue · Green · Yellow',
      text: 'On the big day it gets colourful: pick a shade of blue, green or yellow. A few examples:',
      swatches: [
        { name: 'Cobalt', hex: '#1E47B5' },
        { name: 'Sky', hex: '#87B0E0' },
        { name: 'Sage', hex: '#88A176' },
        { name: 'Olive', hex: '#A7B98C' },
        { name: 'Lemon', hex: '#F8D34A' },
        { name: 'Butter', hex: '#FCE789' },
      ],
    },
  },
  {
    day: 'Sunday',
    date: '25 July',
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
      if (window.jlRefreshReveal) setTimeout(window.jlRefreshReveal, 50);
    }, 200);
  };

  const day = SCHEDULE[activeDay];

  return (
    <section id="program" className="jl-section jl-section-paper" data-screen-label="Program">
      <div className="jl-section-head">
        <div className="jl-eyebrow">What's happening when</div>
        <h2 className="jl-h2">The <em>Programme</em></h2>
      </div>

      <div className="jl-day-tabs-hint">3 days · Fri to Sun · tap a day to explore ↓</div>

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
            <span className="jl-script-md">the big day</span>
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
              <strong>Arrive whenever you like</strong>
              <span>No set time — drift in across the day, however it suits you.</span>
            </div>
          </div>
        )}

        {day.open ? (
          <div className="jl-schedule-open">
            <div className="jl-script-md" style={{ fontSize: 44, marginBottom: 8 }}>Open End</div>
            <p>
              We've deliberately left Sunday unplanned. Sleep in, jump in the lake
              one more time, or head home relaxed — whatever you feel like.
            </p>
            <p className="jl-fine" style={{ marginTop: 12 }}>
              If a small group spontaneously forms for brunch or a boat trip,
              we'll let you know on Saturday evening.
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
          <div className="jl-eyebrow">Dress code · {day.day}</div>
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
