// Rooms.jsx — room overview pop-up (German). Shared by the Venue card and the
// RSVP "room at the Forte" tick. Opened via window.jlOpenRooms() (see App.jsx).

const ROOM_BASE = 'assets/Rooms/';
const AMENITIES = [
  'Zimmerservice',
  'Satellitenfernsehen & professionelles Telefon',
  'Safe & Minibar',
  'Holzboden',
  'Zugang zum K Club',
  'Privates türkisches Bad',
];
const ROOM_DESC =
  'King-Size-Bett mit Schwebe-Effekt und gemütliches Badezimmer mit extragroßer Dusche, ' +
  'Regen-Duschkopf und emotionalem Wasserfall. Ausgestattet mit luxuriösen Stoffen und ' +
  'natürlichen Eichen- und Steinböden. Für die Gäste: Wasserkocher mit Kräutertee-Ecke, ' +
  'Klimaanlage, Flachbildschirm-TV und WLAN, Kleiderschrank mit Minibar und Safe, weiche ' +
  'Bademäntel, Hausschuhe und eine Pflegelinie von John Richmond.';

const JL_ROOMS = [
  {
    id: 'zimmer-1',
    name: 'Zimmer 1',
    title: 'King Superior Spa mit Garten oder Balkon',
    price: '1.000 € · 2 Nächte · inkl. Frühstück',
    intro: 'Design-Zimmer mit privatem Garten oder Balkon.',
    desc: ROOM_DESC,
    details: AMENITIES,
    images: [ROOM_BASE + 'r1-1.jpg', ROOM_BASE + 'r1-2.jpg', ROOM_BASE + 'r1-3.jpg', ROOM_BASE + 'r1-4.jpg'],
    layout: ROOM_BASE + 'r1-layout.jpg',
  },
  {
    id: 'zimmer-2',
    name: 'Zimmer 2',
    title: 'Junior Suite Spa mit großem Fenster',
    price: '5.000 € · 2 Nächte · inkl. Frühstück',
    intro: 'Design-Zimmer mit einem großen Fenster.',
    desc: ROOM_DESC,
    details: AMENITIES,
    images: [ROOM_BASE + 'r2-1.jpg', ROOM_BASE + 'r2-2.jpg', ROOM_BASE + 'r2-3.jpg', ROOM_BASE + 'r2-4.jpg', ROOM_BASE + 'r2-5.jpg'],
    layout: ROOM_BASE + 'r2-layout.jpg',
  },
  {
    id: 'zimmer-3',
    name: 'Zimmer 3',
    title: 'Junior Suite Spa mit Garten oder Balkon',
    price: '10.000 € · 2 Nächte · inkl. Frühstück',
    intro: 'Design-Zimmer mit privatem Garten oder Balkon.',
    desc: ROOM_DESC,
    details: AMENITIES,
    images: [ROOM_BASE + 'r3-1.jpg', ROOM_BASE + 'r3-2.jpg', ROOM_BASE + 'r3-3.jpg', ROOM_BASE + 'r3-4.jpg'],
    layout: ROOM_BASE + 'r3-layout.jpg',
  },
  {
    id: 'zimmer-4',
    name: 'Zimmer 4',
    title: 'Junior Suite Spa mit privatem Jacuzzi',
    price: '50.000 € · 2 Nächte · inkl. Frühstück',
    intro: 'Design-Zimmer mit privatem Garten oder Balkon. Im Zimmer befinden sich Kunstwerke des Veroneser Malers Antonio Amodio.',
    desc: ROOM_DESC,
    details: AMENITIES.concat(['Privater Jacuzzi']),
    images: [ROOM_BASE + 'r4-1.jpg', ROOM_BASE + 'r4-2.jpg', ROOM_BASE + 'r4-3.jpg', ROOM_BASE + 'r4-4.jpg', ROOM_BASE + 'r4-5.jpg'],
    layout: ROOM_BASE + 'r4-layout.jpg',
  },
];

const roomMailto = (room) =>
  'mailto:hallo@lisa-und-julian.de?subject=' +
  encodeURIComponent('Zimmeranfrage: ' + room.name + ' (' + room.title + ')') +
  '&body=' +
  encodeURIComponent(
    'Hallo Lisa & Julian,\n\nwir würden gern ' + room.name + ' — ' + room.title +
    ' — am Forte Benedek anfragen.\n\nName:\nAnreise:\nAbreise:\n\nLiebe Grüße'
  );

const RoomCard = ({ room }) => {
  const [idx, setIdx] = React.useState(0);
  const count = room.images.length;
  const onScroll = (e) => {
    const el = e.currentTarget;
    const stride = el.scrollWidth / count;
    const i = stride ? Math.min(count - 1, Math.round(el.scrollLeft / stride)) : 0;
    setIdx((p) => (p === i ? p : i));
  };
  return (
  <div className="jl-room-card">
    <div className="jl-room-gallery-wrap">
      <div className="jl-room-gallery" onScroll={onScroll}>
        {room.images.map((src, i) => (
          <img key={i} src={src} alt={room.title + ' (' + (i + 1) + ')'} loading="lazy" />
        ))}
      </div>
      {count > 1 && (
        <span className="jl-room-count" aria-hidden="true">{idx + 1} / {count}</span>
      )}
      {count > 1 && (
        <div className="jl-room-dots" aria-hidden="true">
          {room.images.map((_, i) => (
            <span key={i} className={'jl-room-dot' + (i === idx ? ' is-active' : '')} />
          ))}
        </div>
      )}
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
          <img src={room.layout} alt={'Grundriss ' + room.title} loading="lazy" />
          <figcaption>Grundriss</figcaption>
        </figure>
      )}
      <div className="jl-room-foot">
        <span className="jl-room-price">{room.price}</span>
        <a className="jl-btn jl-btn-primary jl-btn-sm" href={roomMailto(room)}>
          Dieses Zimmer anfragen
        </a>
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
        <button type="button" className="jl-modal-close" aria-label="Schließen" onClick={onClose}>×</button>

        <div className="jl-modal-head">
          <div className="jl-eyebrow">Übernachten vor Ort</div>
          <h3 id="jl-rooms-title" className="jl-h3">Zimmer am Forte Benedek</h3>
          <p className="jl-modal-intro">
            Wir haben die ganze Anlage gebucht — es sind noch <strong>etwa 10 Zimmer</strong> direkt
            am Veranstaltungsort frei. First come, first serve.
          </p>
        </div>

        <div className="jl-room-list">
          {JL_ROOMS.map((r) => <RoomCard key={r.id} room={r} />)}
        </div>

        <p className="jl-modal-note">
          Für alle Zimmer: eine finnische Sauna und ein Whirlpool stehen allen Gästen im
          Gemeinschaftsbereich zur Verfügung. Massagen und Behandlungen können gebucht werden.
        </p>
      </div>
    </div>
  );
};

window.JL_ROOMS = JL_ROOMS;
window.RoomsModal = RoomsModal;
