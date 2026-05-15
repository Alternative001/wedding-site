// Venue.en.jsx — English venue + travel info
const Venue = () => (
  <section id="venue" className="jl-section" data-screen-label="Venue">
    <div className="jl-section-head">
      <div className="jl-eyebrow">Where we're celebrating</div>
      <h2 className="jl-h2">
        <span className="jl-script-inline">at</span> Lago di Garda
      </h2>
    </div>

    <div className="jl-venue-grid">
      <image-slot
        id="venue-photo"
        shape="rounded"
        radius="22"
        placeholder="Photo of Forte Benedek"
        style={{ width: '100%', aspectRatio: '4 / 3', gridColumn: '1 / -1' }}
      ></image-slot>

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
        <a className="jl-link" href="mailto:hallo@lisa-und-julian.de?subject=Room%20at%20Forte%20Benedek">
          Request a room →
        </a>
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
