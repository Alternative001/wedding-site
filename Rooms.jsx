// Rooms.jsx — room overview pop-up (German). Shared by the Venue card and the
// RSVP "room at the Forte" tick. Opened via window.jlOpenRooms() (see App.jsx).

// Swap `img` for an asset path (e.g. "assets/rooms/zimmer-1.jpg") to replace the
// placeholder tile. `name` is the short label (RSVP selector + card kicker),
// `title` the room type.
const JL_ROOMS = [
  {
    id: 'zimmer-1',
    name: 'Zimmer 1',
    title: 'King Superior Spa mit Garten oder Balkon',
    price: '1.000 € · 2 Nächte · inkl. Frühstück',
    img: null,
    desc:
      'Design-Zimmer mit privatem Garten oder Balkon. King-Size-Bett mit Schwebe-Effekt und ' +
      'gemütliches Badezimmer mit extragroßer Dusche, Regen-Duschkopf und emotionalem Wasserfall. ' +
      'Ausgestattet mit luxuriösen Stoffen und natürlichen Eichen- und Steinböden. Für die Gäste: ' +
      'Wasserkocher mit Kräutertee-Ecke, Klimaanlage, Flachbildschirm-TV und WLAN, Kleiderschrank ' +
      'mit Minibar und Safe, weiche Bademäntel, Hausschuhe und eine Pflegelinie von John Richmond.',
    details: [
      'Zimmerservice',
      'Satellitenfernsehen & professionelles Telefon',
      'Safe & Minibar',
      'Holzboden',
      'Zugang zum K Club',
      'Privates türkisches Bad',
    ],
  },
  {
    id: 'zimmer-2',
    name: 'Zimmer 2',
    title: 'Junior Suite Spa mit Spiegeln und großem Fenster',
    price: 'Preis auf Anfrage',
    img: null,
    desc:
      'Design-Zimmer mit einem großen Fenster. King-Size-Bett mit Schwebe-Effekt und gemütliches ' +
      'Badezimmer mit extragroßer Dusche, Regen-Duschkopf und emotionalem Wasserfall. Ausgestattet ' +
      'mit luxuriösen Stoffen und natürlichen Eichen- und Steinböden. Für die Gäste: Wasserkocher ' +
      'mit Kräutertee-Ecke, Klimaanlage, Flachbildschirm-TV und WLAN, Kleiderschrank mit Minibar ' +
      'und Safe, weiche Bademäntel, Hausschuhe und eine Pflegelinie von John Richmond.',
    details: [
      'Zimmerservice',
      'Satellitenfernsehen & professionelles Telefon',
      'Safe & Minibar',
      'Holzboden',
      'Zugang zum K Club',
      'Privates türkisches Bad',
    ],
  },
  {
    id: 'zimmer-3',
    name: 'Zimmer 3',
    title: 'Weiteres Zimmer',
    price: 'Preis auf Anfrage',
    img: null,
    desc: 'Details folgen in Kürze.',
    details: [],
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
          {JL_ROOMS.map((r) => (
            <div key={r.id} className="jl-room-card">
              <div className="jl-room-photo">
                {r.img ? <img src={r.img} alt={r.title} /> : <span>Foto folgt</span>}
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
                    Dieses Zimmer anfragen
                  </a>
                </div>
              </div>
            </div>
          ))}
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
