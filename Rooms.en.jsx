// Rooms.en.jsx — room overview pop-up (English). Shared by the Venue card and
// the RSVP "room at the Forte" tick. Opened via window.jlOpenRooms() (see App.jsx).

// Swap `img` for an asset path (e.g. "assets/rooms/room-1.jpg") to replace the
// placeholder tile. `name` is the short label (RSVP selector + card kicker),
// `title` the room type.
const JL_ROOMS = [
  {
    id: 'room-1',
    name: 'Room 1',
    title: 'King Superior Spa with Garden or Balcony',
    price: '€1,000 · 2 nights · breakfast included',
    img: null,
    desc:
      'Design room with a private garden or balcony. King-size bed with a floating effect and a ' +
      'cosy bathroom with an extra-large shower, rain showerhead and waterfall feature. Finished ' +
      'with luxurious fabrics and natural oak and stone floors. Guests enjoy a kettle with a ' +
      'herbal-tea corner, air conditioning, flat-screen TV and Wi-Fi, a wardrobe with minibar and ' +
      'safe, soft bathrobes, slippers and a John Richmond toiletry line.',
    details: [
      'Room service',
      'Satellite TV & professional phone',
      'Safe & minibar',
      'Wooden floor',
      'Access to the K Club',
      'Private Turkish bath',
    ],
  },
  {
    id: 'room-2',
    name: 'Room 2',
    title: 'Junior Suite Spa with Mirrors and a Large Window',
    price: 'Price on request',
    img: null,
    desc:
      'Design room with a large window. King-size bed with a floating effect and a cosy bathroom ' +
      'with an extra-large shower, rain showerhead and waterfall feature. Finished with luxurious ' +
      'fabrics and natural oak and stone floors. Guests enjoy a kettle with a herbal-tea corner, ' +
      'air conditioning, flat-screen TV and Wi-Fi, a wardrobe with minibar and safe, soft ' +
      'bathrobes, slippers and a John Richmond toiletry line.',
    details: [
      'Room service',
      'Satellite TV & professional phone',
      'Safe & minibar',
      'Wooden floor',
      'Access to the K Club',
      'Private Turkish bath',
    ],
  },
  {
    id: 'room-3',
    name: 'Room 3',
    title: 'Another room',
    price: 'Price on request',
    img: null,
    desc: 'Details coming soon.',
    details: [],
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
          {JL_ROOMS.map((r) => (
            <div key={r.id} className="jl-room-card">
              <div className="jl-room-photo">
                {r.img ? <img src={r.img} alt={r.title} /> : <span>Photo coming</span>}
              </div>
              <div className="jl-room-body">
                <div className="jl-room-kicker">{r.name}</div>
                <h4 className="jl-room-name">{r.title}</h4>
                <p className="jl-room-desc">{r.desc}</p>
                {r.details.length > 0 && (
                  <ul className="jl-room-details">
                    {r.details.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                )}
                <div className="jl-room-foot">
                  <span className="jl-room-price">{r.price}</span>
                  <a className="jl-btn jl-btn-primary jl-btn-sm" href={roomMailto(r)}>
                    Request this room
                  </a>
                </div>
              </div>
            </div>
          ))}
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
