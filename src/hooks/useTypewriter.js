/**
 * useTypewriter — Types a string character by character
 *
 * @param {string}  text       — The full string to type out
 * @param {number}  speed      — ms between each character (default 60)
 * @param {number}  delay      — ms to wait before starting (default 0)
 * @param {boolean} enabled    — only start when true (default true)
 *
 * Returns { displayed, isDone }
 * `displayed` is the portion of the string typed so far.
 * `isDone` is true once the full string has been typed.
 */

import { useState, useEffect } from "react";

export default function useTypewriter({
  text = "",
  speed = 60,
  delay = 0,
  enabled = true,
} = {}) {
  const [displayed, setDisplayed] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!enabled || !text) return;

    setDisplayed("");
    setIsDone(false);

    let startTimeout;
    let interval;

    startTimeout = setTimeout(() => {
      let idx = 0;
      interval = setInterval(() => {
        idx++;
        setDisplayed(text.slice(0, idx));
        if (idx >= text.length) {
          clearInterval(interval);
          setIsDone(true);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
  }, [text, speed, delay, enabled]);

  return { displayed, isDone };
}
