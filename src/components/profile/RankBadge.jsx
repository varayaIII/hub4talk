export default function RankBadge({ label, color = "#E0C3A4" }) {
  // color base → generamos variantes para el degradado
  const cMain = color;           // p.ej. #E0C3A4
  const cDark = "#8f7556";       // sombra cálida
  const cLight = "#f1dfc9";      // brillo
  const glow  = `${cMain}55`;    // glow suave

  return (
    <div className="flex flex-col items-center">
      {/* medallón SVG */}
      <div className="relative">
        <svg width="72" height="72" viewBox="0 0 72 72">
          <defs>
            <radialGradient id="rg" cx="50%" cy="40%">
              <stop offset="0%" stopColor={cLight}/>
              <stop offset="60%" stopColor={cMain}/>
              <stop offset="100%" stopColor={cDark}/>
            </radialGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* halo */}
          <circle cx="36" cy="36" r="28" fill={glow} />

          {/* medalla */}
          <circle cx="36" cy="36" r="24" fill="url(#rg)" stroke={cLight} strokeWidth="1.5" filter="url(#glow)"/>

          {/* estrella central simple */}
          <g transform="translate(36,36)">
            <polygon
              points="0,-10 2.9,-3.1 9.5,-3.1 4,1.2 6,8 -0,4.2 -6,8 -4,1.2 -9.5,-3.1 -2.9,-3.1"
              fill="#1b1f23"
              opacity="0.2"
            />
          </g>

          {/* cinta inferior */}
          <path
            d="M16,52 C26,56 46,56 56,52 L56,60 L46,56 L36,60 L26,56 L16,60 Z"
            fill={cMain}
            opacity="0.9"
          />
          <path
            d="M16,52 C26,56 46,56 56,52"
            stroke={cLight}
            strokeWidth="1"
            fill="none"
            opacity="0.7"
          />
        </svg>
      </div>

      {/* texto del rango debajo */}
      <span className="mt-2 text-xs font-semibold" style={{ color: cMain }}>
        {label}
      </span>
    </div>
  );
}
