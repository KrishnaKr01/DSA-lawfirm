import { useState, useEffect, useRef } from "react";
 
const TESTIMONIALS = [
  {
    initials: "AK",
    text: "DSA handled our entire M&A process with extraordinary precision. Their due diligence uncovered risks we never would have found, saving us millions. Truly world-class corporate counsel.",
    name: "Anil Kumar",
    role: "CEO, TechVenture India",
  },
  {
    initials: "SM",
    text: "When we faced a complex regulatory challenge, DSA's team moved swiftly and strategically. Their depth of knowledge in compliance law is unmatched. We are loyal clients for life.",
    name: "Sunita Mehta",
    role: "CFO, Meridian Pharmaceuticals",
  },
  {
    initials: "RJ",
    text: "Our IP portfolio is our most valuable asset. DSA built a comprehensive protection strategy that has withstood multiple challenges. Their attorneys are razor-sharp and deeply strategic.",
    name: "Rohit Joshi",
    role: "Founder, InnovateTech Labs",
  },
  {
    initials: "PG",
    text: "I've worked with law firms across three continents, and DSA Corporate Solutions stands among the absolute best. Professional, responsive, and devastatingly effective in litigation.",
    name: "Pradeep Gupta",
    role: "MD, Global Holdings Group",
  },
];
 
const TOTAL_SLIDES = 2; // 2 slides of 2 cards each
 
export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const trackRef = useRef(null);
  const autoRef = useRef(null);
 
  const updateSlider = (slide) => {
    if (!trackRef.current) return;
    const cardWidth =
      trackRef.current.children[0]?.offsetWidth + 32 || 0;
    trackRef.current.style.transform = `translateX(-${slide * (cardWidth * 2 + 32)}px)`;
  };
 
  const goToSlide = (i) => {
    setCurrentSlide(i);
    updateSlider(i);
  };
 
  const slide = (dir) => {
    const next = (currentSlide + dir + TOTAL_SLIDES) % TOTAL_SLIDES;
    goToSlide(next);
  };
 
  // Auto-slide
  useEffect(() => {
    autoRef.current = setInterval(() => slide(1), 5000);
    return () => clearInterval(autoRef.current);
  }, [currentSlide]);
 
  // Recalculate on resize
  useEffect(() => {
    const handleResize = () => updateSlider(currentSlide);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentSlide]);
 
  return (
    <section id="testimonials">
      <div className="section-inner">
        {/* Header */}
        <div className="testimonials-header">
          <div className="section-label reveal">Testimonials</div>
          <h2 className="section-title reveal reveal-delay-1">
            What Our <span className="gold">Clients</span>{" "}
            <span className="italic">Say</span>
          </h2>
        </div>
 
        {/* Slider */}
        <div className="testimonials-slider reveal reveal-delay-2">
          <div className="testimonials-track" id="testimonialsTrack" ref={trackRef}>
            {TESTIMONIALS.map(({ initials, text, name, role }) => (
              <div className="testimonial-card" key={name}>
                <div className="testimonial-stars">★★★★★</div>
                <p className="testimonial-text">"{text}"</p>
                <div className="testimonial-client">
                  <div className="client-avatar">{initials}</div>
                  <div>
                    <div className="client-name">{name}</div>
                    <div className="client-role">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
 
        {/* Controls */}
        <div className="slider-controls">
          <button className="slider-btn" onClick={() => slide(-1)}>
            ←
          </button>
          <div className="slider-dots">
            {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
              <button
                key={i}
                className={`slider-dot${currentSlide === i ? " active" : ""}`}
                onClick={() => goToSlide(i)}
              />
            ))}
          </div>
          <button className="slider-btn" onClick={() => slide(1)}>
            →
          </button>
        </div>
      </div>
    </section>
  );
}