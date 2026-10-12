// Rooms.en.jsx — room overview pop-up (English). Shared by the Venue card and
// the RSVP "room at the Forte" tick. Opened via window.jlOpenRooms() (see App.jsx).

const ROOM_BASE = 'assets/Rooms/';
const AMENITIES = [
  'Room service',
  'Satellite TV & professional phone',
  'Safe & minibar',
  'Wooden floor',
  'Access to the K Club',
  'Private Turkish bath',
];
const ROOM_DESC =
  'King-size bed with a floating effect and a cosy bathroom with an extra-large shower, rain ' +
  'showerhead and waterfall feature. Finished with luxurious fabrics and natural oak and stone ' +
  'floors. Guests enjoy a kettle with a herbal-tea corner, air conditioning, flat-screen TV and ' +
  'Wi-Fi, a wardrobe with minibar and safe, soft bathrobes, slippers and a John Richmond toiletry line.';

// Ordered by price. `name` is the short label shown in the RSVP room picker;
// `guests` drives the capacity badge (every room sleeps 2, the Deluxe Suite 4).
const JL_ROOMS = [
  {
    id: 'junior-window',
    name: 'Junior Suite · Window',
    title: 'Junior Suite Spa with a Large Window',
    price: '€500 · 2 nights · breakfast included',
    guests: 2,
    intro: 'Design room with a large window.',
    desc: ROOM_DESC,
    details: AMENITIES,
    images: [ROOM_BASE + 'r2-1.jpg', ROOM_BASE + 'r2-2.jpg', ROOM_BASE + 'r2-3.jpg', ROOM_BASE + 'r2-4.jpg', ROOM_BASE + 'r2-5.jpg'],
    layouts: [{ src: ROOM_BASE + 'r2-layout.jpg', caption: 'Floor plan' }],
  },
  {
    id: 'king-superior',
    name: 'King Superior',
    title: 'King Superior Spa with Garden or Balcony',
    price: '€530 · 2 nights · breakfast included',
    guests: 2,
    intro: 'Design room with a private garden or balcony.',
    desc: ROOM_DESC,
    details: AMENITIES,
    images: [ROOM_BASE + 'r1-1.jpg', ROOM_BASE + 'r1-2.jpg', ROOM_BASE + 'r1-3.jpg', ROOM_BASE + 'r1-4.jpg'],
    layouts: [{ src: ROOM_BASE + 'r1-layout.jpg', caption: 'Floor plan' }],
  },
  {
    id: 'junior-jacuzzi',
    name: 'Junior Suite · Jacuzzi',
    title: 'Junior Suite Spa with Private Jacuzzi',
    price: '€585 · 2 nights · breakfast included',
    guests: 2,
    intro: 'Design room with a private garden or balcony. The room features artworks by the Veronese painter Antonio Amodio.',
    desc: ROOM_DESC,
    details: AMENITIES.concat(['Private jacuzzi']),
    images: [ROOM_BASE + 'r4-1.jpg', ROOM_BASE + 'r4-2.jpg', ROOM_BASE + 'r4-3.jpg', ROOM_BASE + 'r4-4.jpg', ROOM_BASE + 'r4-5.jpg'],
    layouts: [{ src: ROOM_BASE + 'r4-layout.jpg', caption: 'Floor plan' }],
  },
  {
    id: 'deluxe-suite',
    name: 'Deluxe Suite',
    title: 'Deluxe Spa Suite',
    price: '€600 · 2 nights · breakfast included',
    guests: 4,
    intro: '',
    desc:
      'A two-level designer room: a loft with a king-size bed and a living room with a sleeper ' +
      'sofa. Cosy bathroom with an extra-large shower, rain showerhead and a soothing waterfall ' +
      'feature. Furnished with luxurious fabrics and natural oak and stone floors. Equipped with a ' +
      'kettle and herbal-tea corner, air conditioning, flat-screen TV and Wi-Fi; a wardrobe with ' +
      'minibar and safe. This suite hosts up to 4 people!',
    details: ['Two levels (loft)', 'Sleeper sofa in the living room', 'Air conditioning & Wi-Fi', 'Minibar & safe'],
    images: [ROOM_BASE + 'r5-1.jpg', ROOM_BASE + 'r5-2.jpg', ROOM_BASE + 'r5-3.jpg', ROOM_BASE + 'r5-4.jpg'],
    layouts: [
      { src: ROOM_BASE + 'r5-layout-1.jpg', caption: 'Floor plan · living room (downstairs)' },
      { src: ROOM_BASE + 'r5-layout-2.jpg', caption: 'Floor plan · loft bedroom (upstairs)' },
    ],
  },
];

const RoomCard = ({ room }) => {
  const [idx, setIdx] = React.useState(0);
  const galleryRef = React.useRef(null);
  const count = room.images.length;
  const onScroll = (e) => {
    const el = e.currentTarget;
    const stride = el.scrollWidth / count;
    const i = stride ? Math.min(count - 1, Math.round(el.scrollLeft / stride)) : 0;
    setIdx((p) => (p === i ? p : i));
  };
  // Arrow buttons: snap to the previous / next photo.
  const go = (dir) => {
    const el = galleryRef.current;
    if (!el) return;
    const next = Math.max(0, Math.min(count - 1, idx + dir));
    el.scrollTo({ left: (el.scrollWidth / count) * next, behavior: 'smooth' });
  };
  return (
  <div className="jl-room-card">
    <div className="jl-room-gallery-wrap">
      <div className="jl-room-gallery" ref={galleryRef} onScroll={onScroll}>
        {room.images.map((src, i) => (
          <img key={i} src={src} alt={room.title + ' (' + (i + 1) + ')'} loading="lazy" />
        ))}
      </div>
      {count > 1 && (
        <>
          <button type="button" className="jl-room-arrow is-prev" aria-label="Previous photo"
            onClick={() => go(-1)} disabled={idx === 0}>‹</button>
          <button type="button" className="jl-room-arrow is-next" aria-label="Next photo"
            onClick={() => go(1)} disabled={idx === count - 1}>›</button>
          <span className="jl-room-count" aria-hidden="true">{idx + 1} / {count}</span>
          <div className="jl-room-dots" aria-hidden="true">
            {room.images.map((_, i) => (
              <span key={i} className={'jl-room-dot' + (i === idx ? ' is-active' : '')} />
            ))}
          </div>
        </>
      )}
    </div>
    <div className="jl-room-body">
      <div className="jl-room-kicker-row">
        <div className="jl-room-kicker">{room.name}</div>
        <span className={'jl-room-guests' + (room.guests > 2 ? ' is-more' : '')}>
          👥 {room.guests > 2 ? `up to ${room.guests} people` : `${room.guests} people`}
        </span>
      </div>
      <h4 className="jl-room-name">{room.title}</h4>
      <p className="jl-room-desc">{room.intro ? room.intro + ' ' : ''}{room.desc}</p>
      <ul className="jl-room-details">
        {room.details.map((d, i) => <li key={i}>{d}</li>)}
      </ul>
      {room.layouts && room.layouts.length > 0 && (
        <div className={'jl-room-layouts' + (room.layouts.length > 1 ? ' is-multi' : '')}>
          {room.layouts.map((l, i) => (
            <figure className="jl-room-layout" key={i}>
              <img src={l.src} alt={l.caption + ' – ' + room.title} loading="lazy" />
              <figcaption>{l.caption}</figcaption>
            </figure>
          ))}
        </div>
      )}
      <div className="jl-room-foot">
        <span className="jl-room-price">{room.price}</span>
        <span className="jl-room-pick-hint">Request your room in the RSVP ✨</span>
      </div>
    </div>
  </div>
  );
};

const RoomsModal = ({ open, onClose }) => {
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
        aria-labelledby="jl-rooms-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="jl-modal-close" aria-label="Close" onClick={onClose}>×</button>

        <div className="jl-modal-head">
          <div className="jl-eyebrow">Stay on-site</div>
          <h3 id="jl-rooms-title" className="jl-h3">Rooms at Forte Benedek</h3>
          <p className="jl-modal-intro">
            We’ve booked the entire estate — there are still <strong>around 10 rooms</strong> right
            at the venue. First come, first served. All prices cover
            <strong> both nights (Fri–Sun), breakfast included</strong>.
          </p>
          <p className="jl-modal-capacity">
            👥 Every room sleeps <strong>2 people</strong> — except the <strong>Deluxe Spa Suite</strong>,
            which sleeps <strong>up to 4</strong>.
          </p>
        </div>

        <div className="jl-room-list">
          {JL_ROOMS.map((r) => <RoomCard key={r.id} room={r} />)}
        </div>

        <p className="jl-modal-note">
          For all rooms: a Finnish sauna and a whirlpool are available to every guest in the shared
          area. Massages and treatments can be booked.
        </p>
      </div>
    </div>
  );
};

window.JL_ROOMS = JL_ROOMS;
window.RoomsModal = RoomsModal;
