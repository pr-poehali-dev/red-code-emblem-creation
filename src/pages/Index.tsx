const ECG_PATH = "M0,60 L30,60 L45,60 L55,20 L65,100 L75,10 L85,90 L95,55 L110,55 L140,55 L155,55 L165,15 L175,105 L185,5 L195,95 L205,55 L220,55 L260,55";

const Index = () => {
  const cx = 240;
  const cy = 240;
  const textR = 218;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Oswald', sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Main emblem container */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        zIndex: 10,
      }}>

        {/* Единый SVG: кольцо + текст по дуге + сердце */}
        <svg width="480" height="480" viewBox="0 0 480 480">
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff1a1a" />
              <stop offset="50%" stopColor="#cc0000" />
              <stop offset="100%" stopColor="#880000" />
            </linearGradient>
            <linearGradient id="heartGrad" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#ff2020" />
              <stop offset="100%" stopColor="#990000" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="heartGlow">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <clipPath id="heartClip">
              <path d="M130,195 C80,155 20,125 20,75 C20,40 45,15 80,15 C100,15 116,25 130,40 C144,25 160,15 180,15 C215,15 240,40 240,75 C240,125 180,155 130,195 Z" />
            </clipPath>
            {/* Дуга для текста — верхняя полуокружность */}
            <path
              id="topArc"
              d={`M ${cx - textR},${cy} A ${textR},${textR} 0 0,1 ${cx + textR},${cy}`}
            />
          </defs>

          {/* Внешние кольца */}
          <circle cx={cx} cy={cy} r="228" fill="none" stroke="rgba(220,30,30,0.1)" strokeWidth="1" />
          <circle cx={cx} cy={cy} r="222" fill="none" stroke="url(#ringGrad)" strokeWidth="2.5" filter="url(#glow)" />
          <circle cx={cx} cy={cy} r="215" fill="none" stroke="rgba(220,30,30,0.25)" strokeWidth="0.5" />

          {/* Текст по верхней дуге */}
          <text
            fontFamily="'Oswald', sans-serif"
            fontSize="21"
            fontWeight="700"
            letterSpacing="5"
            fill="rgba(140,15,15,0.9)"
            textAnchor="middle"
          >
            <textPath href="#topArc" startOffset="50%">
              ГОРЛОВСКИЙ МЕДИЦИНСКИЙ КОЛЛЕДЖ
            </textPath>
          </text>

          {/* Деления на кольце */}
          {Array.from({ length: 60 }).map((_, i) => {
            const angle = (i * 360) / 60;
            const rad = (angle * Math.PI) / 180;
            const isMajor = i % 5 === 0;
            const r1 = isMajor ? 205 : 208;
            const r2 = 215;
            return (
              <line
                key={i}
                x1={cx + r1 * Math.cos(rad)}
                y1={cy + r1 * Math.sin(rad)}
                x2={cx + r2 * Math.cos(rad)}
                y2={cy + r2 * Math.sin(rad)}
                stroke={isMajor ? "rgba(220,30,30,0.8)" : "rgba(220,30,30,0.3)"}
                strokeWidth={isMajor ? 2 : 0.8}
              />
            );
          })}

          {/* Внутренний круг эмблемы */}
          <circle cx={cx} cy={cy} r="196" fill="#fff8f8" stroke="rgba(200,20,20,0.35)" strokeWidth="1.5" />

          {/* Сердце + ЭКГ — смещено в центр SVG */}
          <g transform={`translate(${cx - 130}, ${cy - 110})`} filter="url(#heartGlow)">
            <path
              d="M130,195 C80,155 20,125 20,75 C20,40 45,15 80,15 C100,15 116,25 130,40 C144,25 160,15 180,15 C215,15 240,40 240,75 C240,125 180,155 130,195 Z"
              fill="url(#heartGrad)"
              opacity="0.15"
            />
            <path
              d="M130,195 C80,155 20,125 20,75 C20,40 45,15 80,15 C100,15 116,25 130,40 C144,25 160,15 180,15 C215,15 240,40 240,75 C240,125 180,155 130,195 Z"
              fill="none"
              stroke="url(#heartGrad)"
              strokeWidth="2.5"
            />
            <g clipPath="url(#heartClip)">
              <path
                d={ECG_PATH}
                fill="none"
                stroke="#ff2020"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(0, 50)"
                style={{ filter: "drop-shadow(0 0 6px #ff0000)" }}
              />
            </g>
            <circle cx="80" cy="33" r="4" fill="#ff3333" opacity="0.6" />
            <circle cx="180" cy="33" r="4" fill="#ff3333" opacity="0.6" />
          </g>
        </svg>

        {/* Надпись КОД КРАСНЫЙ — без изменений */}
        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}>
            <div style={{ height: "1px", width: "60px", background: "linear-gradient(to right, transparent, rgba(220,30,30,0.6))" }} />
            <h1 style={{
              fontSize: "52px",
              fontWeight: 700,
              letterSpacing: "6px",
              background: "linear-gradient(135deg, #ff3333 0%, #ff6666 40%, #cc0000 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              margin: 0,
              textTransform: "uppercase",
              lineHeight: 1,
              filter: "drop-shadow(0 0 20px rgba(220,30,30,0.4))",
            }}>
              КОД
            </h1>
            <div style={{ height: "1px", width: "60px", background: "linear-gradient(to left, transparent, rgba(220,30,30,0.6))" }} />
          </div>

          <h2 style={{
            fontSize: "52px",
            fontWeight: 700,
            letterSpacing: "6px",
            background: "linear-gradient(135deg, #cc0000 0%, #ff2020 60%, #990000 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            margin: "0 0 12px",
            textTransform: "uppercase",
            lineHeight: 1,
          }}>
            КРАСНЫЙ
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Index;
