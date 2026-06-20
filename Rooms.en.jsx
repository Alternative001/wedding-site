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

const JL_ROOMS = [
  {
    id: 'room-1',
    name: 'Room 1',
    title: 'King Superior Spa with Garden or Balcony',
    price: '€1,000 · 2 nights · breakfast included',
    intro: 'Design room with a private garden or balcony.',
    desc: ROOM_DESC,
    details: AMENITIES,
    images: [ROOM_BASE + 'r1-1.jpg', ROOM_BASE + 'r1-2.jpg', ROOM_BASE + 'r1-3.jpg', ROOM_BASE + 'r1-4.jpg'],
    layout: ROOM_BASE + 'r1-layout.jpg',
  },
  {
    id: 'room-2',
    name: 'Room 2',
    title: 'Junior Suite Spa with a Large Window',
    price: '€5,000 · 2 nights · breakfast included',
    intro: 'Design room with a large window.',
    desc: ROOM_DESC,
    details: AMENITIES,
    images: [ROOM_BASE + 'r2-1.jpg', ROOM_BASE + 'r2-2.jpg', ROOM_BASE + 'r2-3.jpg', ROOM_BASE + 'r2-4.jpg', ROOM_BASE + 'r2-5.jpg'],
    layout: ROOM_BASE + 'r2-layout.jpg',
  },
  {
    id: 'room-3',
    name: 'Room 3',
    title: 'Junior Suite Spa with Garden or Balcony',
    price: '€10,000 · 2 nights · breakfast included',
    intro: 'Design room with a private garden or balcony.',
    desc: ROOM_DESC,
    details: AMENITIES,
    images: [ROOM_BASE + 'r3-1.jpg', ROOM_BASE + 'r3-2.jpg', ROOM_BASE + 'r3-3.jpg', ROOM_BASE + 'r3-4.jpg'],
    layout: ROOM_BASE + 'r3-layout.jpg',
  },
  {
    id: 'room-4',
    name: 'Room 4',
    title: 'Junior Suite Spa with Private Jacuzzi',
    price: '€50,000 · 2 nights · breakfast included',
    intro: 'Design room with a private garden or balcony. The room features artworks by the Veronese painter Antonio Amodio.',
    desc: ROOM_DESC,
    details: AMENITIES.concat(['Private jacuzzi']),
    images: [ROOM_BASE + 'r4-1.jpg', ROOM_BASE + 'r4-2.jpg', ROOM_BASE + 'r4-3.jpg', ROOM_BASE + 'r4-4.jpg', ROOM_BASE + 'r4-5.jpg'],
    layout: ROOM_BASE + 'r4-layout.jpg',
  },
];

const roomMailto = (room) =>
  'mailto:hallo@lisa-und-julian.de?subject=' +
  encodeURIComponent('Room request: ' + room.name + ' (' + room.title + ')') +
  '&body=' +
  encodeURIComponent(
    'Hi Lisa & Julian,\n\nwe’d love to request ' + room.name + ' — ' + room.title +
    ' — at Forte Benedek.\n\nName:\nArrival:\nDeparture:\n\nThank you!'
  );

const RoomCard = ({ room }) => (
  <div className="jl-room-card">
    <div className="jl-room-gallery">
      {room.images.map((src, i) => (
        <img key={i} src={src} alt={room.title + ' (' + (i + 1) + ')'} loading="lazy" />
      ))}
    </div>
    <div className="jl-room-body">
      <div className="jl-room-kicker">{room.name}</div>
      <h4 className="jl-room-name">{room.title}</h4>
      <p className="jl-room-desc">{room.intro} {room.desc}</p>
      <ul className="jl-room-details">
        {room.details.map((d, i) => <li key={i}>{d}</li>)}
      </ul>
      {room.layout && (
        <figure className="jl-room-layout">
          <img src={room.layout} alt={'Floor plan ' + room.title} loading="lazy" />
          <figcaption>Floor plan</figcaption>
        </figure>
      )}
      <div className="jl-room-foot">
        <span className="jl-room-price">{room.price}</span>
        <a className="jl-btn jl-btn-primary jl-btn-sm" href={roomMailto(room)}>
          Request this room
        </a>
      </div>
    </div>
  </div>
);

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
            at the venue. First come, first served.
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
