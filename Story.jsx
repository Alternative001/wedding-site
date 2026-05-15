// Story.jsx — the Dubai → Italy story, in the couple's voice
const Story = () => (
  <section id="story" className="jl-section" data-screen-label="Story">
    <div className="jl-section-head">
      <div className="jl-eyebrow">Warum Italien</div>
      <h2 className="jl-h2">
        <span className="jl-script-inline">Ciao</span> aus <em>Dubai</em>
      </h2>
    </div>

    <div className="jl-story-grid">
      <image-slot
        id="story-photo"
        shape="rounded"
        radius="14"
        placeholder="Foto von Lisa & Julian"
        style={{ width: '100%', aspectRatio: '4 / 5' }}
      ></image-slot>

      <div className="jl-prose">
        <p>
          Seit über fünf Jahren nennen wir Dubai unser Zuhause — und ehrlich
          gesagt vermissen wir den deutschen Sommer dort selten. Deshalb haben
          wir uns gegen eine Hochzeit in Deutschland entschieden und für Italien:
          ein Ort, an dem die Sommerhitze sich ein bisschen wie heimkommen anfühlt.
        </p>
        <p>
          Dazu kommt: am <strong>Lago di Garda</strong> haben wir beide schon als
          Kinder unzählige Familienurlaube verbracht — voller Sonnenmilch, Pasta
          und sehr glücklicher Erinnerungen. Jetzt wollen wir einfach noch eine
          dazupacken. Eine besonders große. Mit all den Menschen, die wir am
          liebsten haben.
        </p>
        <p>
          Pasta, Spritz, ein bisschen Tanzen, vielleicht eine Träne — wir können
          es kaum erwarten, mit Euch zu feiern.
        </p>
        <p className="jl-signature">
          <span className="jl-script-md">Bis bald,</span><br />
          <span className="jl-signoff">Lisa &amp; Julian</span>
        </p>
      </div>
    </div>
  </section>
);

window.Story = Story;
