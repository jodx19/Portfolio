// === EXTENDED FRAMER MOTION VARIANTS ===
// This file complements motion.js with all the new cinematic entrance variants.

// ─────────────────────────────────────────────────────────────────────────────
// NAVBAR — Shatter & Assemble
// ─────────────────────────────────────────────────────────────────────────────

/** Logo drops from above */
export const navbarLogo = {
  initial: { opacity: 0, y: -60, scale: 0.8 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
  },
};

/** Desktop nav link — each drops down with stagger applied by parent */
export const navbarLink = {
  initial: { opacity: 0, y: -40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Action buttons slide in from the right */
export const navbarActions = {
  initial: { opacity: 0, x: 60 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 },
  },
};

/** Stagger container for nav links */
export const navbarLinksContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HERO — Letters Cascade
// ─────────────────────────────────────────────────────────────────────────────

/** Single letter drops from above (first name) */
export const letterDropDown = {
  initial: { opacity: 0, y: -80, rotateX: -90 },
  animate: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Single letter rises from below (last name) */
export const letterRiseUp = {
  initial: { opacity: 0, y: 80, rotateX: 90 },
  animate: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Container that staggers each letter */
export const letterContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0,
    },
  },
};

/** Glitch entrance for role text */
export const glitchIn = {
  initial: { opacity: 0, x: -8, skewX: -10 },
  animate: {
    opacity: 1,
    x: 0,
    skewX: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

/** Word-by-word reveal for description */
export const wordReveal = {
  initial: { opacity: 0, y: 20, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const wordContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0,
    },
  },
};

/** Status badge pops from center */
export const badgePop = {
  initial: { opacity: 0, scale: 0.5, y: -10 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 400, damping: 25, delay: 0.1 },
  },
};

/** Slide from left */
export const slideFromLeft = {
  initial: { opacity: 0, x: -60 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Slide from right */
export const slideFromRight = {
  initial: { opacity: 0, x: 60 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Bounce up from below for social icons */
export const bouncePop = {
  initial: { opacity: 0, y: 40, scale: 0.5 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 500, damping: 20 },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT — HTML Tag Reveal + Cascade Cards
// ─────────────────────────────────────────────────────────────────────────────

/** Photo frame slides in from left with slight rotation */
export const photoReveal = {
  initial: { opacity: 0, x: -80, rotate: -6, scale: 0.85 },
  animate: {
    opacity: 1,
    x: 0,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Card 1 — from left with counter-clockwise rotate */
export const cardFromLeft = {
  initial: { opacity: 0, x: -60, rotate: -5, scale: 0.85 },
  animate: {
    opacity: 1,
    x: 0,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Card 2 — from bottom, scale up */
export const cardFromBottom = {
  initial: { opacity: 0, y: 60, scale: 0.8 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
  },
};

/** Card 3 — from right with clockwise rotate */
export const cardFromRight = {
  initial: { opacity: 0, x: 60, rotate: 5, scale: 0.85 },
  animate: {
    opacity: 1,
    x: 0,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
  },
};

/** Letter reveal for section title */
export const titleLetterReveal = {
  initial: { opacity: 0, y: 30, rotateX: -60 },
  animate: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// JOURNEY — Timeline Drawing
// ─────────────────────────────────────────────────────────────────────────────

/** Timeline vertical line draws from top */
export const timelineLineGrow = {
  initial: { scaleY: 0, originY: 0 },
  animate: {
    scaleY: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
  },
};

/** Timeline dot pulses in */
export const timelineDotPulse = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: [0, 1.4, 1],
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.5 },
  },
};

/** Header split — left part */
export const splitHeaderLeft = {
  initial: { opacity: 0, x: -50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Header split — right part */
export const splitHeaderRight = {
  initial: { opacity: 0, x: 50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Card slides from left (education column) */
export const cardSlideLeft = {
  initial: { opacity: 0, x: -50, rotateY: -15 },
  animate: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Card slides from right (experience column) */
export const cardSlideRight = {
  initial: { opacity: 0, x: 50, rotateY: 15 },
  animate: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// SKILLS — Scan Line Materialize
// ─────────────────────────────────────────────────────────────────────────────

/** Skill card materializes — fades + rises with slight blur clearance */
export const skillCardMaterialize = {
  initial: { opacity: 0, y: 40, filter: "blur(8px)", scale: 0.92 },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const skillCardContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.15,
    },
  },
};

/** Icon spin + settle */
export const iconSpinIn = {
  initial: { opacity: 0, rotate: -180, scale: 0 },
  animate: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS — 3D Card Flip
// ─────────────────────────────────────────────────────────────────────────────

/** 3D flip from side: rotateY 90° → 0° */
export const cardFlip3D = {
  initial: { opacity: 0, rotateY: 90, z: -100, scale: 0.9 },
  animate: {
    opacity: 1,
    rotateY: 0,
    z: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const projectGridContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

/** Glitch header for projects */
export const headerGlitch = {
  initial: { opacity: 0, x: -10, skewX: -8 },
  animate: {
    opacity: 1,
    x: 0,
    skewX: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// CERTIFICATIONS — Spiral Reveal
// ─────────────────────────────────────────────────────────────────────────────

/** Cert card shimmer reveal — direction based on position */
export const certCardReveal = (direction = "bottom") => {
  const directionMap = {
    "top-left":     { initial: { opacity: 0, x: -60, y: -60, rotate: -10, scale: 0.7 } },
    "top":          { initial: { opacity: 0, y: -70, scale: 0.7 } },
    "top-right":    { initial: { opacity: 0, x: 60, y: -60, rotate: 10, scale: 0.7 } },
    "bottom-left":  { initial: { opacity: 0, x: -60, y: 60, rotate: 10, scale: 0.7 } },
    "bottom":       { initial: { opacity: 0, y: 70, scale: 0.7 } },
    "bottom-right": { initial: { opacity: 0, x: 60, y: 60, rotate: -10, scale: 0.7 } },
  };
  const { initial } = directionMap[direction] || directionMap["bottom"];
  return {
    initial,
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };
};

/** Shimmer text sweep for cert header */
export const shimmerHeader = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT — Radar Pulse + Stagger Form
// ─────────────────────────────────────────────────────────────────────────────

/** Form field slides in from right with stagger */
export const formFieldReveal = {
  initial: { opacity: 0, x: 40, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const formContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

/** Contact info item slides from left */
export const contactInfoItem = {
  initial: { opacity: 0, x: -30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const contactInfoContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// SHARED SECTION HEADER
// ─────────────────────────────────────────────────────────────────────────────

/** Section label (small caps above title) draws in */
export const sectionLabel = {
  initial: { opacity: 0, letterSpacing: "0.5em", y: -10 },
  animate: {
    opacity: 1,
    letterSpacing: "0.3em",
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/** Fade up with blur */
export const fadeUpBlur = {
  initial: { opacity: 0, y: 30, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const sectionHeaderContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0,
    },
  },
};
