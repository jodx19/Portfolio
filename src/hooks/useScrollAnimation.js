/**
 * useScrollAnimation — Reusable Framer Motion viewport-trigger hook
 *
 * Returns { ref, controls } to pair with a motion element.
 * When the element enters the viewport, `controls.start("animate")` fires.
 *
 * Usage:
 *   const { ref, controls } = useScrollAnimation();
 *   <motion.div ref={ref} animate={controls} initial="initial" variants={fadeUp}>
 *
 * Options:
 *   threshold  – 0-1, fraction of element visible before trigger (default 0.15)
 *   once       – fire only the first time (default true)
 *   margin     – rootMargin string, e.g. "-50px" (default "-50px")
 */

import { useEffect, useRef } from "react";
import { useInView, useAnimation } from "framer-motion";

/**
 * @param {Object} options
 * @param {number}  [options.threshold=0.15]  - Fraction of element visible to trigger
 * @param {boolean} [options.once=true]        - Trigger animation only once
 * @param {string}  [options.margin="-50px"]   - rootMargin equivalent for IntersectionObserver
 */
export default function useScrollAnimation({
  threshold = 0.15,
  once = true,
  margin = "-50px",
} = {}) {
  const ref = useRef(null);
  const controls = useAnimation();

  // useInView returns true once the ref'd element crosses the viewport boundary
  const isInView = useInView(ref, { once, margin, amount: threshold });

  useEffect(() => {
    if (isInView) {
      controls.start("animate");
    } else if (!once) {
      // If not "once", reset so animation replays on re-enter
      controls.start("initial");
    }
  }, [isInView, controls, once]);

  return { ref, controls };
}
