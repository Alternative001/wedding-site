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
        src="assets/Forte.png"
        alt="Lisa and Julian"
        style={{ width: '100%', aspectRatio: '4 / 5', objectFit: 'cover', borderRadius: '14px' }}
      />

      <div className="jl-prose">
        <p>
          For over five years Dubai has been home — and honestly, we rarely miss
          the European summer from there. That's why we decided against a wedding
          closer to home and chose Italy instead: a place where the summer heat
          feels a little like arriving somewhere familiar.
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
