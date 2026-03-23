const ECG_PATH = "M0,0 L15,0 L22,-18 L30,18 L38,-22 L46,16 L52,0 L70,0";

const Index = () => {
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
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>

        {/* Надпись над эмблемой */}
        <div style={{
          fontSize: "18px",
          letterSpacing: "5px",
          color: "rgba(140,15,15,0.9)",
          fontWeight: 600,
          textTransform: "uppercase",
          textAlign: "center",
        }}>
          ГОРЛОВСКИЙ МЕДИЦИНСКИЙ КОЛЛЕДЖ
        </div>

        {/* Эмблема */}
        <svg width="340" height="340" viewBox="0 0 340 340">
          <defs>
            <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff2020" />
              <stop offset="100%" stopColor="#8b0000" />
            </linearGradient>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#cc0000" />
              <stop offset="50%" stopColor="#ff3333" />
              <stop offset="100%" stopColor="#880000" />
            </linearGradient>
            <filter id="shadow">
              <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor="rgba(180,0,0,0.25)" />
            </filter>
            {/* Дуга для надписи по кругу */}
            <path id="outerArc" d="M 20,170 A 150,150 0 0,1 320,170" />
            <path id="outerArcBottom" d="M 320,170 A 150,150 0 0,1 20,170" />
          </defs>

          {/* Внешнее кольцо — толстое, с градиентом */}
          <circle cx="170" cy="170" r="158" fill="none" stroke="url(#ringGrad)" strokeWidth="18" filter="url(#shadow)" />

          {/* Тонкое кольцо внутри толстого */}
          <circle cx="170" cy="170" r="147" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
          <circle cx="170" cy="170" r="168" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />

          {/* Внутренний белый круг */}
          <circle cx="170" cy="170" r="132" fill="#ffffff" stroke="rgba(180,0,0,0.15)" strokeWidth="1" />

          {/* Крест — вертикальная перекладина */}
          <rect x="154" y="72" width="32" height="196" rx="8" fill="url(#redGrad)" opacity="0.9" />
          {/* Крест — горизонтальная перекладина */}
          <rect x="72" y="154" width="196" height="32" rx="8" fill="url(#redGrad)" opacity="0.9" />

          {/* ЭКГ поверх пересечения */}
          <g transform="translate(100, 162)">
            <path
              d={ECG_PATH}
              fill="none"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* Маленький круг в центре */}
          <circle cx="170" cy="170" r="10" fill="#ffffff" stroke="url(#redGrad)" strokeWidth="3" />

          {/* Точки на концах креста */}
          <circle cx="170" cy="80" r="5" fill="#cc0000" />
          <circle cx="170" cy="260" r="5" fill="#cc0000" />
          <circle cx="80" cy="170" r="5" fill="#cc0000" />
          <circle cx="260" cy="170" r="5" fill="#cc0000" />
        </svg>

        {/* КОД КРАСНЫЙ */}
        <div style={{ textAlign: "center", marginTop: "-8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
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
            margin: "0 0 0",
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
