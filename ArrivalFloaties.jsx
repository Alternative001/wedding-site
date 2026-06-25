// ArrivalFloaties.jsx — the little pool-float cast that drifts across the Friday
// arrival curve. Language-agnostic (aria-hidden), so it lives in one shared file
// and both Schedule.jsx (DE) and Schedule.en.jsx (EN) render <ArrivalFloaties/>.
//
// Each character is drawn once in a 100-unit "tile" space (matching the design
// mockups), then placed onto the SVG curve by a wrapper that:
//   1. rides the path via <animateMotion> (mpath -> #jlArrivalPath),
//   2. scales the tile down and re-centres it on its waterline (cx/cy),
//   3. bobs the body (.jl-bob) and trails a ripple wake (.jl-rip) behind it.
// Different durations + negative begins spread the cast out, so only 2–3 are
// crossing at any moment rather than all seven at once.

const Float = ({ dur, begin, cx, cy, bobDur, scale = 0.38, children }) => (
  <g>
    <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" rotate="0">
      <mpath href="#jlArrivalPath" />
    </animateMotion>
    <g transform={`scale(${scale}) translate(${-cx},${-cy})`}>
      <ellipse className="jl-rip" cx={cx - 16} cy={cy} rx="4" ry="2" fill="none" stroke="#1E47B5" strokeWidth="2.2" />
      <ellipse className="jl-rip jl-rip2" cx={cx - 16} cy={cy} rx="4" ry="2" fill="none" stroke="#1E47B5" strokeWidth="2.2" />
      <g className="jl-bob" style={{ animationDuration: `${bobDur}s` }}>{children}</g>
    </g>
  </g>
);

const ArrivalFloaties = () => (
  <g className="jl-arrival-floaties">
    {/* Golden swan — fastest, leads the pack */}
    <Float dur={15} begin={-2} cx={47} cy={59} bobDur={3.0}>
      <path d="M24,52 q-7,-2 -10,2 q6,2 10,3 Z" fill="#F4C842" stroke="#D89A05" strokeWidth="1.5" />
      <path d="M28,57 Q23,39 38,42 Q45,50 42,59 Z" fill="#F8D34A" stroke="#D89A05" strokeWidth="2" />
      <ellipse cx="47" cy="59" rx="25" ry="13" fill="#F4C842" stroke="#D89A05" strokeWidth="2.5" />
      <path d="M34,53 Q48,48 62,53" stroke="#FCE27A" strokeWidth="1.6" fill="none" />
      <circle cx="40" cy="62" r="1.4" fill="#D89A05" />
      <ellipse cx="45" cy="57" rx="9" ry="3.5" fill="#FBF7EC" />
      <path d="M61,55 C72,49 70,31 60,28 L56.5,29.5 C65,33 66,49 58,54 Z" fill="#F4C842" stroke="#D89A05" strokeWidth="1.6" />
      <circle cx="59" cy="27" r="5" fill="#F4C842" stroke="#D89A05" strokeWidth="1.6" />
      <path d="M55,27 L47,29 L55,30.5 Z" fill="#F2792B" />
      <circle cx="60" cy="26" r="1" fill="#0E2A6B" />
    </Float>

    {/* Sunglasses lounger */}
    <Float dur={19} begin={-9} cx={50} cy={58} bobDur={3.4}>
      <line x1="40" y1="55" x2="28" y2="50" stroke="#0E2A6B" strokeWidth="3" strokeLinecap="round" />
      <line x1="60" y1="55" x2="72" y2="50" stroke="#0E2A6B" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="50" cy="58" rx="26" ry="12" fill="#F8D34A" stroke="#1E47B5" strokeWidth="3" />
      <ellipse cx="50" cy="58" rx="12" ry="5" fill="#FBF7EC" />
      <circle cx="50" cy="45" r="8" fill="#0E2A6B" />
      <circle cx="46.5" cy="45" r="2.7" fill="#0A1B45" stroke="#6FA0E6" strokeWidth="1" />
      <circle cx="53.5" cy="45" r="2.7" fill="#0A1B45" stroke="#6FA0E6" strokeWidth="1" />
      <line x1="49.2" y1="45" x2="50.8" y2="45" stroke="#6FA0E6" strokeWidth="1" />
    </Float>

    {/* Flamingo float */}
    <Float dur={17} begin={-14} cx={48} cy={58} bobDur={3.1}>
      <path d="M28,55 q-8,-3 -13,1 q7,2 13,4 Z" fill="#EC9BB0" stroke="#C76A86" strokeWidth="1.5" />
      <ellipse cx="48" cy="58" rx="24" ry="11" fill="#EC9BB0" stroke="#C76A86" strokeWidth="2.5" />
      <ellipse cx="44" cy="57" rx="8" ry="3" fill="#FBF7EC" />
      <path d="M62,52 C70,46 68,33 59,30" fill="none" stroke="#EC9BB0" strokeWidth="6" strokeLinecap="round" />
      <circle cx="58" cy="28" r="5" fill="#EC9BB0" stroke="#C76A86" strokeWidth="1.5" />
      <path d="M54,28 L47,30 L54,32 Z" fill="#1E2A4D" />
      <circle cx="59" cy="27" r="1" fill="#1E2A4D" />
    </Float>

    {/* Lemon-slice ring — empty float, gives the eye a rest */}
    <Float dur={22} begin={-5} cx={50} cy={56} bobDur={3.6}>
      <ellipse cx="50" cy="56" rx="27" ry="12.5" fill="#F8D34A" stroke="#1E47B5" strokeWidth="3" />
      <ellipse cx="50" cy="56" rx="20" ry="8.5" fill="#FCE27A" />
      <ellipse cx="50" cy="56" rx="7" ry="3" fill="#FBF7EC" />
      <line x1="50" y1="56" x2="50" y2="47.5" stroke="#FBF7EC" strokeWidth="1.4" />
      <line x1="50" y1="56" x2="50" y2="64.5" stroke="#FBF7EC" strokeWidth="1.4" />
      <line x1="50" y1="56" x2="68" y2="56" stroke="#FBF7EC" strokeWidth="1.4" />
      <line x1="50" y1="56" x2="32" y2="56" stroke="#FBF7EC" strokeWidth="1.4" />
      <line x1="50" y1="56" x2="64" y2="50" stroke="#FBF7EC" strokeWidth="1.2" />
      <line x1="50" y1="56" x2="36" y2="50" stroke="#FBF7EC" strokeWidth="1.2" />
      <line x1="50" y1="56" x2="64" y2="62" stroke="#FBF7EC" strokeWidth="1.2" />
      <line x1="50" y1="56" x2="36" y2="62" stroke="#FBF7EC" strokeWidth="1.2" />
    </Float>

    {/* Lemon with shades — the little mascot */}
    <Float dur={18} begin={-16} cx={50} cy={60} bobDur={2.8}>
      <ellipse cx="50" cy="60" rx="26" ry="11" fill="#F8D34A" stroke="#1E47B5" strokeWidth="3" />
      <ellipse cx="50" cy="60" rx="11" ry="4.5" fill="#FBF7EC" />
      <ellipse cx="50" cy="44" rx="13" ry="11.5" fill="#F8D34A" stroke="#D89A05" strokeWidth="2" />
      <path d="M48,32.5 l1.5,-3.5 l1.5,3.5 Z" fill="#D89A05" />
      <path d="M58,34 q7,-4 9,1 q-5,1.5 -9,-1 Z" fill="#7FA05A" />
      <rect x="42" y="41" width="6" height="4.6" rx="2" fill="#1E47B5" />
      <rect x="52" y="41" width="6" height="4.6" rx="2" fill="#1E47B5" />
      <line x1="48" y1="43" x2="52" y2="43" stroke="#1E47B5" strokeWidth="1.5" />
      <path d="M45,49 q5,4 10,0" stroke="#D89A05" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </Float>

    {/* Rubber duck */}
    <Float dur={24} begin={-11} cx={48} cy={57} bobDur={3.3}>
      <path d="M28,55 l-8,-3 l3,7 Z" fill="#F8D34A" stroke="#D89A05" strokeWidth="1.5" />
      <ellipse cx="48" cy="57" rx="20" ry="12" fill="#F8D34A" stroke="#D89A05" strokeWidth="2" />
      <path d="M38,53 q9,-5 18,-1" stroke="#D89A05" strokeWidth="1.5" fill="none" />
      <circle cx="63" cy="44" r="9" fill="#F8D34A" stroke="#D89A05" strokeWidth="2" />
      <path d="M70,44 l9,-2 l-9,4 Z" fill="#F2792B" />
      <circle cx="64" cy="42" r="1.5" fill="#0E2A6B" />
    </Float>

    {/* Spritz floatie — slowest, brings up the rear */}
    <Float dur={26} begin={-20} cx={50} cy={60} bobDur={3.0}>
      <ellipse cx="50" cy="60" rx="26" ry="11" fill="#F8D34A" stroke="#1E47B5" strokeWidth="3" />
      <ellipse cx="50" cy="60" rx="11" ry="4.5" fill="#FBF7EC" />
      <path d="M41,59 Q41,45 50,43 Q59,45 59,59 Z" fill="#1E47B5" />
      <path d="M42,51 Q34,53 31,57" stroke="#1E47B5" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M57,50 Q66,46 70,38" stroke="#1E47B5" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="50" cy="37" r="7" fill="#0E2A6B" />
      <path d="M67,30 L75,30 L73.5,38 L68.5,38 Z" fill="#F2792B" stroke="#C24E1A" strokeWidth="1" />
      <line x1="67" y1="30" x2="75" y2="30" stroke="#FBD0B0" strokeWidth="1.4" />
      <line x1="73" y1="30" x2="76" y2="23" stroke="#0E2A6B" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="68" cy="29.5" r="2.6" fill="#F8D34A" stroke="#D89A05" strokeWidth="0.8" />
    </Float>
  </g>
);

window.ArrivalFloaties = ArrivalFloaties;
