"use client";

export function NavLogo() {
  return (
    <>
      <style>{`
        @keyframes nl_sq {
          0%,4%    { transform: scale(.6) }
          9%       { transform: scaleX(1.18) scaleY(.84) }
          13%      { transform: scaleX(.88) scaleY(1.12) }
          17%      { transform: scaleX(1.05) scaleY(.97) }
          21%,100% { transform: scaleX(1) scaleY(1) }
        }
        @keyframes nl_l1 {
          0%,21%   { stroke-dashoffset: 36 }
          32%,100% { stroke-dashoffset: 0 }
        }
        @keyframes nl_l2 {
          0%,28%   { stroke-dashoffset: 24 }
          39%,100% { stroke-dashoffset: 0 }
        }
        @keyframes nl_l3 {
          0%,35%   { stroke-dashoffset: 36 }
          46%,100% { stroke-dashoffset: 0 }
        }
        @keyframes nl_dot {
          0%,46%   { opacity:0; transform: scale(0) }
          54%      { opacity:1; transform: scale(1.3) }
          60%,100% { opacity:1; transform: scale(1) }
        }
        @keyframes nl_fade {
          0%,2%  { opacity:0 }
          8%     { opacity:1 }
          88%    { opacity:1 }
          100%   { opacity:0 }
        }
        .nl-wrap { animation: nl_fade 7s cubic-bezier(.16,1,.3,1) infinite; transform-origin:50% 50% }
        .nl-sq   { animation: nl_sq   7s cubic-bezier(.34,1.3,.5,1) infinite; transform-origin:50% 50% }
        .nl-l1   { animation: nl_l1   7s cubic-bezier(.65,0,.35,1)  infinite }
        .nl-l2   { animation: nl_l2   7s cubic-bezier(.65,0,.35,1)  infinite }
        .nl-l3   { animation: nl_l3   7s cubic-bezier(.65,0,.35,1)  infinite }
        .nl-dot  { animation: nl_dot  7s cubic-bezier(.16,1,.3,1)   infinite; transform-origin:53px 18px }
      `}</style>

      {/* Same outer size as original: w-9 h-9 (36×36) rounded-xl bg-brand */}
      <span className="nl-wrap w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "#875aa0" }}>
        <svg className="nl-sq" width="22" height="22" viewBox="0 0 64 64" fill="none"
             style={{ overflow: "visible" }}>
          <g stroke="#ffffff" strokeWidth="5.5" strokeLinecap="round" fill="none">
            <line className="nl-l1" x1="14" y1="18" x2="50" y2="18"
                  strokeDasharray="36" strokeDashoffset="36" />
            <line className="nl-l2" x1="14" y1="32" x2="38" y2="32"
                  strokeDasharray="24" strokeDashoffset="24" />
            <line className="nl-l3" x1="14" y1="46" x2="50" y2="46"
                  strokeDasharray="36" strokeDashoffset="36" />
          </g>
          <circle className="nl-dot" cx="53" cy="18" r="5" fill="#d3b87f" />
        </svg>
      </span>
    </>
  );
}
