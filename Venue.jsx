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
        <p>
          Kein Zimmer am Forte ergattert? Drei Häuser in Pastrengo sind nur wenige Minuten
          entfernt — mit Entfernung, Infos und Links zum Buchen.
        </p>
        <button type="button" className="jl-link" onClick={() => window.jlOpenStays && window.jlOpenStays()}>
          Unterkünfte ansehen →
        </button>
      </div>
    </div>
  </section>
);

window.Venue = Venue;
