// Gifts.jsx — the "Wunschliste" pop-up (German). Opened via window.jlOpenGifts()
// (see App.jsx). The headline is a loud, playful "nothing!"; only after the guest
// insists and ticks the Dubai-luggage reality do we reveal the honeymoon note.
const GiftsModal = ({ open, onClose }) => {
  const [wantGift, setWantGift] = React.useState(false);
  const [ack, setAck] = React.useState(false);

  React.useEffect(() => {
    if (!open) { setWantGift(false); setAck(false); return; }
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
        className="jl-modal jl-gift-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="jl-gift-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="jl-modal-close" aria-label="Schließen" onClick={onClose}>×</button>

        <div className="jl-gift-hero">
          <div className="jl-eyebrow" style={{ color: 'var(--color-cobalt)' }}>Unsere Wunschliste</div>
          <div id="jl-gift-title" className="jl-script-xl jl-gift-big">nichts,<br />wirklich nichts!</div>
        </div>

        <p className="jl-gift-lead">
          Ganz ehrlich: Wenn Ihr kommt und die Mühe und Kosten für Reise und Übernachtung
          zu unserer Hochzeit in Italien (oder ganz in der Nähe) auf Euch nehmt, ist das
          mehr als genug. Es braucht wirklich <strong>kein Geschenk</strong> — gar keins.
        </p>

        {!wantGift && (
          <div className="jl-gift-actions">
            <button type="button" className="jl-btn jl-btn-secondary jl-btn-sm" onClick={() => setWantGift(true)}>
              Ich möchte Euch trotzdem etwas schenken
            </button>
          </div>
        )}

        {wantGift && (
          <div className="jl-gift-step">
            <label className="jl-check jl-gift-ack">
              <input type="checkbox" checked={ack} onChange={(e) => setAck(e.target.checked)} />
              <span>
                Mir ist bewusst, dass Julian und Lisa zurück nach Dubai fliegen und
                <strong> extrem wenig Platz im Gepäck</strong> haben — also bitte keine
                Sachgeschenke.
              </span>
            </label>

            {ack && (
              <p className="jl-gift-reveal">
                Versprochen? 💛 Dann ein kleines Geheimnis: Bei der Hochzeit gibt es eine
                unkomplizierte Möglichkeit, zu unserer <strong>Flitterwochen-Kasse</strong>
                {' '}beizutragen — ganz freiwillig. Mehr braucht es wirklich nicht.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

window.GiftsModal = GiftsModal;
