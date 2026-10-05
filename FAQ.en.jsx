// FAQ.en.jsx — English accordion FAQ
const BRIDESMAIDS = [
  { name: 'Hanna Nyssen', display: '+971 55 147 6701', tel: '+971551476701' },
  { name: 'Kristina Nikolendzic', display: '+971 50 886 5709', tel: '+971508865709' },
  { name: 'Michelle Matuzzi', display: '+971 55 820 3129', tel: '+971558203129' },
];

const BridesmaidList = () => (
  <ul className="jl-faq-contacts">
    {BRIDESMAIDS.map((b) => (
      <li key={b.tel}>
        <strong>{b.name}</strong>
        <a href={`tel:${b.tel}`}>{b.display}</a>
        <a href={`https://wa.me/${b.tel.replace('+', '')}`} target="_blank" rel="noopener">WhatsApp</a>
      </li>
    ))}
  </ul>
);

const FAQ_ITEMS = [
  {
    q: 'What should we gift you for your wedding?',
    a: (
      <>
        The most important thing: nothing. The fact that you’re coming to our wedding at
        Lago di Garda — taking on the costs, the travel and organising your stay — is more
        than enough for us. You truly don’t need to bring any gifts, so please don’t feel
        obliged to bring anything other than yourselves. Especially no physical gifts,
        please — we have to carry everything back to Dubai.
        <div className="jl-gift-faq-cta">
          <button type="button" className="jl-link" onClick={() => window.jlOpenGifts && window.jlOpenGifts()}>
            What you can give us →
          </button>
        </div>
      </>
    ),
  },
  {
    q: 'Are children welcome?',
    a: 'Sure, bring em along! Please let us know in your RSVP so we can plan accordingly.',
  },
  {
    q: 'Would you like to add something to the programme — e.g. give a speech?',
    a: (
      <>
        We’d love that! Please give our bridesmaids <strong>advance notice</strong> —
        they coordinate the programme and will give you a time slot (for anything that
        isn’t embarrassing 😉). All three speak English and German:
        <BridesmaidList />
      </>
    ),
  },
  {
    q: 'Where can we stay?',
    a: 'We’ve reserved the rooms right at our venue for you — the entire estate is booked out for our guests (you’ll find prices and options above in the “at Lago di Garda” section). But you don’t have to stay with us: if you’d rather sleep somewhere else nearby, that’s completely fine — we’ve linked a few lovely alternatives up there too.',
  },
  {
    q: 'What is the weather like in late July at Lago di Garda?',
    a: 'Reliably warm — 28–32 °C during the day, mild around 22 °C in the evening. Sunglasses and a light wrap for later in the night are a good idea. And don’t worry about the heat: the ceremony is held inside the Forte’s vaults, so you’ll be seated in the cool shade, not in the direct midday sun.',
  },
  {
    q: 'When do we need to RSVP by?',
    a: 'By 1 February 2027. After that we submit the final guest list to catering and the location.',
  },
  {
    q: 'Are there dietary options at dinner?',
    a: 'Yes, there will be vegetarian options. If you have any special restrictions, let us know in the RSVP form.',
  },
];

const FAQ = () => {
  const [open, setOpen] = React.useState(0);
  return (
    <section id="faq" className="jl-section jl-section-paper" data-screen-label="FAQ">
      <div className="jl-section-head">
        <div className="jl-eyebrow">Common questions</div>
        <h2 className="jl-h2">Things you might want to know</h2>
      </div>

      <ul className="jl-faq">
        {FAQ_ITEMS.map((item, i) => (
          <li key={i} className={`jl-faq-item ${open === i ? 'is-open' : ''}`}>
            <button
              className="jl-faq-q"
              onClick={() => setOpen(open === i ? -1 : i)}
              aria-expanded={open === i}
            >
              <span>{item.q}</span>
              <i data-lucide={open === i ? 'minus' : 'plus'} width="18" height="18"></i>
            </button>
            {open === i && <div className="jl-faq-a">{item.a}</div>}
          </li>
        ))}
      </ul>

      <div className="jl-faq-foot">
        <button
          type="button"
          className="jl-btn jl-btn-secondary jl-btn-sm"
          onClick={() => window.jlOpenGifts && window.jlOpenGifts()}
        >
          What you can give us 🎁
        </button>
      </div>
    </section>
  );
};

window.FAQ = FAQ;
