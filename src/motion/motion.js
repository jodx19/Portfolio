// === FRAMER MOTION VARIANTS FOR CYBERPUNK PORTFOLIO ===

// Fade up animation - for section entrances
export const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }
  },
};

// Fade in from left
export const fadeLeft = {
  initial: { opacity: 0, x: -30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

// Stagger container - delays children animations
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Slower stagger for larger grids
export const staggerContainerSlow = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Badge reveal - for tech tags
export const badgeReveal = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  },
};

// === THE LIGHTNING GLOW HOVER EFFECT ===
export const lightningGlow = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    boxShadow: "0 0 10px #22d3ee, 0 0 40px #22d3ee77, 0 0 60px rgba(6, 182, 212, 0.2)",
    borderColor: "#22d3ee",
    transition: { duration: 0.3, ease: "easeOut" }
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};

// Card hover with subtle lift
export const cardHover = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)"
  },
  hover: {
    y: -8,
    scale: 1.05,
    boxShadow: "0 0 10px #22d3ee, 0 0 40px #22d3ee77, 0 0 60px rgba(6, 182, 212, 0.2)",
    transition: { duration: 0.3, ease: "easeOut" }
  },
};

// 3D Tilt effect for skill cards
export const tiltHover = {
  rest: {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.3, ease: "easeOut" }
  },
};

// Nav link underline slide
export const navLinkUnderline = {
  initial: { scaleX: 0, originX: 0 },
  hover: {
    scaleX: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  },
};

// Scale on tap for buttons
export const buttonTap = {
  tap: { scale: 0.95 },
};

// Pulse glow for decorative elements
export const pulseGlow = {
  animate: {
    boxShadow: [
      "0 0 10px #22d3ee",
      "0 0 30px #22d3ee, 0 0 60px rgba(34, 211, 238, 0.4)",
      "0 0 10px #22d3ee"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Timeline node entrance
export const timelineNode = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  },
};

// Icon glow on hover
export const iconGlow = {
  rest: {
    filter: "drop-shadow(0 0 0px transparent)"
  },
  hover: {
    filter: "drop-shadow(0 0 8px #22d3ee)",
    transition: { duration: 0.2 }
  },
};
