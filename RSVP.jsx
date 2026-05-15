// RSVP.jsx — yes/no, arrival day, per-adult name fields, kids count, shuttle, confetti on submit
const initial = () => ({
  email: '',
  attending: '',          // 'yes' | 'no'
  arrivalDay: '',         // 'friday' | 'saturday'
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
        aria-label="weniger"
      >−</button>
      <span className="jl-stepper-value">{value}</span>
      <button
        type="button"
        className="jl-stepper-btn"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="mehr"
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
    (form.attending === 'no' || (
      form.adultNames.every((n) => n.trim().length > 0) &&
      form.arrivalDay !== ''
    ));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (form.attending === 'yes' && window.triggerConfetti) {
      window.triggerConfetti();
    }
  };

  if (submitted) {
    const total = form.attending === 'yes' ? form.adultCount + form.kidsCount : 0;
    const firstName = (form.adultNames[0] || '').split(' ')[0];
    return (
      <section id="rsvp" className="jl-section jl-section-cobalt" data-screen-label="RSVP-success">
        <div className="jl-rsvp-success">
          <div className="jl-script-xl">Grazie!</div>
          <div className="jl-eyebrow" style={{ color: 'var(--color-lemon-300)' }}>Deine Antwort ist angekommen</div>
          <h2 className="jl-h2" style={{ color: 'var(--color-cream)' }}>
            {form.attending === 'yes'
              ? <>Wir freuen uns so sehr<br/>auf Euch{firstName ? `, ${firstName}` : ''}.</>
              : <>Schade — aber danke<br/>für die schnelle Antwort.</>}
          </h2>
          <p style={{ color: 'rgba(255,251,242,0.85)', maxWidth: '40ch', margin: '12px auto 24px' }}>
            {form.attending === 'yes'
              ? <>Wir planen mit <strong>{total}</strong> {total === 1 ? 'Person' : 'Personen'}. Eine Bestätigung kommt per Mail an <strong>{form.email}</strong>.</>
              : <>Wir vermissen Euch — schreibt gern eine Postkarte aus der Ferne 💛</>}
          </p>
          <button className="jl-btn jl-btn-secondary" onClick={() => { setSubmitted(false); setForm(initial()); }}>
            Noch jemand zusagen lassen
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
          <span className="jl-script-inline" style={{ color: 'var(--color-lemon-300)' }}>Bitte</span> sagt uns Bescheid
        </h2>
        <p className="jl-rsvp-deadline">bis spätestens 1. Mai 2027</p>
      </div>

      <form className="jl-rsvp" onSubmit={handleSubmit}>
        <div className="jl-field jl-field-full">
          <label>E-Mail für die Bestätigung</label>
          <input required type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="anna@beispiel.de" />
        </div>

        <div className="jl-field jl-field-full">
          <label>Kommt Ihr?</label>
          <div className="jl-radio-row">
            {[
              ['yes', 'Ja, wir kommen 💛'],
              ['no', 'Schaffen wir leider nicht'],
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
            <div className="jl-field jl-field-full">
              <label>Wann kommt Ihr an?</label>
              <div className="jl-radio-row">
                {[
                  ['friday',   'Freitag — Pool, Pizza & ankommen 🏊'],
                  ['saturday', 'Samstag — direkt zum großen Tag 💍'],
                ].map(([v, l]) => (
                  <button
                    type="button"
                    key={v}
                    className={`jl-radio-btn ${form.arrivalDay === v ? 'is-active' : ''}`}
                    onClick={() => set('arrivalDay', v)}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div className="jl-field jl-field-half">
              <Stepper
                label="Erwachsene"
                value={form.adultCount}
                onChange={setAdultCount}
                min={1}
                max={6}
              />
            </div>
            <div className="jl-field jl-field-half">
              <Stepper
                label="Kinder / Babys"
                value={form.kidsCount}
                onChange={(v) => set('kidsCount', v)}
                min={0}
                max={6}
                note="0–14 Jahre"
              />
            </div>

            <div className="jl-field jl-field-full">
              <label>Namen der Gäste</label>
              <div className="jl-names-list">
                {form.adultNames.map((name, i) => (
                  <div key={i} className="jl-named-row">
                    <span className="jl-named-num">{i + 1}</span>
                    <input
                      required
                      value={name}
                      onChange={(e) => setAdultName(i, e.target.value)}
                      placeholder={i === 0 ? 'Dein Name' : `Name Gast ${i + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="jl-field jl-field-full">
              <label>Besondere Wünsche beim Essen?</label>
              <input value={form.diet} onChange={(e) => set('diet', e.target.value)} placeholder="z.B. vegetarisch, glutenfrei, Allergien…" />
            </div>

            <div className="jl-field jl-field-full">
              <label className="jl-check">
                <input type="checkbox" checked={form.shuttle} onChange={(e) => set('shuttle', e.target.checked)} />
                <span>Wir nutzen den Shuttle <strong>am Samstagabend</strong> zurück zum Hotel</span>
              </label>
            </div>
          </>
        )}

        <div className="jl-field jl-field-full">
          <label>Eine Nachricht an uns? (optional)</label>
          <textarea value={form.message} onChange={(e) => set('message', e.target.value)} rows="3" placeholder="Wir freuen uns so sehr…" />
        </div>

        <div className="jl-field jl-field-full jl-rsvp-submit">
          <button type="submit" className="jl-btn jl-btn-primary" disabled={!canSubmit}>
            Antwort absenden
          </button>
        </div>
      </form>
    </section>
  );
};

window.RSVP = RSVP;
