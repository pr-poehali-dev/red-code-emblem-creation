import { useEffect, useRef, useState } from "react";

const ECG_PATH = "M0,60 L30,60 L45,60 L55,20 L65,100 L75,10 L85,90 L95,55 L110,55 L140,55 L155,55 L165,15 L175,105 L185,5 L195,95 L205,55 L220,55 L260,55";

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const [pulse, setPulse] = useState(false);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    const interval = setInterval(() => {
      setPulse(p => !p);
    }, 1200);
    return () => {
      clearTimeout(t);
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 50% 30%, #1a0000 0%, #0a0000 60%, #000 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Oswald', sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background grid */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "linear-gradient(rgba(220,30,30,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(220,30,30,0.04) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        pointerEvents: "none",
      }} />

      {/* Glow blob */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "600px",
        height: "600px",
        background: "radial-gradient(circle, rgba(220,30,30,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
        animation: "glowPulse 2.4s ease-in-out infinite",
      }} />

      {/* Main emblem container */}
      <div
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
          transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0px",
          position: "relative",
          zIndex: 10,
        }}
      >
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
              <filter id="glowStrong">
                <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Outer decorative ring */}
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

            {/* Inner dark circle */}
            <circle cx="170" cy="170" r="138" fill="#0d0000" stroke="rgba(200,20,20,0.4)" strokeWidth="1.5" />
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

            {/* ECG line inside heart */}
            <g clipPath="url(#heartClip)">
              <path
                ref={pathRef}
                d={ECG_PATH}
                fill="none"
                stroke="#ff2020"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(0, 55)"
                style={{
                  filter: "drop-shadow(0 0 6px #ff0000)",
                  strokeDasharray: 600,
                  strokeDashoffset: 0,
                  animation: "ecgDraw 1.2s linear infinite",
                }}
              />
            </g>

            {/* Heart glow dots at top curves */}
            <circle cx="80" cy="38" r="4" fill="#ff3333" opacity="0.6" style={{ animation: "blip 1.2s ease-in-out infinite" }} />
            <circle cx="180" cy="38" r="4" fill="#ff3333" opacity="0.6" style={{ animation: "blip 1.2s ease-in-out infinite 0.2s" }} />
          </svg>
        </div>

        {/* Cross icon below emblem circle - medical cross */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) translateY(-90px)",
          opacity: 0.06,
          zIndex: 1,
        }}>
          <svg width="80" height="80" viewBox="0 0 80 80">
            <rect x="30" y="0" width="20" height="80" fill="#ff2020" rx="4" />
            <rect x="0" y="30" width="80" height="20" fill="#ff2020" rx="4" />
          </svg>
        </div>

        {/* Title */}
        <div style={{
          marginTop: "28px",
          textAlign: "center",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "all 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
        }}>
          <div style={{
            fontSize: "13px",
            letterSpacing: "8px",
            color: "rgba(220,50,50,0.7)",
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 600,
            textTransform: "uppercase",
            marginBottom: "8px",
          }}>
            МЕДИЦИНСКАЯ СЛУЖБА
          </div>

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
            background: "linear-gradient(135deg, #ffffff 0%, #ffaaaa 60%, #ff3333 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            margin: "0 0 12px",
            textTransform: "uppercase",
            lineHeight: 1,
          }}>
            КРАСНЫЙ
          </h2>

          <div style={{
            fontSize: "11px",
            letterSpacing: "4px",
            color: "rgba(180,180,180,0.4)",
            fontFamily: "'Rajdhani', sans-serif",
            textTransform: "uppercase",
          }}>
            CODE RED · EMERGENCY RESPONSE
          </div>
        </div>

        {/* Status indicator */}
        <div style={{
          marginTop: "36px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          opacity: mounted ? 1 : 0,
          transition: "opacity 1.2s ease 0.6s",
        }}>
          <div style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#ff2020",
            animation: "statusBlink 1.2s ease-in-out infinite",
            boxShadow: "0 0 12px #ff2020, 0 0 4px #ff2020",
          }} />
          <span style={{
            fontSize: "11px",
            letterSpacing: "4px",
            color: "rgba(255,50,50,0.6)",
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 600,
            textTransform: "uppercase",
          }}>
            СИСТЕМА АКТИВНА
          </span>
          <div style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#ff2020",
            animation: "statusBlink 1.2s ease-in-out infinite 0.6s",
            boxShadow: "0 0 12px #ff2020, 0 0 4px #ff2020",
          }} />
        </div>
      </div>

      <style>{`
        @keyframes ecgDraw {
          0% { stroke-dashoffset: 600; opacity: 1; }
          70% { stroke-dashoffset: 0; opacity: 1; }
          85% { stroke-dashoffset: 0; opacity: 0.8; }
          100% { stroke-dashoffset: -600; opacity: 0; }
        }
        @keyframes glowPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.7; }
        }
        @keyframes statusBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        @keyframes blip {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }
      `}</style>
    </div>
  );
};

export default Index;
