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

      <div className="jl-info-card">
        <div className="jl-info-card-eyebrow">
          <i data-lucide="bus" width="14" height="14"></i>
          Saturday evening shuttle
        </div>
        <h3 className="jl-h3">Safe return to your hotel</h3>
        <p>
          For everyone sleeping at nearby hotels, we're organising a
          <strong> Saturday evening </strong>shuttle back. If you'd like to use it,
          please tick the box in your RSVP — otherwise we won't include you in the count.
        </p>
      </div>
    </div>
  </section>
);

window.Venue = Venue;
