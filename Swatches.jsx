// Swatches.jsx — dress-code colours shown as little drinks instead of plain dots.
// Shared by Schedule.jsx (DE) and Schedule.en.jsx (EN). Each colour is poured into
// one of three glasses — coupe, wine glass, spritz tumbler — cycling along the
// palette so a row of colours reads like a row of aperitivi on the table.
const DRINK_INK = '#0E2A6B';

// A swatch can ask for a specific glass (e.g. glass: 'flute' for Champagne);
// otherwise the shapes cycle coupe → wine glass → tumbler along the palette.
const DRINK_KINDS = { coupe: 0, wine: 1, tumbler: 2, flute: 3 };

const DrinkSwatch = ({ hex, index, glass }) => {
  const kind = glass in DRINK_KINDS ? DRINK_KINDS[glass] : index % 3;
  const clip = `jl-drink-${kind}-${index}-${String(hex).replace('#', '')}`;

  // glass outline (also used as the clip shape for the liquid) + fill line
  const shape =
    kind === 0 ? { glass: 'M6 10 H34 Q32.4 26.4 20 27.2 Q7.6 26.4 6 10 Z', fill: 13.5 } // coupe
    : kind === 1 ? { glass: 'M11 4 Q8.6 23 20 28 Q31.4 23 29 4 Z', fill: 12.5 }         // wine glass
    : kind === 3 ? { glass: 'M15 2.5 H25 Q25.8 22 20 31 Q14.2 22 15 2.5 Z', fill: 7.5 } // champagne flute
    : { glass: 'M9 8 H31 L29.2 47 H10.8 Z', fill: 16 };                                    // tumbler
  const stemTop = kind === 0 ? 27.2 : kind === 3 ? 31 : 28;

  return (
    <svg className="jl-drink" viewBox="0 0 40 54" aria-hidden="true">
      <defs>
        <clipPath id={clip}><path d={shape.glass} /></clipPath>
      </defs>

      {/* empty glass tint, then the drink, clipped to the glass */}
      <path d={shape.glass} fill="rgba(255,255,255,0.45)" />
      <g clipPath={`url(#${clip})`}>
        <rect x="0" y={shape.fill} width="40" height="54" fill={hex} />
        <rect x="0" y={shape.fill} width="40" height="1.6" fill="#fff" opacity="0.45" />
        {kind === 0 && <>
          <circle cx="15" cy="18.5" r="0.9" fill="#fff" opacity="0.85" />
          <circle cx="24.5" cy="21" r="0.75" fill="#fff" opacity="0.85" />
          <circle cx="20" cy="16.8" r="0.6" fill="#fff" opacity="0.85" />
        </>}
        {kind === 3 && <>
          <circle cx="19.2" cy="25" r="0.75" fill="#fff" opacity="0.9" />
          <circle cx="20.6" cy="20.5" r="0.7" fill="#fff" opacity="0.9" />
          <circle cx="19.4" cy="16" r="0.65" fill="#fff" opacity="0.9" />
          <circle cx="20.8" cy="11.8" r="0.6" fill="#fff" opacity="0.9" />
        </>}
        {kind === 2 && <>
          <rect x="13" y="20" width="6.5" height="6.5" rx="1.4" fill="#fff" opacity="0.5" transform="rotate(-12 16 23)" />
          <rect x="20" y="27" width="6" height="6" rx="1.3" fill="#fff" opacity="0.45" transform="rotate(10 23 30)" />
        </>}
      </g>

      {/* glass outline + a little shine */}
      <path d={shape.glass} fill="none" stroke={DRINK_INK} strokeWidth="1.3" strokeLinejoin="round" />
      {kind === 0 && <path d="M10 13.5 Q11 19 14.5 22.2" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.75" />}
      {kind === 1 && <path d="M13.2 8 Q12 17 15 22.5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.75" />}
      {kind === 2 && <path d="M12.4 12 L13.6 42" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.7" />}
      {kind === 3 && <path d="M16.9 5.5 Q16.7 17 18.6 25" stroke="#fff" strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.8" />}

      {/* stem + foot (coupe, wine, flute) or straw + lemon (tumbler) */}
      {kind !== 2 && <>
        <line x1="20" y1={stemTop} x2="20" y2="46" stroke={DRINK_INK} strokeWidth="1.3" />
        <ellipse cx="20" cy="47.4" rx="8" ry="2" fill="rgba(255,255,255,0.6)" stroke={DRINK_INK} strokeWidth="1.3" />
      </>}
      {kind === 2 && <>
        <line x1="25.5" y1="1.5" x2="21.5" y2="40" stroke={DRINK_INK} strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="31" cy="9" r="4.2" fill="#F8D34A" stroke="#D89A05" strokeWidth="1" />
        <path d="M31 4.8 V13.2 M26.8 9 H35.2" stroke="#fff" strokeWidth="0.8" opacity="0.8" />
      </>}
    </svg>
  );
};

window.DrinkSwatch = DrinkSwatch;
