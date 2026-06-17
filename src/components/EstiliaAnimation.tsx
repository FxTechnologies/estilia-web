export function EstiliaAnimation() {
  return (
    <>
      <style>{`
        @keyframes est_group {
          0%   { opacity: 0 }
          3%   { opacity: 1 }
          86%  { opacity: 1 }
          100% { opacity: 0 }
        }
        @keyframes est_zoom {
          0%   { transform: scale(.985) }
          100% { transform: scale(1.05) }
        }
        @keyframes est_glow {
          0%   { opacity: 0 }
          38%  { opacity: .35 }
          64%  { opacity: .9 }
          82%  { opacity: .6 }
          100% { opacity: 0 }
        }
        @keyframes est_sq {
          0%,4%         { opacity: 0; transform: scale(.55) }
          9%            { opacity: 1; transform: scaleX(1.22) scaleY(.8) }
          13%           { transform: scaleX(.86) scaleY(1.16) }
          17%           { transform: scaleX(1.07) scaleY(.95) }
          21%,100%      { transform: scaleX(1) scaleY(1) }
        }
        @keyframes est_l1 {
          0%,21%  { stroke-dashoffset: 23 }
          30%,100%{ stroke-dashoffset: 0 }
        }
        @keyframes est_l2 {
          0%,27%  { stroke-dashoffset: 16 }
          36%,100%{ stroke-dashoffset: 0 }
        }
        @keyframes est_l3 {
          0%,33%  { stroke-dashoffset: 23 }
          42%,100%{ stroke-dashoffset: 0 }
        }
        @keyframes est_dot {
          0%,42%   { opacity: 0; transform: scale(0) }
          49%      { opacity: 1; transform: scale(1.25) }
          54%,100% { opacity: 1; transform: scale(1) }
        }
        @keyframes est_word {
          0%,50%   { clip-path: inset(0 100% 0 0); transform: translateY(10px) }
          57%      { transform: translateY(0) }
          70%,100% { clip-path: inset(0 0% 0 0); transform: translateY(0) }
        }
        @keyframes est_shine {
          0%,60%   { background-position: 135% 0 }
          75%,100% { background-position: -35% 0 }
        }
        @keyframes est_spkA {
          0%,44%  { opacity: 0; transform: scale(0) rotate(0deg) }
          51%     { opacity: 1; transform: scale(1) rotate(45deg) }
          62%     { opacity: 0; transform: scale(.3) rotate(90deg) }
          100%    { opacity: 0 }
        }
        @keyframes est_spkB {
          0%,52%  { opacity: 0; transform: scale(0) rotate(0deg) }
          60%     { opacity: 1; transform: scale(1) rotate(50deg) }
          72%     { opacity: 0; transform: scale(.3) rotate(95deg) }
          100%    { opacity: 0 }
        }
        @keyframes est_spkC {
          0%,66%  { opacity: 0; transform: scale(0) rotate(0deg) }
          73%     { opacity: .9; transform: scale(1) rotate(45deg) }
          84%     { opacity: 0; transform: scale(.3) rotate(90deg) }
          100%    { opacity: 0 }
        }

        .est-group  { animation: est_group 7s cubic-bezier(.16,1,.3,1) infinite }
        .est-zoom   { animation: est_zoom  7s ease-in-out infinite; transform-origin: 50% 50% }
        .est-glow   { animation: est_glow  7s cubic-bezier(.16,1,.3,1) infinite }
        .est-sq     { animation: est_sq    7s cubic-bezier(.34,1.3,.5,1) infinite; transform-origin: 50% 50% }
        .est-l1     { animation: est_l1    7s cubic-bezier(.65,0,.35,1) infinite }
        .est-l2     { animation: est_l2    7s cubic-bezier(.65,0,.35,1) infinite }
        .est-l3     { animation: est_l3    7s cubic-bezier(.65,0,.35,1) infinite }
        .est-dot    { animation: est_dot   7s cubic-bezier(.16,1,.3,1) infinite; transform-origin: 46.5px 21px }
        .est-word   { animation: est_word  7s cubic-bezier(.16,1,.3,1) infinite, est_shine 7s linear infinite }
        .est-spkA   { animation: est_spkA  7s ease-out infinite; transform-origin: 50% 50% }
        .est-spkB   { animation: est_spkB  7s ease-out infinite; transform-origin: 50% 50% }
        .est-spkC   { animation: est_spkC  7s ease-out infinite; transform-origin: 50% 50% }
      `}</style>

      <div style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        minHeight: 380,
        borderRadius: 32,
        background: "radial-gradient(ellipse 80% 80% at 50% 48%, #f0e6f9 0%, #faf7fc 55%, #f4eff9 100%)",
        overflow: "hidden",
      }}>
        {/* Glow blob */}
        <div className="est-glow" style={{
          position: "absolute",
          width: 420, height: 420,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(135,90,160,0.22) 0%, rgba(194,161,92,0.10) 40%, transparent 68%)",
          filter: "blur(6px)",
          pointerEvents: "none",
        }} />

        {/* Animated lockup */}
        <div className="est-group" style={{ position: "relative" }}>
          <div className="est-zoom" style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            transformOrigin: "50% 50%",
          }}>

            {/* Imagotipo SVG */}
            <svg
              className="est-sq"
              width="130" height="130"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ overflow: "visible" }}
            >
              <rect x={2} y={2} width={60} height={60} rx={19} fill="#875aa0" />
              <g stroke="#ffffff" strokeWidth={3.6} strokeLinecap="round" fill="none">
                <line className="est-l1" x1={21} y1={21} x2={43} y2={21}
                      strokeDasharray={23} strokeDashoffset={23} />
                <line className="est-l2" x1={21} y1={32} x2={36} y2={32}
                      strokeDasharray={16} strokeDashoffset={16} />
                <line className="est-l3" x1={21} y1={43} x2={43} y2={43}
                      strokeDasharray={23} strokeDashoffset={23} />
              </g>
              <circle className="est-dot" cx={46.5} cy={21} r={3} fill="#d3b87f" />
            </svg>

            {/* Wordmark + sparkles */}
            <div style={{ position: "relative" }}>
              {/* Sparkle A — top right */}
              <svg className="est-spkA" viewBox="0 0 24 24" width={26} height={26}
                   style={{ position: "absolute", top: -20, right: -22 }}>
                <path d="M12 0 C13 7 17 11 24 12 C17 13 13 17 12 24 C11 17 7 13 0 12 C7 11 11 7 12 0 Z"
                      fill="#c2a15c" />
              </svg>
              {/* Sparkle C — top left */}
              <svg className="est-spkC" viewBox="0 0 24 24" width={17} height={17}
                   style={{ position: "absolute", top: -10, left: 30 }}>
                <path d="M12 0 C13 7 17 11 24 12 C17 13 13 17 12 24 C11 17 7 13 0 12 C7 11 11 7 12 0 Z"
                      fill="#c2a15c" />
              </svg>

              <div className="est-word" style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 600,
                fontSize: 88,
                lineHeight: 1,
                letterSpacing: "0.5px",
                background: "linear-gradient(100deg,#1c1622 0%,#1c1622 38%,#e7ca7f 48%,#c2a15c 51%,#1c1622 60%,#1c1622 100%)",
                backgroundSize: "300% 100%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}>
                Estilia
              </div>

              {/* Sparkle B — bottom */}
              <svg className="est-spkB" viewBox="0 0 24 24" width={15} height={15}
                   style={{ position: "absolute", bottom: 0, right: 28 }}>
                <path d="M12 0 C13 7 17 11 24 12 C17 13 13 17 12 24 C11 17 7 13 0 12 C7 11 11 7 12 0 Z"
                      fill="#d3b87f" />
              </svg>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
