/**
 * useThemeColors — Central theme-aware color token hook
 *
 * Dark  → Cyberpunk Cyan  (#22d3ee / #2563eb)
 * Light → Solar Minimal   (#ea580c orange / warm stone text)
 *         Background: #ffffff (pure white)
 *         Particles:  Gray + Orange mixed
 *         Accent: orange-600 — برتقالي يتوهج على الأبيض بشكل مختلف كلياً
 */

import { useTheme } from "../context/ThemeContext";

export default function useThemeColors() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return {
    isDark,

    // ── Core accents ─────────────────────────────────────────────────────
    accent:       isDark ? "#22d3ee" : "#ea580c",          // dark: cyan | light: orange-600
    accentSec:    isDark ? "#2563eb" : "#9a3412",          // dark: blue-600 | light: orange-800
    accentRgh:    isDark ? "34, 211, 238"  : "234, 88, 12",
    accentSecRgb: isDark ? "37, 99, 235"   : "154, 52, 18",

    // ── Backgrounds / Navigation ─────────────────────────────────────────
    navBg:       isDark ? "rgba(10, 15, 26, 0.85)"  : "rgba(255, 255, 255, 0.92)",  // أبيض شفاف
    navBgTrans:  isDark ? "rgba(10, 15, 26, 0.55)"  : "rgba(250, 250, 249, 0.75)",
    navBorder:   isDark ? "rgba(34, 211, 238, 0.12)": "rgba(234, 88, 12, 0.18)",
    mobileNavBg: isDark ? "rgba(10, 15, 26, 0.97)"  : "rgba(255, 255, 255, 0.98)",

    // ── Cards ─────────────────────────────────────────────────────────────
    cardBg:       isDark ? "rgba(15, 23, 42, 0.80)"  : "rgba(255, 255, 255, 0.95)", // أبيض نظيف
    cardBgDeep:   isDark ? "rgba(15, 23, 42, 0.90)"  : "rgba(250, 250, 249, 0.98)", // off-white دافئ
    cardBorder:   isDark ? "rgba(255,255,255,0.12)"  : "rgba(234, 88, 12, 0.18)",
    cardHoverBorder: isDark ? "rgba(34,211,238,0.55)": "rgba(234, 88, 12, 0.65)",
    cardHoverBg:  isDark ? "rgba(15, 23, 42, 0.85)"  : "rgba(255, 255, 255, 1.00)",

    cardHoverShadow: isDark
      ? "0 0 30px rgba(34,211,238,0.20), 0 0 60px rgba(34,211,238,0.10), 0 20px 40px rgba(0,0,0,0.40)"
      : "0 0 28px rgba(234,88,12,0.50), 0 0 58px rgba(234,88,12,0.22), 0 12px 28px rgba(28,25,23,0.10)",

    // ── Footer ────────────────────────────────────────────────────────────
    footerBg:     isDark ? "rgba(10, 15, 26, 0.88)"  : "rgba(250, 250, 249, 1.00)", // off-white
    footerBorder: isDark ? "rgba(34, 211, 238, 0.10)": "rgba(234, 88, 12, 0.18)",

    // ── Ambient orbs ─────────────────────────────────────────────────────
    orbPrimary:   isDark ? "rgba(34, 211, 238, 0.12)": "rgba(234, 88, 12, 0.14)",
    orbSecondary: isDark ? "rgba(37, 99, 235, 0.10)" : "rgba(154, 52, 18, 0.10)",

    // ── Icon containers ───────────────────────────────────────────────────
    iconBg:     isDark ? "rgba(34, 211, 238, 0.08)" : "rgba(255, 255, 255, 1.00)",   // أبيض مصمت
    iconBorder: isDark ? "rgba(34, 211, 238, 0.20)" : "rgba(234, 88, 12, 0.35)",
    iconColor:  isDark ? "#22d3ee"                 : "#ea580c",

    // ── Gradients ─────────────────────────────────────────────────────────
    primaryGradient: isDark
      ? "linear-gradient(135deg, #22d3ee 0%, #2563eb 100%)"
      : "linear-gradient(135deg, #ea580c 0%, #c2410c 100%)",

    logoBg: isDark
      ? "linear-gradient(135deg, rgba(34,211,238,0.15), rgba(37,99,235,0.15))"
      : "linear-gradient(135deg, rgba(234,88,12,0.15), rgba(154,52,18,0.10))",

    logoBorder: isDark ? "rgba(34,211,238,0.30)": "rgba(234, 88, 12, 0.50)",

    heroBtnShadow: isDark
      ? "0 4px 20px rgba(34,211,238,0.30)"
      : "0 4px 20px rgba(234, 88, 12, 0.42)",
    heroBtnHoverShadow: isDark
      ? "0 0 20px #22d3ee, 0 0 40px rgba(6,182,212,0.47)"
      : "0 0 26px #ea580c, 0 0 52px rgba(234,88,12,0.55)",

    // ── Social / misc hover ───────────────────────────────────────────────
    socialHoverBorder: isDark ? "#22d3ee"               : "#ea580c",
    socialHoverShadow: isDark
      ? "0 0 15px rgba(34,211,238,0.30)"
      : "0 0 18px rgba(234,88,12,0.50)",

    // ── Glow line at card bottom ──────────────────────────────────────────
    glowLine: isDark
      ? "linear-gradient(90deg, transparent, #22d3ee, transparent)"
      : "linear-gradient(90deg, transparent, #ea580c, transparent)",

    // ── ScrollToTop button ────────────────────────────────────────────────
    scrollBtnBg:     isDark ? "rgba(15, 23, 42, 0.85)"  : "rgba(255, 255, 255, 0.95)",
    scrollBtnBorder: isDark ? "rgba(34,211,238,0.30)"   : "rgba(234, 88, 12, 0.50)",
    scrollBtnHoverShadow: isDark
      ? "0 0 15px #22d3ee, 0 0 30px rgba(34,211,238,0.40)"
      : "0 0 18px #ea580c, 0 0 36px rgba(234,88,12,0.50)",

    // ── Input focus ring ──────────────────────────────────────────────────
    inputFocusBorder: isDark ? "#22d3ee"  : "#ea580c",
    inputFocusShadow: isDark
      ? "0 0 0 3px rgba(34,211,238,0.15), 0 0 10px rgba(34,211,238,0.30)"
      : "0 0 0 3px rgba(234,88,12,0.18), 0 0 12px rgba(234,88,12,0.40)",

    // ── Timeline (Journey) ────────────────────────────────────────────────
    timelineEduGrad:    isDark
      ? "linear-gradient(180deg, #22d3ee, transparent)"
      : "linear-gradient(180deg, #ea580c, transparent)",
    timelineEduBorder:  isDark ? "rgba(34,211,238,0.20)": "rgba(234, 88, 12, 0.30)",
    timelineEduDot:     isDark ? "#22d3ee"               : "#ea580c",
    timelineEduDotGlow: isDark
      ? "0 0 10px #22d3ee, 0 0 20px rgba(34,211,238,0.50)"
      : "0 0 14px #ea580c, 0 0 28px rgba(234,88,12,0.60)",

    // ── Hero title pulsating glow ─────────────────────────────────────────
    titleGlowShadow: isDark
      ? "0 0 8px rgba(34,211,238,0.25), 0 0 24px rgba(34,211,238,0.15)"
      : "0 0 18px rgba(234,88,12,0.55), 0 0 36px rgba(234,88,12,0.30)",

    // ── About photo frame ─────────────────────────────────────────────────
    photoBorderColor: isDark ? "rgba(34,211,238,0.50)"  : "rgba(234, 88, 12, 0.65)",
    photoBorderGlow:  isDark
      ? "0 0 30px rgba(34,211,238,0.20)"
      : "0 0 34px rgba(234, 88, 12, 0.42)",
    photoHoverGlow:   isDark
      ? "0 0 50px rgba(34,211,238,0.40)"
      : "0 0 58px rgba(234, 88, 12, 0.62)",
    photoBlobBg: isDark
      ? "linear-gradient(135deg, rgba(34,211,238,0.20), rgba(37,99,235,0.15))"
      : "linear-gradient(135deg, rgba(234,88,12,0.18), rgba(154,52,18,0.12))",
  };
}
