// FAQ.en.jsx — English accordion FAQ
const FAQ_ITEMS = [
  {
    q: 'Are children welcome?',
    a: 'Absolutely! There's a small play area in the garden and a babysitter on-site. Please let us know in your RSVP so we can plan accordingly.',
  },
  {
    q: 'Is there a gift registry or wish list?',
    a: 'Your presence is the greatest gift. If you'd still like to contribute: we're collecting towards our honeymoon in Puglia — you'll find the link in the footer below.',
  },
  {
    q: 'What's the weather like in late July at Lago di Garda?',
    a: 'Reliably warm — 28–32 °C during the day, mild around 22 °C in the evening. Sunglasses and a light wrap for later in the night are a good idea.',
  },
  {
    q: 'Can you help with hotel bookings?',
    a: 'Of course — just drop a quick email to hallo@lisa-und-julian.de and Lisa's mum Christina will sort it out (she's a travel agent).',
  },
  {
    q: 'When do we need to RSVP by?',
    a: 'By Sunday 1 May 2027. After that we submit the final guest list to catering and Villa Limone.',
  },
  {
    q: 'Are there dietary options at dinner?',
    a: 'Yes — vegan, vegetarian, and gluten-free are all possible. There's a field for this in the RSVP form and we'll pass everything on to the chef.',
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
    </section>
  );
};

window.FAQ = FAQ;
