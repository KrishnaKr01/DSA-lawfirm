import { useEffect, useRef } from "react";

/**
 * Animates numeric counters in elements matching the selector
 * when they scroll into view. Reads the number + suffix from textContent.
 *
 * Usage: useCounter(".stat-num, .metric-num, .badge-num")
 */
export default function useCounter(selector = ".stat-num, .metric-num, .badge-num") {
  const animated = useRef(new Set());

  useEffect(() => {
    const animateCounter = (el, target, suffix = "") => {
      let start = null;
      const duration = 2000;

      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        el.textContent = Math.floor(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const nums = entry.target.querySelectorAll(selector);
          nums.forEach((num) => {
            if (animated.current.has(num)) return;
            animated.current.add(num);

            const text = num.textContent;
            const value = parseInt(text.replace(/[^0-9]/g, ""), 10);
            const suffix = text.replace(/[0-9]/g, "");

            if (!isNaN(value)) {
              animateCounter(num, value, suffix);
            }
          });
        });
      },
      { threshold: 0.5 }
    );

    // Observe the sections that contain counter numbers
    const sections = document.querySelectorAll(
      ".hero-stats, .why-metrics, .about-img-badge"
    );
    sections.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selector]);
}