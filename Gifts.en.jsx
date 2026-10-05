// Gifts.en.jsx — the "wish list" pop-up (English). Opened via window.jlOpenGifts()
// (see App.jsx). A loud, playful "nothing!"; only after the guest insists and ticks
// the Dubai-luggage reality do we reveal the honeymoon note.
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
        <button type="button" className="jl-modal-close" aria-label="Close" onClick={onClose}>×</button>

        <div className="jl-gift-hero">
          <div className="jl-eyebrow" style={{ color: 'var(--color-cobalt)' }}>Our wish list</div>
          <div id="jl-gift-title" className="jl-script-xl jl-gift-big">nothing,<br />really nothing!</div>
        </div>

        <p className="jl-gift-lead">
          Honestly: if you come and take on the effort and cost of travelling and staying
          for our wedding in Italy (or somewhere nearby), that is more than enough. You
          really don’t need to bring <strong>any gift</strong> at all.
        </p>

        {!wantGift && (
          <div className="jl-gift-actions">
            <button type="button" className="jl-btn jl-btn-secondary jl-btn-sm" onClick={() => setWantGift(true)}>
              I still want to give you something
            </button>
          </div>
        )}

        {wantGift && (
          <div className="jl-gift-step">
            <label className="jl-check jl-gift-ack">
              <input type="checkbox" checked={ack} onChange={(e) => setAck(e.target.checked)} />
              <span>
                I’m aware that Julian and Lisa have to fly back to Dubai and have
                <strong> extremely little space in their luggage</strong> — so please, no
                physical gifts.
              </span>
            </label>

            {ack && (
              <p className="jl-gift-reveal">
                Promise? 💛 Then a little secret: at the wedding there’ll be an easy way to
                chip in to our <strong>honeymoon fund</strong> — entirely optional. That’s
                truly all we need.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

window.GiftsModal = GiftsModal;
