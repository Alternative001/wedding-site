// Schedule.en.jsx — English three-day programme
const SCHEDULE = [
  {
    day: 'Friday',
    date: '23 July',
    label: 'Arrive',
    items: [
      { time: 'from noon', title: 'Pool day', note: 'Come by whenever suits you — sun loungers, Spritz, bring your swimsuit' },
      { time: '19:30', title: 'Pizza night', note: 'for everyone already there — tables under the olive trees' },
    ],
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
  const [activeDay, setActiveDay] = React.useState(1);
  const day = SCHEDULE[activeDay];

  return (
    <section id="program" className="jl-section jl-section-paper" data-screen-label="Program">
      <div className="jl-section-head">
        <div className="jl-eyebrow">What's happening when</div>
        <h2 className="jl-h2">The <em>Programme</em></h2>
      </div>

      <div className="jl-day-tabs">
        {SCHEDULE.map((d, i) => (
          <button
            key={d.day}
            className={`jl-day-tab ${i === activeDay ? 'is-active' : ''} ${d.featured ? 'is-featured' : ''}`}
            onClick={() => setActiveDay(i)}
          >
            <span className="jl-day-tab-day">{d.day}</span>
            <span className="jl-day-tab-date">{d.date}</span>
            <span className="jl-day-tab-label">{d.label}</span>
          </button>
        ))}
      </div>

      <div className={`jl-schedule-card ${day.featured ? 'is-featured' : ''}`}>
        {day.featured && (
          <div className="jl-schedule-flag">
            <span className="jl-script-md">the big day</span>
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

      <div className="jl-dresscode">
        <div className="jl-eyebrow">Dress code</div>
        <div className="jl-dresscode-body">
          <strong>Smart summer.</strong> Light colours, light fabrics — think Italian Riviera,
          not office formal. Comfortable shoes are a good idea; we're celebrating on grass and stone.
        </div>
      </div>
    </section>
  );
};

window.Schedule = Schedule;
