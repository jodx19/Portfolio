/**
 * useThemeColors — Central theme-aware color token hook
 *
 * Dark  → Cyberpunk Cyan  (#22d3ee / #2563eb)
 * Light → Professional Warm Amber (#B45309 / #92400E)
 *         Background: #F5F3EF (warm parchment — ALL sections unified)
 *         Cards: #FFFFFF (white elevates above parchment)
 */

import { useTheme } from "../context/ThemeContext";

export default function useThemeColors() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return {
    isDark,

    // ── Core accents ─────────────────────────────────────────────────────
    // Light: amber-800 (#92400E) — improved contrast for WCAG compliance
    accent:       isDark ? "#22d3ee" : "#92400E",
    accentSec:    isDark ? "#2563eb" : "#78350F",
    accentRgh:    isDark ? "34, 211, 238"  : "146, 64, 14",    // for rgba()
    accentSecRgb: isDark ? "37, 99, 235"   : "120, 53, 15",

    // ── Backgrounds / Navigation ─────────────────────────────────────────
    // Light: warm bright white nav that feels airy, not heavy
    navBg:       isDark ? "rgba(10, 15, 26, 0.85)"  : "rgba(255, 255, 255, 0.90)",
    navBgTrans:  isDark ? "rgba(10, 15, 26, 0.55)"  : "rgba(255, 255, 255, 0.65)",
    navBorder:   isDark ? "rgba(34, 211, 238, 0.12)": "rgba(180, 83, 9, 0.08)",
    mobileNavBg: isDark ? "rgba(10, 15, 26, 0.97)"  : "rgba(245, 243, 239, 0.99)",

    // ── Cards ─────────────────────────────────────────────────────────────
    // Light: enhanced glassmorphism with 85% opacity + amber-tinted border
    cardBg:       isDark ? "rgba(15, 23, 42, 0.80)"  : "rgba(255, 255, 255, 0.85)",
    cardBgDeep:   isDark ? "rgba(15, 23, 42, 0.90)"  : "rgba(255, 255, 255, 0.95)",
    cardBorder:   isDark ? "rgba(255,255,255,0.12)"  : "rgba(146, 64, 14, 0.10)",
    cardHoverBorder: isDark ? "rgba(34,211,238,0.55)": "rgba(146, 64, 14, 0.40)",
    cardHoverBg:  isDark ? "rgba(15, 23, 42, 0.85)"  : "rgba(255, 255, 255, 0.95)",

    // Enhanced drop shadow with amber tint for light mode
    cardHoverShadow: isDark
      ? "0 0 30px rgba(34,211,238,0.20), 0 0 60px rgba(34,211,238,0.10), 0 20px 40px rgba(0,0,0,0.40)"
      : "0 20px 48px rgba(146,83,9,0.12), 0 8px 16px rgba(0,0,0,0.06)",

    // ── Footer ────────────────────────────────────────────────────────────
    footerBg:     isDark ? "rgba(10, 15, 26, 0.88)"  : "rgba(240, 237, 231, 1.00)",
    footerBorder: isDark ? "rgba(34, 211, 238, 0.10)": "rgba(28, 25, 23, 0.10)",

    // ── Ambient orbs ─────────────────────────────────────────────────────
    // Light: very faint warm tint — barely visible, just atmospheric
    orbPrimary:   isDark ? "rgba(34, 211, 238, 0.12)": "rgba(180, 83, 9, 0.05)",
    orbSecondary: isDark ? "rgba(37, 99, 235, 0.10)" : "rgba(146, 64, 14, 0.04)",

    // ── Icon containers ───────────────────────────────────────────────────
    // Light: enhanced warm-tinted background for better glass effect
    iconBg:     isDark ? "rgba(34, 211, 238, 0.08)" : "rgba(254, 250, 244, 1.00)",
    iconBorder: isDark ? "rgba(34, 211, 238, 0.20)" : "rgba(146, 64, 14, 0.15)",
    iconColor:  isDark ? "#22d3ee"                 : "#92400E",

    // ── Gradients ─────────────────────────────────────────────────────────
    primaryGradient: isDark
      ? "linear-gradient(135deg, #22d3ee 0%, #2563eb 100%)"
      : "linear-gradient(135deg, #92400E 0%, #78350F 100%)",

    logoBg: isDark
      ? "linear-gradient(135deg, rgba(34,211,238,0.15), rgba(37,99,235,0.15))"
      : "linear-gradient(135deg, rgba(254,243,199,0.80), rgba(253,230,138,0.50))",   // amber-100→200

    logoBorder: isDark ? "rgba(34,211,238,0.30)": "rgba(146, 64, 14, 0.30)",

    heroBtnShadow: isDark
      ? "0 4px 20px rgba(34,211,238,0.30)"
      : "0 8px 24px rgba(146,83,9,0.25)",
    heroBtnHoverShadow: isDark
      ? "0 0 20px #22d3ee, 0 0 40px rgba(6,182,212,0.47)"
      : "0 12px 32px rgba(146,83,9,0.35), 0 4px 12px rgba(146,83,9,0.20)",

    // ── Social / misc hover ───────────────────────────────────────────────
    socialHoverBorder: isDark ? "#22d3ee"               : "#92400E",
    socialHoverShadow: isDark
      ? "0 0 15px rgba(34,211,238,0.30)"
      : "0 4px 12px rgba(146,83,9,0.20)",

    // ── Glow line at card bottom ──────────────────────────────────────────
    glowLine: isDark
      ? "linear-gradient(90deg, transparent, #22d3ee, transparent)"
      : "linear-gradient(90deg, transparent, rgba(146,83,9,0.50), transparent)",

    // ── ScrollToTop button ────────────────────────────────────────────────
    scrollBtnBg:     isDark ? "rgba(15, 23, 42, 0.85)"  : "rgba(255, 255, 255, 0.95)",
    scrollBtnBorder: isDark ? "rgba(34,211,238,0.30)"   : "rgba(146, 64, 14, 0.30)",
    scrollBtnHoverShadow: isDark
      ? "0 0 15px #22d3ee, 0 0 30px rgba(34,211,238,0.40)"
      : "0 4px 16px rgba(146,83,9,0.28)",

    // ── Input focus ring ──────────────────────────────────────────────────
    inputFocusBorder: isDark ? "#22d3ee"  : "#92400E",
    inputFocusShadow: isDark
      ? "0 0 0 3px rgba(34,211,238,0.15), 0 0 10px rgba(34,211,238,0.30)"
      : "0 0 0 3px rgba(146,83,9,0.15),   0 0 8px  rgba(146,83,9,0.12)",

    // ── Timeline (Journey) ────────────────────────────────────────────────
    timelineEduGrad:    isDark
      ? "linear-gradient(180deg, #22d3ee, transparent)"
      : "linear-gradient(180deg, #92400E, transparent)",
    timelineEduBorder:  isDark ? "rgba(34,211,238,0.20)": "rgba(146, 64, 14, 0.16)",
    timelineEduDot:     isDark ? "#22d3ee"               : "#92400E",
    timelineEduDotGlow: isDark
      ? "0 0 10px #22d3ee, 0 0 20px rgba(34,211,238,0.50)"
      : "0 0 8px rgba(146,83,9,0.45), 0 0 16px rgba(146,83,9,0.25)",

    // ── Hero title pulsating glow ─────────────────────────────────────────
    // Light: enhanced depth shadow with amber glow
    titleGlowShadow: isDark
      ? "0 0 8px rgba(34,211,238,0.25), 0 0 24px rgba(34,211,238,0.15)"
      : "0 0 12px rgba(146,83,9,0.15), 0 6px 16px rgba(146,83,9,0.08)",

    // ── About photo frame ─────────────────────────────────────────────────
    photoBorderColor: isDark ? "rgba(34,211,238,0.50)"  : "rgba(146, 64, 14, 0.40)",
    photoBorderGlow:  isDark
      ? "0 0 30px rgba(34,211,238,0.20)"
      : "0 0 20px rgba(146,83,9,0.15)",
    photoHoverGlow:   isDark
      ? "0 0 50px rgba(34,211,238,0.40)"
      : "0 0 30px rgba(146,83,9,0.25)",
    photoBlobBg: isDark
      ? "linear-gradient(135deg, rgba(34,211,238,0.20), rgba(37,99,235,0.15))"
      : "linear-gradient(135deg, rgba(254,243,199,0.70), rgba(253,230,138,0.40))",
  };
}
