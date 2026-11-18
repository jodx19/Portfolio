/**
 * useThemeColors — Central theme-aware color token hook
 *
 * Dark  → Cyberpunk Cyan  (#22d3ee / #2563eb)
 * Light → Royal Sapphire & Obsidian  (#2563eb royal blue / #0f172a obsidian text)
 *         Background: #f8fafc (porcelain studio slate)
 *         Surfaces:   #ffffff (pure crisp white with ambient shadow)
 *         Accent:     #2563eb (Royal Blue 600 — Stripe/Linear grade)
 */

import { useTheme } from "../context/ThemeContext";

export default function useThemeColors() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return {
    isDark,

    // ── Core accents ─────────────────────────────────────────────────────
    accent:       isDark ? "#22d3ee" : "#2563eb",          // dark: cyan | light: royal blue
    accentSec:    isDark ? "#2563eb" : "#1d4ed8",          // dark: blue-600 | light: sapphire-700
    accentRgb:    isDark ? "34, 211, 238"  : "37, 99, 235",
    accentSecRgb: isDark ? "37, 99, 235"   : "29, 78, 216",

    // ── Backgrounds / Navigation ─────────────────────────────────────────
    navBg:       isDark ? "rgba(10, 15, 26, 0.85)"  : "rgba(248, 250, 252, 0.92)",  // porcelain glass
    navBgTrans:  isDark ? "rgba(10, 15, 26, 0.55)"  : "rgba(248, 250, 252, 0.80)",
    navBorder:   isDark ? "rgba(34, 211, 238, 0.12)": "rgba(30, 41, 59, 0.14)",
    mobileNavBg: isDark ? "rgba(10, 15, 26, 0.97)"  : "rgba(255, 255, 255, 0.98)",

    // ── Cards ─────────────────────────────────────────────────────────────
    cardBg:       isDark ? "rgba(15, 23, 42, 0.80)"  : "#ffffff",
    cardBgDeep:   isDark ? "rgba(15, 23, 42, 0.90)"  : "#ffffff",
    cardBorder:   isDark ? "rgba(255,255,255,0.12)"  : "rgba(15, 23, 42, 0.38)",     // حدود أغمق وأوضح جداً
    cardBorderMedium: isDark ? "rgba(34, 211, 238, 0.30)" : "rgba(37, 99, 235, 0.50)",
    cardHoverBorder: isDark ? "rgba(34,211,238,0.55)": "rgba(37, 99, 235, 0.80)",
    cardHoverBg:  isDark ? "rgba(15, 23, 42, 0.85)"  : "#ffffff",
    cardShadow:   isDark
      ? "none"
      : "0 2px 0 rgba(15,23,42,0.08), 0 4px 16px -2px rgba(15,23,42,0.14), 0 0 0 1px rgba(15,23,42,0.26), 0 0 18px rgba(37,99,235,0.14)",

    cardHoverShadow: isDark
      ? "0 0 30px rgba(34,211,238,0.20), 0 0 60px rgba(34,211,238,0.10), 0 20px 40px rgba(0,0,0,0.40)"
      : "0 8px 32px -4px rgba(15,23,42,0.18), 0 0 0 2px rgba(37,99,235,0.70), 0 0 24px rgba(37,99,235,0.28)",

    // ── Footer ────────────────────────────────────────────────────────────
    footerBg:     isDark ? "rgba(10, 15, 26, 0.88)"  : "#f1f5f9",
    footerBorder: isDark ? "rgba(34, 211, 238, 0.10)": "rgba(30, 41, 59, 0.14)",

    // ── Ambient orbs ─────────────────────────────────────────────────────
    orbPrimary:   isDark ? "rgba(34, 211, 238, 0.12)": "rgba(37, 99, 235, 0.08)",
    orbSecondary: isDark ? "rgba(37, 99, 235, 0.10)" : "rgba(2, 132, 199, 0.06)",

    // ── Icon containers ───────────────────────────────────────────────────
    iconBg:     isDark ? "rgba(34, 211, 238, 0.08)" : "rgba(37, 99, 235, 0.08)",
    iconBorder: isDark ? "rgba(34, 211, 238, 0.20)" : "rgba(37, 99, 235, 0.20)",
    iconColor:  isDark ? "#22d3ee"                 : "#2563eb",

    // ── Pill / Date / Meta Badges ─────────────────────────────────────────
    pillBg:     isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(15, 23, 42, 0.05)",
    pillBorder: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(15, 23, 42, 0.18)",
    pillText:   isDark ? "#94a3b8"                 : "#475569",

    // ── Gradients ─────────────────────────────────────────────────────────
    primaryGradient: isDark
      ? "linear-gradient(135deg, #22d3ee 0%, #2563eb 100%)"
      : "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #2563eb 100%)",

    logoBg: isDark
      ? "linear-gradient(135deg, rgba(34,211,238,0.15), rgba(37,99,235,0.15))"
      : "linear-gradient(135deg, rgba(37,99,235,0.12), rgba(15,23,42,0.06))",

    logoBorder: isDark ? "rgba(34,211,238,0.30)": "rgba(37, 99, 235, 0.35)",

    heroBtnShadow: isDark
      ? "0 4px 20px rgba(34,211,238,0.30)"
      : "0 4px 16px rgba(37, 99, 235, 0.25)",
    heroBtnHoverShadow: isDark
      ? "0 0 20px #22d3ee, 0 0 40px rgba(6,182,212,0.47)"
      : "0 6px 24px rgba(37, 99, 235, 0.35)",

    // ── Social / misc hover ───────────────────────────────────────────────
    socialHoverBorder: isDark ? "#22d3ee"               : "#2563eb",
    socialHoverShadow: isDark
      ? "0 0 15px rgba(34,211,238,0.30)"
      : "0 4px 16px rgba(37, 99, 235, 0.25)",

    // ── Glow line at card bottom ──────────────────────────────────────────
    glowLine: isDark
      ? "linear-gradient(90deg, transparent, #22d3ee, transparent)"
      : "linear-gradient(90deg, transparent, #2563eb, transparent)",

    // ── ScrollToTop button ────────────────────────────────────────────────
    scrollBtnBg:     isDark ? "rgba(15, 23, 42, 0.85)"  : "#ffffff",
    scrollBtnBorder: isDark ? "rgba(34,211,238,0.30)"   : "rgba(37, 99, 235, 0.30)",
    scrollBtnHoverShadow: isDark
      ? "0 0 15px #22d3ee, 0 0 30px rgba(34,211,238,0.40)"
      : "0 4px 16px rgba(37, 99, 235, 0.30)",

    // ── Input focus ring ──────────────────────────────────────────────────
    inputFocusBorder: isDark ? "#22d3ee"  : "#2563eb",
    inputFocusShadow: isDark
      ? "0 0 0 3px rgba(34,211,238,0.15), 0 0 10px rgba(34,211,238,0.30)"
      : "0 0 0 3px rgba(37, 99, 235, 0.15), 0 2px 8px rgba(37, 99, 235, 0.12)",

    // ── Timeline (Journey) ────────────────────────────────────────────────
    timelineEduGrad:    isDark
      ? "linear-gradient(180deg, #22d3ee, transparent)"
      : "linear-gradient(180deg, #2563eb, transparent)",
    timelineEduBorder:  isDark ? "rgba(34,211,238,0.20)": "rgba(37, 99, 235, 0.25)",
    timelineEduDot:     isDark ? "#22d3ee"               : "#2563eb",
    timelineEduDotGlow: isDark
      ? "0 0 10px #22d3ee, 0 0 20px rgba(34,211,238,0.50)"
      : "0 0 10px rgba(37, 99, 235, 0.40)",

    // ── Hero title typography (clean crisp, ZERO blurry glow in light mode) ──
    titleGlowShadow: isDark
      ? "0 0 8px rgba(34,211,238,0.25), 0 0 24px rgba(34,211,238,0.15)"
      : "0 2px 10px rgba(15, 23, 42, 0.08)",

    // ── About photo frame ─────────────────────────────────────────────────
    photoBorderColor: isDark ? "rgba(34,211,238,0.50)"  : "rgba(37, 99, 235, 0.45)",
    photoBorderGlow:  isDark
      ? "0 0 30px rgba(34,211,238,0.20)"
      : "0 4px 20px rgba(37, 99, 235, 0.15)",
    photoHoverGlow:   isDark
      ? "0 0 50px rgba(34,211,238,0.40)"
      : "0 8px 30px rgba(37, 99, 235, 0.25)",
    photoBlobBg: isDark
      ? "linear-gradient(135deg, rgba(34,211,238,0.20), rgba(37,99,235,0.15))"
      : "linear-gradient(135deg, rgba(37,99,235,0.12), rgba(15,23,42,0.06))",
  };
}
