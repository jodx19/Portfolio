import React from "react";

const PortfolioLogo = ({ accent, accentSec, isDark }) => (
  <svg
    width="44"
    height="44"
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Mahmoud Al-Safi Logo"
  >
    {/* ── Background ── */}
    <rect width="44" height="44" rx="10" fill={isDark ? "#0a0f1a" : "#ffffff"} />

    {/* ── Outer frame lines (tech grid feel) ── */}
    <line x1="4" y1="4" x2="12" y2="4" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <line x1="4" y1="4" x2="4" y2="12" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <line x1="40" y1="4" x2="32" y2="4" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <line x1="40" y1="4" x2="40" y2="12" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <line x1="4" y1="40" x2="12" y2="40" stroke={accentSec} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <line x1="4" y1="40" x2="4" y2="32" stroke={accentSec} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <line x1="40" y1="40" x2="32" y2="40" stroke={accentSec} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <line x1="40" y1="40" x2="40" y2="32" stroke={accentSec} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />

    {/* ── Geometric M — bold angular strokes ── */}
    {/* Left vertical */}
    <line x1="9" y1="32" x2="9" y2="12" stroke={accent} strokeWidth="3.5" strokeLinecap="round" />
    {/* Left diagonal down */}
    <line x1="9" y1="12" x2="22" y2="24" stroke={accent} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Right diagonal up */}
    <line x1="22" y1="24" x2="35" y2="12" stroke={accent} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Right vertical */}
    <line x1="35" y1="12" x2="35" y2="32" stroke={accent} strokeWidth="3.5" strokeLinecap="round" />

    {/* ── Circuit nodes ── */}
    {/* Top-left node */}
    <circle cx="9" cy="12" r="2.5" fill={accent} />
    <circle cx="9" cy="12" r="4.5" fill={accent} opacity="0.18" />
    {/* Peak node */}
    <circle cx="22" cy="24" r="2" fill={accentSec} />
    <circle cx="22" cy="24" r="3.5" fill={accentSec} opacity="0.20" />
    {/* Top-right node */}
    <circle cx="35" cy="12" r="2.5" fill={accent} />
    <circle cx="35" cy="12" r="4.5" fill={accent} opacity="0.18" />
    {/* Bottom-left node */}
    <circle cx="9" cy="32" r="1.8" fill={accentSec} opacity="0.70" />
    {/* Bottom-right node */}
    <circle cx="35" cy="32" r="1.8" fill={accentSec} opacity="0.70" />

    {/* ── Glow definitions ── */}
    <defs>
      <filter id="glow-logo" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>

    {/* ── Center dot accent ── */}
    <circle cx="22" cy="36" r="1.5" fill={accent} opacity="0.55" />
  </svg>
);

export default PortfolioLogo;
