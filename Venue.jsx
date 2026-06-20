// Venue.jsx — Forte Benedek + travel map + venue rooms + nearby stays

const TravelMap = () => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const iframe = ref.current;
    if (!iframe) return;
    let settleTimer = null, pollId = null;

    // The embedded map reflows to a different height at every width (and is
    // taller than any fixed box), so size the iframe to its real content.
    // Collapse to 0 first: the page's body min-height:100vh equals the iframe's
    // own height, which would otherwise pin the measurement and block shrinking.
    function measure() {
      const doc = iframe.contentDocument;
      if (!doc || !doc.body) return;
      iframe.style.height = '0px';
      const h = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight);
      iframe.style.height = (h || 200) + 'px';
    }

    // It self-extracts and swaps its document async after load, so one measure
    // isn't enough — poll until the height stops changing.
    function poll() {
      let last = -1, stable = 0;
      clearInterval(pollId);
      pollId = setInterval(function () {
        const doc = iframe.contentDocument;
        const h = doc && doc.body
          ? Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight) : 0;
        measure();
        if (h === last) { if (++stable > 3) clearInterval(pollId); }
        else { last = h; stable = 0; }
      }, 200);
      setTimeout(function () { clearInterval(pollId); }, 6000);
    }

    function onLoad() { measure(); poll(); }
    iframe.addEventListener('load', onLoad);
    if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') onLoad();

    function onResize() { clearTimeout(settleTimer); settleTimer = setTimeout(measure, 150); }
    window.addEventListener('resize', onResize);

    return function () {
      iframe.removeEventListener('load', onLoad);
      window.removeEventListener('resize', onResize);
      clearInterval(pollId);
      clearTimeout(settleTimer);
    };
  }, []);

  return (
    <div className="jl-venue-map" aria-label="Anreisekarte">
      <iframe
        ref={ref}
        src="assets/map-standalone.html"
        title="Anreisekarte zum Lago di Garda"
        loading="lazy"
        scrolling="no"
      ></iframe>
    </div>
  );
};

const Venue = () => (
  <section id="venue" className="jl-section" data-screen-label="Venue">
    <div className="jl-section-head">
      <div className="jl-eyebrow">Wo wir feiern</div>
      <h2 className="jl-h2">
        <span className="jl-script-inline">am</span> Lago di Garda
      </h2>
    </div>

    <TravelMap />

    <div className="jl-venue-grid">
      <div className="jl-info-card">
        <div className="jl-info-card-eyebrow">
          <i data-lucide="map-pin" width="14" height="14"></i>
          Ort
        </div>
        <h3 className="jl-h3">Forte Benedek</h3>
        <p>
          Historisches Fort mit Olivengarten, Pool und Blick auf den See —<br />
          wir haben es komplett für uns.
        </p>
        <a className="jl-link" href="https://fortebenedek.com/it/" target="_blank" rel="noopener">
          fortebenedek.com →
        </a>
      </div>

      <div className="jl-info-card jl-info-card-accent">
        <div className="jl-info-card-eyebrow">
          <i data-lucide="bed" width="14" height="14"></i>
          Übernachten vor Ort
        </div>
        <h3 className="jl-h3">Zimmer am Forte</h3>
        <p>
          Wir haben die ganze Anlage gebucht — und es sind noch{' '}
          <strong>etwa 10 Zimmer</strong> direkt am Veranstaltungsort frei.
        </p>
        <p>
          <strong>Ab 600 €</strong> für zwei Nächte (Standard-Doppelzimmer, 2 Personen).
          Wer dort wohnen möchte, gibt uns kurz Bescheid — first come, first serve.
        </p>
        <button type="button" className="jl-link" onClick={() => window.jlOpenRooms && window.jlOpenRooms()}>
          Zimmer ansehen →
        </button>
      </div>

      <div className="jl-info-card">
        <div className="jl-info-card-eyebrow">
          <i data-lucide="plane" width="14" height="14"></i>
          Anreise
        </div>
        <h3 className="jl-h3">So kommt Ihr hin</h3>
        <ul className="jl-bare-list">
          <li><strong>Mit dem Auto</strong> · München → Garda · ca. 4,5 Std</li>
          <li><strong>Mit dem Zug</strong> · ÖBB Nightjet bis Verona · 4 Std</li>
          <li><strong>Mit dem Flugzeug</strong> · Verona VRN / Bergamo BGY · je 45 Min Transfer</li>
        </ul>
      </div>

      <div className="jl-info-card jl-stay-card">
        <div className="jl-info-card-eyebrow">
          <i data-lucide="bed-double" width="14" height="14"></i>
          Woanders übernachten
        </div>
        <h3 className="jl-h3">In der Nähe schlafen</h3>
        <p>Lieber für Euch? Diese Häuser sind nur ein paar Schritte vom Forte entfernt.</p>

        <a
          className="jl-walkmap"
          href="https://www.google.com/maps/dir/?api=1&origin=Relais+Forte+Benedek,+Via+Morsella+12,+Pastrengo&destination=Agriturismo+Sambuco,+Via+Sambuco+1,+Pastrengo&travelmode=walking"
          target="_blank"
          rel="noopener"
          aria-label="Fußweg vom Forte zum Agriturismo Sambuco auf Google Maps öffnen"
        >
          <svg viewBox="0 0 300 104" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M 46,66 C 120,66 168,36 252,46" stroke="#1E47B5" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="1.5 7" />
            <circle cx="46" cy="66" r="6.5" fill="#F8D34A" stroke="#1E47B5" strokeWidth="2" />
            <circle cx="46" cy="66" r="2" fill="#0E2A6B" />
            <text x="46" y="88" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="9.5" fontWeight="600" fill="#0E2A6B">FORTE</text>
            <circle cx="252" cy="46" r="5" fill="#1E47B5" />
            <text x="252" y="30" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="9.5" fontWeight="600" fill="#0E2A6B">SAMBUCO</text>
            <text x="150" y="42" textAnchor="middle" fontSize="15">🚶</text>
            <text x="150" y="74" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="14" fontStyle="italic" fill="#1E47B5">≈ 7 Min zu Fuß</text>
          </svg>
        </a>

        <ul className="jl-stay-list">
          <li>
            <strong>Agriturismo Sambuco</strong> — Bauernhof mit Pool &amp; Weinbergen, ≈ 7 Min zu Fuß ·{' '}
            <a href="https://www.agriturismosambuco.it/" target="_blank" rel="noopener">Website →</a>
          </li>
          <li>
            <strong>Appartamenti Miralago</strong> — Ferienwohnungen, gleiche Straße wie das Forte ·{' '}
            <a href="https://guias-viajes.com/italy/pastrengo/appartamenti-miralago/" target="_blank" rel="noopener">Ansehen →</a>
          </li>
        </ul>

        <p className="jl-fine jl-stay-more">
          Mehr in Pastrengo:{' '}
          <a href="https://www.agriturismocamparella.it/" target="_blank" rel="noopener">Camparella</a>,{' '}
          <a href="https://www.booking.com/hotel/it/agriturismo-serena-pastrengo.html" target="_blank" rel="noopener">Serena</a>{' '}
          oder{' '}
          <a href="https://www.booking.com/bed-and-breakfast/city/it/pastrengo.html" target="_blank" rel="noopener">alle Unterkünfte in Pastrengo</a>.
        </p>
      </div>
    </div>
  </section>
);

window.Venue = Venue;
