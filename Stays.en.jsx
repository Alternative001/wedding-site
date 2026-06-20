// Stays.en.jsx — "sleep nearby" pop-up (English). Three alternatives to the
// Forte, each with distance + info. Opened via window.jlOpenStays() (see App.jsx).
const JL_STAYS = [
  {
    id: 'sambuco',
    name: 'Agriturismo Sambuco',
    type: 'Farmhouse · rooms with breakfast',
    distance: '≈ 7 min on foot',
    distanceNote: 'from Forte Benedek',
    desc: '19th-century farmhouse with a pool, vineyards and olive groves. Homemade breakfast, plus wine and oil tastings.',
    details: ['Pool', 'Vineyard & olive grove', 'Breakfast included', 'Book direct'],
    cta: 'Website',
    href: 'https://www.agriturismosambuco.it/',
    map: 'https://www.google.com/maps/dir/?api=1&origin=Relais+Forte+Benedek,+Via+Morsella+12,+Pastrengo&destination=Agriturismo+Sambuco,+Via+Sambuco+1,+Pastrengo&travelmode=walking',
  },
  {
    id: 'miralago',
    name: 'Appartamenti Miralago',
    type: 'Self-catering apartments',
    distance: '≈ 3 min on foot',
    distanceNote: 'same street (Via Morsella)',
    desc: 'Apartments with their own kitchen, living area and bathroom. Free Wi-Fi, parking, garden and terrace. Guest rating 8.4/10.',
    details: ['Own kitchen', 'Wi-Fi & parking', 'Garden & terrace', 'Book via Booking.com'],
    cta: 'View',
    href: 'https://guias-viajes.com/italy/pastrengo/appartamenti-miralago/',
    map: 'https://www.google.com/maps/dir/?api=1&origin=Relais+Forte+Benedek,+Via+Morsella+12,+Pastrengo&destination=Appartamenti+Miralago,+Via+Morsella+24,+Pastrengo&travelmode=walking',
  },
  {
    id: 'serena',
    name: 'Agriturismo Serena',
    type: 'Farmhouse · rooms',
    distance: '≈ 5 min by car',
    distanceNote: 'Località Carlotte, Pastrengo',
    desc: 'Freshly renovated farm stay with an infinity pool, large garden and bar — quiet, in nature, about 2 km from the Forte.',
    details: ['Infinity pool', 'Garden & bar', 'Wi-Fi & parking', 'Book via Booking.com'],
    cta: 'View',
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
        <a className="jl-link" href={stay.map} target="_blank" rel="noopener">See the route →</a>
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
        <button type="button" className="jl-modal-close" aria-label="Close" onClick={onClose}>×</button>

        <div className="jl-modal-head">
          <div className="jl-eyebrow">Other places to stay</div>
          <h3 id="jl-stays-title" className="jl-h3">Places to stay nearby</h3>
          <p className="jl-modal-intro">
            Didn’t grab a room at the Forte? These three places in Pastrengo are just a few minutes away.
          </p>
        </div>

        <div className="jl-room-list">
          {JL_STAYS.map((s) => <StayCard key={s.id} stay={s} />)}
        </div>

        <p className="jl-modal-note">
          Distances are approximate — tap “See the route” for the exact way. More options:{' '}
          <a href="https://www.booking.com/bed-and-breakfast/city/it/pastrengo.html" target="_blank" rel="noopener">
            all stays in Pastrengo
          </a>.
        </p>
      </div>
    </div>
  );
};

window.JL_STAYS = JL_STAYS;
window.StaysModal = StaysModal;
