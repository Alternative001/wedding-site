// RSVP.en.jsx — English RSVP form
const initial = () => ({
  email: '',
  attending: '',
  adultCount: 1,
  adultNames: [''],
  kidsCount: 0,
  diet: '',
  shuttle: false,
  message: '',
});

const Stepper = ({ label, value, onChange, min = 0, max = 10, note }) => (
  <div className="jl-stepper">
    <div className="jl-stepper-head">
      <span>{label}</span>
      {note && <span className="jl-stepper-note">{note}</span>}
    </div>
    <div className="jl-stepper-row">
      <button
        type="button"
        className="jl-stepper-btn"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="fewer"
      >−</button>
      <span className="jl-stepper-value">{value}</span>
      <button
        type="button"
        className="jl-stepper-btn"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="more"
      >+</button>
    </div>
  </div>
);

const RSVP = () => {
  const [form, setForm] = React.useState(initial);
  const [submitted, setSubmitted] = React.useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const setAdultCount = (n) => {
    setForm((f) => {
      const names = f.adultNames.slice(0, n);
      while (names.length < n) names.push('');
      return { ...f, adultCount: n, adultNames: names };
    });
  };
  const setAdultName = (i, v) => {
    setForm((f) => {
      const names = [...f.adultNames];
      names[i] = v;
      return { ...f, adultNames: names };
    });
  };

  const canSubmit =
    form.attending &&
    form.email &&
    (form.attending === 'no' || form.adultNames.every((n) => n.trim().length > 0));

  if (submitted) {
    const total = form.attending === 'yes' ? form.adultCount + form.kidsCount : 0;
    const firstName = (form.adultNames[0] || '').split(' ')[0];
    return (
      <section id="rsvp" className="jl-section jl-section-cobalt" data-screen-label="RSVP-success">
        <div className="jl-rsvp-success">
          <div className="jl-script-xl">Grazie!</div>
          <div className="jl-eyebrow" style={{ color: 'var(--color-lemon-300)' }}>Your reply has been received</div>
          <h2 className="jl-h2" style={{ color: 'var(--color-cream)' }}>
            {form.attending === 'yes'
              ? <>We're so excited to have you{firstName ? `, ${firstName}` : ''}.</>
              : <>Such a shame — but thank you<br/>for letting us know.</>}
          </h2>
          <p style={{ color: 'rgba(255,251,242,0.85)', maxWidth: '40ch', margin: '12px auto 24px' }}>
            {form.attending === 'yes'
              ? <>We're counting on <strong>{total}</strong> {total === 1 ? 'person' : 'people'}. A confirmation is on its way to <strong>{form.email}</strong>.</>
              : <>We'll miss you — feel free to send a postcard from afar 💛</>}
          </p>
          <button className="jl-btn jl-btn-secondary" onClick={() => { setSubmitted(false); setForm(initial()); }}>
            Add another guest
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="jl-section jl-section-cobalt" data-screen-label="RSVP">
      <div className="jl-section-head jl-section-head-light">
        <div className="jl-eyebrow" style={{ color: 'var(--color-lemon-300)' }}>R.S.V.P.</div>
        <h2 className="jl-h2" style={{ color: 'var(--color-cream)' }}>
          <span className="jl-script-inline" style={{ color: 'var(--color-lemon-300)' }}>Please</span> let us know
        </h2>
        <p className="jl-rsvp-deadline">by 1 May 2027 at the latest</p>
      </div>

      <form className="jl-rsvp" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
        <div className="jl-field jl-field-full">
          <label>Email for your confirmation</label>
          <input required type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@example.com" />
        </div>

        <div className="jl-field jl-field-full">
          <label>Will you be joining us?</label>
          <div className="jl-radio-row">
            {[
              ['yes', "Yes, we'll be there 💛"],
              ['no', "We can't make it, sadly"],
            ].map(([v, l]) => (
              <button
                type="button"
                key={v}
                className={`jl-radio-btn ${form.attending === v ? 'is-active' : ''}`}
                onClick={() => set('attending', v)}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {form.attending === 'yes' && (
          <>
            <div className="jl-field jl-field-half">
              <Stepper
                label="Adults"
                value={form.adultCount}
                onChange={setAdultCount}
                min={1}
                max={6}
              />
            </div>
            <div className="jl-field jl-field-half">
              <Stepper
                label="Children / Babies"
                value={form.kidsCount}
                onChange={(v) => set('kidsCount', v)}
                min={0}
                max={6}
                note="ages 0–14"
              />
            </div>

            <div className="jl-field jl-field-full">
              <label>Guest names</label>
              <div className="jl-names-list">
                {form.adultNames.map((name, i) => (
                  <div key={i} className="jl-named-row">
                    <span className="jl-named-num">{i + 1}</span>
                    <input
                      required
                      value={name}
                      onChange={(e) => setAdultName(i, e.target.value)}
                      placeholder={i === 0 ? 'Your name' : `Guest ${i + 1} name`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="jl-field jl-field-full">
              <label>Any dietary requirements?</label>
              <input value={form.diet} onChange={(e) => set('diet', e.target.value)} placeholder="e.g. vegetarian, gluten-free, allergies…" />
            </div>

            <div className="jl-field jl-field-full">
              <label className="jl-check">
                <input type="checkbox" checked={form.shuttle} onChange={(e) => set('shuttle', e.target.checked)} />
                <span>We'd like to use the <strong>Saturday evening shuttle</strong> back to our hotel</span>
              </label>
            </div>
          </>
        )}

        <div className="jl-field jl-field-full">
          <label>A message for us? (optional)</label>
          <textarea value={form.message} onChange={(e) => set('message', e.target.value)} rows="3" placeholder="We're so excited…" />
        </div>

        <div className="jl-field jl-field-full jl-rsvp-submit">
          <button type="submit" className="jl-btn jl-btn-primary" disabled={!canSubmit}>
            Send RSVP
          </button>
        </div>
      </form>
    </section>
  );
};

window.RSVP = RSVP;
