// Story.en.jsx — English "Ciao from Dubai" section
const Story = () => (
  <section id="story" className="jl-section" data-screen-label="Story">
    <div className="jl-section-head">
      <div className="jl-eyebrow">Why Italy</div>
      <h2 className="jl-h2">
        <span className="jl-script-inline">Ciao</span> from <em>Dubai</em>
      </h2>
    </div>

    <div className="jl-story-grid">
      <img
        className="jl-story-media"
        src="assets/Lisa%20n%20Julian%20Selfie.jpg"
        alt="Lisa and Julian"
        loading="lazy"
      />

      <div className="jl-prose">
        <p>
          For over six years Dubai has been home — and our hearts still live in
          both places: at home in Germany with our families, and in the UAE with
          our friends-turned-family. Rather than choosing a side, we decided
          against a wedding in either home. Instead, we’ll spend an amazing time
          in Italy, where the summer heat feels like arriving somewhere familiar
          to both places.
        </p>
        <p>
          There's also this: on <strong>Lago di Garda</strong>, both of us spent
          countless family holidays as kids — full of sunscreen, pasta, and very
          happy memories. Now we simply want to add one more. A particularly big
          one. With all the people we love most.
        </p>
        <p>
          Pasta, Spritz, a little dancing, maybe a tear or two — we can't wait
          to celebrate with you.
        </p>
        <p className="jl-signature">
          <span className="jl-script-md">See you soon,</span><br />
          <span className="jl-signoff">Lisa &amp; Julian</span>
        </p>
      </div>
    </div>
  </section>
);

window.Story = Story;
