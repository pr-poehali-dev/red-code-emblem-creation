const ECG_PATH = "M0,60 L30,60 L45,60 L55,20 L65,100 L75,10 L85,90 L95,55 L110,55 L140,55 L155,55 L165,15 L175,105 L185,5 L195,95 L205,55 L220,55 L260,55";

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
        overflow: "hidden",
        position: "relative",
      }}
    >


      {/* Main emblem container */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0px",
        position: "relative",
        zIndex: 10,
      }}>
        {/* College name above emblem */}
        <div style={{
          fontSize: "18px",
          letterSpacing: "5px",
          color: "rgba(140,15,15,0.9)",
          fontFamily: "'Oswald', sans-serif",
          fontWeight: 600,
          textTransform: "uppercase",
          marginBottom: "20px",
          textAlign: "center",
        }}>
          ГОРЛОВСКИЙ МЕДИЦИНСКИЙ КОЛЛЕДЖ
        </div>

        {/* Emblem badge */}
        <div style={{
          position: "relative",
          width: "340px",
          height: "340px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {/* Outer ring */}
          <svg width="340" height="340" style={{ position: "absolute", top: 0, left: 0 }} viewBox="0 0 340 340">
            <defs>
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff1a1a" />
                <stop offset="50%" stopColor="#cc0000" />
                <stop offset="100%" stopColor="#880000" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <circle cx="170" cy="170" r="162" fill="none" stroke="rgba(220,30,30,0.15)" strokeWidth="1" />
            <circle cx="170" cy="170" r="158" fill="none" stroke="url(#ringGrad)" strokeWidth="2" filter="url(#glow)" />
            <circle cx="170" cy="170" r="152" fill="none" stroke="rgba(220,30,30,0.3)" strokeWidth="0.5" />

            {/* Tick marks */}
            {Array.from({ length: 60 }).map((_, i) => {
              const angle = (i * 360) / 60;
              const rad = (angle * Math.PI) / 180;
              const isMajor = i % 5 === 0;
              const r1 = isMajor ? 145 : 148;
              const r2 = 155;
              return (
                <line
                  key={i}
                  x1={170 + r1 * Math.cos(rad)}
                  y1={170 + r1 * Math.sin(rad)}
                  x2={170 + r2 * Math.cos(rad)}
                  y2={170 + r2 * Math.sin(rad)}
                  stroke={isMajor ? "rgba(220,30,30,0.8)" : "rgba(220,30,30,0.3)"}
                  strokeWidth={isMajor ? 2 : 0.8}
                />
              );
            })}

            <circle cx="170" cy="170" r="138" fill="#fff8f8" stroke="rgba(200,20,20,0.4)" strokeWidth="1.5" />
          </svg>

          {/* Heart + ECG SVG */}
          <svg
            width="260"
            height="240"
            viewBox="0 0 260 240"
            style={{ position: "relative", zIndex: 2, filter: "drop-shadow(0 0 20px rgba(220,30,30,0.6))" }}
          >
            <defs>
              <linearGradient id="heartGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#ff2020" />
                <stop offset="100%" stopColor="#990000" />
              </linearGradient>
              <clipPath id="heartClip">
                <path d="M130,200 C80,160 20,130 20,80 C20,45 45,20 80,20 C100,20 116,30 130,45 C144,30 160,20 180,20 C215,20 240,45 240,80 C240,130 180,160 130,200 Z" />
              </clipPath>
            </defs>

            {/* Heart shape */}
            <path
              d="M130,200 C80,160 20,130 20,80 C20,45 45,20 80,20 C100,20 116,30 130,45 C144,30 160,20 180,20 C215,20 240,45 240,80 C240,130 180,160 130,200 Z"
              fill="url(#heartGrad)"
              opacity="0.15"
            />
            <path
              d="M130,200 C80,160 20,130 20,80 C20,45 45,20 80,20 C100,20 116,30 130,45 C144,30 160,20 180,20 C215,20 240,45 240,80 C240,130 180,160 130,200 Z"
              fill="none"
              stroke="url(#heartGrad)"
              strokeWidth="2.5"
            />

            {/* ECG line inside heart — static */}
            <g clipPath="url(#heartClip)">
              <path
                d={ECG_PATH}
                fill="none"
                stroke="#ff2020"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(0, 55)"
                style={{ filter: "drop-shadow(0 0 6px #ff0000)" }}
              />
            </g>

            {/* Heart glow dots */}
            <circle cx="80" cy="38" r="4" fill="#ff3333" opacity="0.6" />
            <circle cx="180" cy="38" r="4" fill="#ff3333" opacity="0.6" />
          </svg>
        </div>

        {/* Title */}
        <div style={{
          marginTop: "28px",
          textAlign: "center",
        }}>
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