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

// Nach Preis sortiert. `name` ist das kurze Label im RSVP-Zimmerwähler;
// `guests` steuert das Personen-Badge (alle Zimmer 2, die Deluxe Suite 4).
const JL_ROOMS = [
  {
    id: 'junior-window',
    name: 'Junior Suite · Fenster',
    title: 'Junior Suite Spa mit großem Fenster',
    price: '570 € · 2 Nächte · inkl. Frühstück',
    guests: 2,
    intro: 'Design-Zimmer mit einem großen Fenster.',
    desc: ROOM_DESC,
    details: AMENITIES,
    images: [ROOM_BASE + 'r2-1.jpg', ROOM_BASE + 'r2-2.jpg', ROOM_BASE + 'r2-3.jpg', ROOM_BASE + 'r2-4.jpg', ROOM_BASE + 'r2-5.jpg'],
    layouts: [{ src: ROOM_BASE + 'r2-layout.jpg', caption: 'Grundriss' }],
  },
  {
    id: 'king-superior',
    name: 'King Superior',
    title: 'King Superior Spa mit Garten oder Balkon',
    price: '620 € · 2 Nächte · inkl. Frühstück',
    guests: 2,
    intro: 'Design-Zimmer mit privatem Garten oder Balkon.',
    desc: ROOM_DESC,
    details: AMENITIES,
    images: [ROOM_BASE + 'r1-1.jpg', ROOM_BASE + 'r1-2.jpg', ROOM_BASE + 'r1-3.jpg', ROOM_BASE + 'r1-4.jpg'],
    layouts: [{ src: ROOM_BASE + 'r1-layout.jpg', caption: 'Grundriss' }],
  },
  {
    id: 'junior-jacuzzi',
    name: 'Junior Suite · Jacuzzi',
    title: 'Junior Suite Spa mit privatem Jacuzzi',
    price: '680 € · 2 Nächte · inkl. Frühstück',
    guests: 2,
    intro: 'Design-Zimmer mit privatem Garten oder Balkon. Im Zimmer befinden sich Kunstwerke des Veroneser Malers Antonio Amodio.',
    desc: ROOM_DESC,
    details: AMENITIES.concat(['Privater Jacuzzi']),
    images: [ROOM_BASE + 'r4-1.jpg', ROOM_BASE + 'r4-2.jpg', ROOM_BASE + 'r4-3.jpg', ROOM_BASE + 'r4-4.jpg', ROOM_BASE + 'r4-5.jpg'],
    layouts: [{ src: ROOM_BASE + 'r4-layout.jpg', caption: 'Grundriss' }],
  },
  {
    id: 'deluxe-suite',
    name: 'Deluxe Suite',
    title: 'Deluxe Spa Suite',
    price: '790 € · 2 Nächte · inkl. Frühstück',
    guests: 4,
    intro: '',
    desc:
      'Ein Design-Zimmer auf zwei Ebenen: ein Loft mit King-Size-Bett und ein Wohnzimmer mit ' +
      'Schlafsofa. Gemütliches Badezimmer mit extragroßer Dusche, Regen-Duschkopf und wohltuendem ' +
      'Wasserfall. Ausgestattet mit luxuriösen Stoffen und natürlichen Eichen- und Steinböden. Mit ' +
      'Wasserkocher und Kräutertee-Ecke, Klimaanlage, Flachbildschirm-TV und WLAN; Kleiderschrank ' +
      'mit Minibar und Safe. Diese Suite bietet Platz für bis zu 4 Personen!',
    details: ['Zwei Ebenen (Loft)', 'Schlafsofa im Wohnzimmer', 'Klimaanlage & WLAN', 'Minibar & Safe'],
    images: [ROOM_BASE + 'r5-1.jpg', ROOM_BASE + 'r5-2.jpg', ROOM_BASE + 'r5-3.jpg', ROOM_BASE + 'r5-4.jpg'],
    layouts: [
      { src: ROOM_BASE + 'r5-layout-1.jpg', caption: 'Grundriss · Wohnzimmer (unten)' },
      { src: ROOM_BASE + 'r5-layout-2.jpg', caption: 'Grundriss · Loft-Schlafzimmer (oben)' },
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
  // Pfeil-Buttons: zum vorherigen / nächsten Foto springen.
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
          <button type="button" className="jl-room-arrow is-prev" aria-label="Vorheriges Foto"
            onClick={() => go(-1)} disabled={idx === 0}>‹</button>
          <button type="button" className="jl-room-arrow is-next" aria-label="Nächstes Foto"
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
          👥 {room.guests > 2 ? `bis zu ${room.guests} Personen` : `${room.guests} Personen`}
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
        <span className="jl-room-pick-hint">Wunschzimmer einfach im RSVP angeben ✨</span>
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
            am Veranstaltungsort frei. First come, first serve. Alle Preise gelten für
            <strong> beide Nächte (Fr.–So.) inklusive Frühstück</strong>.
          </p>
          <p className="jl-modal-capacity">
            👥 Alle Zimmer sind für <strong>2 Personen</strong> — außer der <strong>Deluxe Spa Suite</strong>,
            die Platz für <strong>bis zu 4</strong> bietet.
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
