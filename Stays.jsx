// Stays.jsx — "sleep nearby" pop-up (German). Three alternatives to the Forte,
// each with distance + info. Opened via window.jlOpenStays() (see App.jsx).
const JL_STAYS = [
  {
    id: 'sambuco',
    name: 'Agriturismo Sambuco',
    type: 'Bauernhof · Zimmer mit Frühstück',
    distance: '≈ 7 Min zu Fuß',
    distanceNote: 'vom Forte Benedek',
    desc: 'Historischer Bauernhof aus dem 19. Jahrhundert mit Pool, Weinbergen und Olivenhainen. Hausgemachtes Frühstück, Wein- und Ölverkostungen.',
    details: ['Pool', 'Weinberg & Olivenhain', 'Frühstück inklusive', 'Direkt buchen'],
    cta: 'Website',
    href: 'https://www.agriturismosambuco.it/',
    map: 'https://www.google.com/maps/dir/?api=1&origin=Relais+Forte+Benedek,+Via+Morsella+12,+Pastrengo&destination=Agriturismo+Sambuco,+Via+Sambuco+1,+Pastrengo&travelmode=walking',
  },
  {
    id: 'miralago',
    name: 'Appartamenti Miralago',
    type: 'Ferienwohnungen',
    distance: '≈ 3 Min zu Fuß',
    distanceNote: 'gleiche Straße (Via Morsella)',
    desc: 'Ferienwohnungen mit eigener Küche, Wohnbereich und Bad. Kostenloses WLAN, Parkplatz, Garten und Terrasse. Gästebewertung 8,4/10.',
    details: ['Eigene Küche', 'WLAN & Parkplatz', 'Garten & Terrasse', 'Buchung via Booking.com'],
    cta: 'Ansehen',
    href: 'https://guias-viajes.com/italy/pastrengo/appartamenti-miralago/',
    map: 'https://www.google.com/maps/dir/?api=1&origin=Relais+Forte+Benedek,+Via+Morsella+12,+Pastrengo&destination=Appartamenti+Miralago,+Via+Morsella+24,+Pastrengo&travelmode=walking',
  },
  {
    id: 'serena',
    name: 'Agriturismo Serena',
    type: 'Bauernhof · Zimmer',
    distance: '≈ 5 Min mit dem Auto',
    distanceNote: 'Località Carlotte, Pastrengo',
    desc: 'Frisch renovierter Bauernhof mit Infinity-Pool, großem Garten und Bar — ruhig in der Natur, rund 2 km vom Forte.',
    details: ['Infinity-Pool', 'Garten & Bar', 'WLAN & Parkplatz', 'Buchung via Booking.com'],
    cta: 'Ansehen',
    href: 'https://www.booking.com/hotel/it/agriturismo-serena-pastrengo.html',
    map: 'https://www.google.com/maps/dir/?api=1&origin=Relais+Forte+Benedek,+Via+Morsella+12,+Pastrengo&destination=Agriturismo+Serena,+Localit%C3%A0+Carlotte+1,+Pastrengo&travelmode=driving',
  },
];

const StayCard = ({ stay }) => (
  <div className="jl-room-card">
    <div className="jl-room-body">
      <span className="jl-stay-distance">📍 {stay.distance}</span>
      <h4 className="jl-room-name">{stay.name}</h4>
      <div className="jl-room-sub">{stay.type} · {stay.distanceNote}</div>
      <p className="jl-room-desc">{stay.desc}</p>
      <ul className="jl-room-details">
        {stay.details.map((d, i) => <li key={i}>{d}</li>)}
      </ul>
      <div className="jl-room-foot">
        <a className="jl-link" href={stay.map} target="_blank" rel="noopener">Route ansehen →</a>
        <a className="jl-btn jl-btn-primary jl-btn-sm" href={stay.href} target="_blank" rel="noopener">{stay.cta} →</a>
      </div>
    </div>
  </div>
);

const StaysModal = ({ open, onClose }) => {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="jl-modal-overlay" onClick={onClose} role="presentation">
      <div
        className="jl-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="jl-stays-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="jl-modal-close" aria-label="Schließen" onClick={onClose}>×</button>

        <div className="jl-modal-head">
          <div className="jl-eyebrow">Woanders übernachten</div>
          <h3 id="jl-stays-title" className="jl-h3">Unterkünfte in der Nähe</h3>
          <p className="jl-modal-intro">
            Kein Zimmer am Forte ergattert? Diese drei Häuser in Pastrengo sind nur wenige Minuten entfernt.
          </p>
        </div>

        <div className="jl-room-list">
          {JL_STAYS.map((s) => <StayCard key={s.id} stay={s} />)}
        </div>

        <p className="jl-modal-note">
          Entfernungen sind ungefähre Angaben — tippt auf „Route ansehen“ für die genaue Strecke.
          Weitere Häuser:{' '}
          <a href="https://www.booking.com/bed-and-breakfast/city/it/pastrengo.html" target="_blank" rel="noopener">
            alle Unterkünfte in Pastrengo
          </a>.
        </p>
      </div>
    </div>
  );
};

window.JL_STAYS = JL_STAYS;
window.StaysModal = StaysModal;
