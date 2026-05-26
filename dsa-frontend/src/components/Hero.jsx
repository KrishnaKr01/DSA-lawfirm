import { useEffect, useRef } from "react";
import logo from "../assets/logo.png";
import heroBg from "../assets/hero-bg.jpg";
 
export default function Hero() {
  const countersAnimated = useRef(false);
 
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };
 
  useEffect(() => {
    if (countersAnimated.current) return;
    countersAnimated.current = true;
 
    const animateCounter = (el, target, suffix = "") => {
      let start = null;
      const duration = 2000;
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
 
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const nums = e.target.querySelectorAll(".stat-num");
            nums.forEach((num) => {
              if (!num.dataset.animated) {
                num.dataset.animated = "true";
                const text = num.textContent;
                const val = parseInt(text.replace(/[^0-9]/g, ""));
                const suffix = text.replace(/[0-9]/g, "");
                animateCounter(num, val, suffix);
              }
            });
          }
        });
      },
      { threshold: 0.5 }
    );
 
    const statsEl = document.querySelector(".hero-stats");
    if (statsEl) observer.observe(statsEl);
    return () => observer.disconnect();
  }, []);
 
  return (
    <section id="hero" style={{
      backgroundImage: `url(${heroBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      <div className="hero-bg-grid" />
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
 
      <div className="hero-content">
        {/* Left */}
        <div className="hero-left">
          <div className="hero-badge">Established Excellence · Since 2010</div>
 
          <h1 className="hero-title">
            Trusted Legal
            <br />
            <span className="gold">Corporate</span>
            <br />
            <span className="italic">Counsel</span>
          </h1>
 
          <p className="hero-subtitle">Justice. Integrity. Results.</p>
 
          <p className="hero-desc">
            DSA Corporate Solutions delivers premier corporate legal services —
            from M&amp;A and compliance to litigation. We protect your business
            with precision, authority, and unwavering commitment.
          </p>
 
          <div className="hero-btns">
            <a
              href="#contact"
              className="btn-primary"
              onClick={(e) => handleNavClick(e, "#contact")}
            >
              <span>Schedule Consultation</span>
              <span>→</span>
            </a>
            <a
              href="#practice"
              className="btn-outline"
              onClick={(e) => handleNavClick(e, "#practice")}
            >
              Our Practice Areas →
            </a>
          </div>
 
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">500+</span>
              <span className="stat-label">Cases Won</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">15+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">98%</span>
              <span className="stat-label">Client Satisfaction</span>
            </div>
          </div>
        </div>
 
        {/* Right — Logo Visual */}
        <div className="hero-visual">
          <div className="hero-logo-wrap">
            <div className="hero-logo-glow" />
            <img
              src={logo}
              alt="DSA Corporate Solutions"
              className="hero-logo-img"
            />
          </div>
        </div>
      </div>
 
      {/* Scroll indicator */}
      <div className="hero-scroll">
        <div className="scroll-line" />
        Scroll
      </div>
    </section>
  );
}