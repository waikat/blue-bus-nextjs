"use client";

// WindCard.tsx — Apple weather widget style for the footer.
// Uses the same useLiveWind hook API as WindWidget.tsx in the header.

import { useLiveWind } from "@/hooks/useLiveWind";

const CYAN = "hsl(186,100%,42%)";
const CARD_BG = "rgba(255,255,255,0.07)";
const BORDER  = "1px solid rgba(255,255,255,0.10)";

// Convert compass text → degrees for the needle
const COMPASS_TO_DEG: Record<string, number> = {
  N: 0, NNE: 22.5, NE: 45, ENE: 67.5,
  E: 90, ESE: 112.5, SE: 135, SSE: 157.5,
  S: 180, SSW: 202.5, SW: 225, WSW: 247.5,
  W: 270, WNW: 292.5, NW: 315, NNW: 337.5,
};

function CompassNeedle({ direction }: { direction: string }) {
  const deg = COMPASS_TO_DEG[direction] ?? 0;
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" style={{ flexShrink: 0 }}>
      <circle cx="18" cy="18" r="17" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      {[0, 90, 180, 270].map(a => {
        const r = (a - 90) * Math.PI / 180;
        return <line key={a}
          x1={18 + 14 * Math.cos(r)} y1={18 + 14 * Math.sin(r)}
          x2={18 + 17 * Math.cos(r)} y2={18 + 17 * Math.sin(r)}
          stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />;
      })}
      <g transform={`rotate(${deg}, 18, 18)`}>
        <polygon points="18,5 16,18 20,18" fill={CYAN} opacity="0.9" />
        <polygon points="18,31 16,18 20,18" fill="rgba(255,255,255,0.22)" />
      </g>
      <circle cx="18" cy="18" r="2" fill="rgba(255,255,255,0.5)" />
    </svg>
  );
}

export function WindCard() {
  // Exact same destructuring as WindWidget.tsx — no guessing
  const { speed, gust, directionText, isLoading, error } = useLiveWind();

  // Loading
  if (isLoading) {
    return (
      <div style={{ background: CARD_BG, border: BORDER, padding: "18px 20px", minWidth: 180 }}>
        <p className="font-display font-black uppercase tracking-widest"
          style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", marginBottom: 6 }}>
          Atlantis Beach
        </p>
        <p className="font-body text-white" style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>
          Loading...
        </p>
      </div>
    );
  }

  // Offline / error — matches WindWidget error state
  if (error) {
    return (
      <div style={{ background: CARD_BG, border: BORDER, padding: "18px 20px", minWidth: 180 }}>
        <p className="font-display font-black uppercase tracking-widest"
          style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", marginBottom: 8 }}>
          Atlantis Beach
        </p>
        <div className="flex items-center gap-2">
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.30)", flexShrink: 0 }} />
          <p className="font-display font-black text-white uppercase"
            style={{ fontSize: 12, letterSpacing: "0.05em" }}>
            Wind Station Sleeping
          </p>
        </div>
      </div>
    );
  }

  // Live data
  return (
    <div style={{ background: CARD_BG, border: BORDER, padding: "18px 20px", minWidth: 200, maxWidth: 240 }}>

      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <p className="font-display font-black uppercase tracking-widest"
          style={{ fontSize: 10, color: "rgba(255,255,255,0.55)" }}>
          Atlantis Beach
        </p>
        <div className="flex items-center gap-1.5">
          <span style={{
            display: "inline-block", width: 7, height: 7, borderRadius: "50%",
            background: CYAN, animation: "kbb-pulse 2s infinite",
          }} />
          <p className="font-display font-black uppercase tracking-widest"
            style={{ fontSize: 9, color: CYAN }}>Live</p>
        </div>
      </div>

      {/* Speed + compass */}
      <div className="flex items-end gap-3 mb-2">
        <div>
          <span className="font-display font-black text-white leading-none"
            style={{ fontSize: 48, letterSpacing: "-0.04em" }}>
            {speed}
          </span>
          <span className="font-display font-black"
            style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", marginLeft: 3 }}>kts</span>
        </div>
        <CompassNeedle direction={directionText} />
      </div>

      {/* Direction text */}
      <p className="font-display font-black uppercase"
        style={{ fontSize: 13, color: CYAN, letterSpacing: "0.08em", marginBottom: 10 }}>
        {directionText}
      </p>

      {/* Gust */}
      {gust > speed + 3 && (
        <div>
          <p className="font-display font-black uppercase tracking-widest"
            style={{ fontSize: 9, color: "rgba(255,255,255,0.55)", marginBottom: 2 }}>Gust</p>
          <p className="font-display font-black text-white"
            style={{ fontSize: 16, letterSpacing: "-0.02em" }}>{gust} kts</p>
        </div>
      )}

      <style>{`
        @keyframes kbb-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.85); }
        }
      `}</style>
    </div>
  );
}
