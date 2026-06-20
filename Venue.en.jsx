// Venue.en.jsx — English venue + animated travel map

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
    <div className="jl-venue-map" aria-label="Travel map">
      <iframe
        ref={ref}
        src="assets/map-standalone.html"
        title="Travel map to Lago di Garda"
        loading="lazy"
        scrolling="no"
      ></iframe>
    </div>
  );
};

const Venue = () => (
  <section id="venue" className="jl-section" data-screen-label="Venue">
    <div className="jl-section-head">
      <div className="jl-eyebrow">Where we're celebrating</div>
      <h2 className="jl-h2">
        <span className="jl-script-inline">at</span> Lago di Garda
      </h2>
    </div>

    <TravelMap />

    <div className="jl-venue-grid">
      <div className="jl-info-card">
        <div className="jl-info-card-eyebrow">
          <i data-lucide="map-pin" width="14" height="14"></i>
          Venue
        </div>
        <h3 className="jl-h3">Forte Benedek</h3>
        <p>
          A historic fort with olive grove, pool and views over the lake —<br />
          we have it entirely to ourselves.
        </p>
        <a className="jl-link" href="https://fortebenedek.com/it/" target="_blank" rel="noopener">
          fortebenedek.com →
        </a>
      </div>

      <div className="jl-info-card jl-info-card-accent">
        <div className="jl-info-card-eyebrow">
          <i data-lucide="bed" width="14" height="14"></i>
          Stay on-site
        </div>
        <h3 className="jl-h3">Rooms at the Forte</h3>
        <p>
          We've booked the entire estate — and there are still{' '}
          <strong>around 10 rooms</strong> available right at the venue.
        </p>
        <p>
          <strong>From €600</strong> for two nights (standard double, 2 people).
          If you'd like to stay there, just let us know — first come, first served.
        </p>
        <button type="button" className="jl-link" onClick={() => window.jlOpenRooms && window.jlOpenRooms()}>
          See the rooms →
        </button>
      </div>

      <div className="jl-info-card">
        <div className="jl-info-card-eyebrow">
          <i data-lucide="plane" width="14" height="14"></i>
          Getting here
        </div>
        <h3 className="jl-h3">How to get there</h3>
        <ul className="jl-bare-list">
          <li><strong>By car</strong> · Munich → Garda · approx. 4.5 hrs</li>
          <li><strong>By train</strong> · ÖBB Nightjet to Verona · 4 hrs</li>
          <li><strong>By plane</strong> · Verona VRN / Bergamo BGY · 45 min transfer each</li>
        </ul>
      </div>

      <div className="jl-info-card jl-stay-card">
        <div className="jl-info-card-eyebrow">
          <i data-lucide="bed-double" width="14" height="14"></i>
          Other places to stay
        </div>
        <h3 className="jl-h3">Sleeping nearby</h3>
        <p>Prefer your own place? These are just a few steps from the Forte.</p>

        <a
          className="jl-walkmap"
          href="https://www.google.com/maps/dir/?api=1&origin=Relais+Forte+Benedek,+Via+Morsella+12,+Pastrengo&destination=Agriturismo+Sambuco,+Via+Sambuco+1,+Pastrengo&travelmode=walking"
          target="_blank"
          rel="noopener"
          aria-label="Open the walking route from the Forte to Agriturismo Sambuco on Google Maps"
        >
          <svg viewBox="0 0 300 104" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M 46,66 C 120,66 168,36 252,46" stroke="#1E47B5" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="1.5 7" />
            <circle cx="46" cy="66" r="6.5" fill="#F8D34A" stroke="#1E47B5" strokeWidth="2" />
            <circle cx="46" cy="66" r="2" fill="#0E2A6B" />
            <text x="46" y="88" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="9.5" fontWeight="600" fill="#0E2A6B">FORTE</text>
            <circle cx="252" cy="46" r="5" fill="#1E47B5" />
            <text x="252" y="30" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="9.5" fontWeight="600" fill="#0E2A6B">SAMBUCO</text>
            <text x="150" y="42" textAnchor="middle" fontSize="15">🚶</text>
            <text x="150" y="74" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="14" fontStyle="italic" fill="#1E47B5">≈ 7 min on foot</text>
          </svg>
        </a>

        <ul className="jl-stay-list">
          <li>
            <strong>Agriturismo Sambuco</strong> — farmhouse with pool &amp; vineyards, ≈ 7 min on foot ·{' '}
            <a href="https://www.agriturismosambuco.it/" target="_blank" rel="noopener">Website →</a>
          </li>
          <li>
            <strong>Appartamenti Miralago</strong> — apartments, same street as the Forte ·{' '}
            <a href="https://guias-viajes.com/italy/pastrengo/appartamenti-miralago/" target="_blank" rel="noopener">View →</a>
          </li>
        </ul>

        <p className="jl-fine jl-stay-more">
          More in Pastrengo:{' '}
          <a href="https://www.agriturismocamparella.it/" target="_blank" rel="noopener">Camparella</a>,{' '}
          <a href="https://www.booking.com/hotel/it/agriturismo-serena-pastrengo.html" target="_blank" rel="noopener">Serena</a>{' '}
          or{' '}
          <a href="https://www.booking.com/bed-and-breakfast/city/it/pastrengo.html" target="_blank" rel="noopener">all stays in Pastrengo</a>.
        </p>
      </div>
    </div>
  </section>
);

window.Venue = Venue;
