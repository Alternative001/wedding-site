// Venue.jsx — Forte Benedek + venue rooms + Saturday-night shuttle
const Venue = () => (
  <section id="venue" className="jl-section" data-screen-label="Venue">
    <div className="jl-section-head">
      <div className="jl-eyebrow">Wo wir feiern</div>
      <h2 className="jl-h2">
        <span className="jl-script-inline">am</span> Lago di Garda
      </h2>
    </div>

    <div className="jl-venue-grid">
      <image-slot
        id="venue-photo"
        shape="rounded"
        radius="22"
        placeholder="Foto vom Forte Benedek"
        style={{ width: '100%', aspectRatio: '4 / 3', gridColumn: '1 / -1' }}
      ></image-slot>

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
