// Venue.jsx — Forte Benedek + travel map + venue rooms + Saturday-night shuttle

const TravelMap = () => {
  const mapRef = React.useRef(null);

  React.useEffect(() => {
    if (!mapRef.current) return;
    const paths = mapRef.current.querySelectorAll('.jl-map-line');

    paths.forEach(function (p) {
      const len = p.getTotalLength();
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = len;
    });

    const io = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      paths.forEach(function (p, i) {
        p.style.transition = 'stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1) ' + (i * 0.4) + 's';
        p.style.strokeDashoffset = 0;
      });
      io.disconnect();
    }, { threshold: 0.35 });

    io.observe(mapRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={mapRef} className="jl-venue-map" aria-label="Anreisekarte">
      <svg viewBox="0 0 640 258" xmlns="http://www.w3.org/2000/svg">
        {/* Cream base */}
        <rect width="640" height="258" fill="#FFFBF2"/>

        {/* Subtle map grid */}
        {[65, 130, 195].map(y => (
          <line key={'h'+y} x1="0" y1={y} x2="640" y2={y} stroke="#E7DEC6" strokeWidth="0.5"/>
        ))}
        {[128, 256, 384, 512].map(x => (
          <line key={'v'+x} x1={x} y1="0" x2={x} y2="258" stroke="#E7DEC6" strokeWidth="0.5"/>
        ))}

        {/* Mediterranean sea suggestion */}
        <path d="M 0,210 Q 132,196 264,210 Q 382,224 524,208 L 640,214 L 640,258 L 0,258 Z" fill="#DCE9F8" opacity="0.55"/>

        {/* Alpine silhouette + fill */}
        <path d="M 75,148 L 100,120 L 120,140 L 143,108 L 165,134 L 186,114 L 210,138 L 232,110 L 257,138 L 280,114 L 304,138 L 328,112 L 352,138" fill="none" stroke="#B8D2F1" strokeWidth="1.5"/>
        <path d="M 75,148 L 100,120 L 120,140 L 143,108 L 165,134 L 186,114 L 210,138 L 232,110 L 257,138 L 280,114 L 304,138 L 328,112 L 352,138 L 352,148 Z" fill="#DCE9F8" opacity="0.38"/>

        {/* Germany tint (north of Alps) */}
        <rect x="0" y="0" width="438" height="146" fill="#EFF5FF" opacity="0.28"/>

        {/* Italy tint (south of Alps) */}
        <path d="M 148,148 L 382,148 L 382,218 Q 312,242 264,235 Q 200,230 148,210 Z" fill="#FFF4E0" opacity="0.32"/>

        {/* Map label */}
        <text x="544" y="20" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="9" fontWeight="500" fill="#6F695A" letterSpacing="0.22em" opacity="0.55">ANREISE</text>

        {/* ── Travel lines (animated via JS) ── */}
        {/* Karlsdorf-Neuthard → Garda */}
        <path className="jl-map-line" d="M 114,78 C 148,40 216,86 264,160" stroke="#1E47B5" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* Landshut → Garda */}
        <path className="jl-map-line" d="M 374,74 C 344,38 303,83 264,160" stroke="#1E47B5" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* Dubai → Garda (longer arc for the flight) */}
        <path className="jl-map-line" d="M 572,230 C 494,88 376,108 264,160" stroke="#1E47B5" strokeWidth="2.5" fill="none" strokeLinecap="round"/>

        {/* ── Origin: Karlsdorf-Neuthard ── */}
        <circle cx="114" cy="78" r="9" fill="none" stroke="#1E47B5" strokeWidth="1" opacity="0.28"/>
        <circle cx="114" cy="78" r="5" fill="#1E47B5"/>
        <text x="114" y="63" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="9.5" fontWeight="600" fill="#0E2A6B" letterSpacing="0.1em">KARLSDORF</text>
        <text x="114" y="52" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="9.5" fontWeight="600" fill="#0E2A6B" letterSpacing="0.1em">NEUTHARD</text>

        {/* ── Origin: Landshut ── */}
        <circle cx="374" cy="74" r="9" fill="none" stroke="#1E47B5" strokeWidth="1" opacity="0.28"/>
        <circle cx="374" cy="74" r="5" fill="#1E47B5"/>
        <text x="374" y="60" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="9.5" fontWeight="600" fill="#0E2A6B" letterSpacing="0.1em">LANDSHUT</text>

        {/* ── Origin: Dubai ── */}
        <circle cx="572" cy="230" r="9" fill="none" stroke="#1E47B5" strokeWidth="1" opacity="0.28"/>
        <circle cx="572" cy="230" r="5" fill="#1E47B5"/>
        <text x="572" y="216" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="9.5" fontWeight="600" fill="#0E2A6B" letterSpacing="0.1em">DUBAI</text>
        <text x="572" y="205" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="9" fill="#1E47B5" opacity="0.72">✈  6 h</text>

        {/* ── Destination: Lago di Garda ── */}
        <circle cx="264" cy="160" r="14" fill="#F8D34A" stroke="#1E47B5" strokeWidth="2"/>
        <circle cx="264" cy="160" r="4" fill="#0E2A6B"/>
        <text x="264" y="186" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="11.5" fontWeight="500" fill="#0E2A6B" letterSpacing="0.1em">LAGO DI GARDA</text>
        <text x="264" y="198" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="10.5" fontStyle="italic" fill="#1E47B5">Juli 2027</text>
      </svg>
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

    <div className="jl-venue-grid">
      <TravelMap />

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
        <a className="jl-link" href="mailto:hallo@lisa-und-julian.de?subject=Zimmer%20am%20Forte%20Benedek">
          Zimmer anfragen →
        </a>
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

      <div className="jl-info-card">
        <div className="jl-info-card-eyebrow">
          <i data-lucide="bus" width="14" height="14"></i>
          Shuttle Samstagabend
        </div>
        <h3 className="jl-h3">Sicher zurück ins Hotel</h3>
        <p>
          Für alle, die in Hotels in der Umgebung schlafen, organisieren wir am
          <strong> Samstagabend </strong>einen Shuttle zurück. Wenn Ihr ihn nutzen
          möchtet, hakt das bitte im RSVP an — sonst planen wir Euch nicht ein.
        </p>
      </div>
    </div>
  </section>
);

window.Venue = Venue;
