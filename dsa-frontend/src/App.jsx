import { useEffect, useRef, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import About from "./components/About";
import PracticeArea from "./components/PracticeArea";
import Attorneys from "./components/Attorneys";
import WhyUs from "./components/WhyUs";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import useScrollReveal from "./hooks/useScrollReveal";
import useCounter from "./hooks/useCounter";

import "./styles/global.css";

// ── Custom Cursor ─────────────────────────────────────────────────────────────
function useCursor() {
  useEffect(() => {
    const cursor = document.getElementById("cursor");
    const ring = document.getElementById("cursorRing");
    if (!cursor || !ring) return;

    let mouseX = 0,
      mouseY = 0,
      ringX = 0,
      ringY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";
    };
    document.addEventListener("mousemove", onMove);

    let rafId;
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";
      rafId = requestAnimationFrame(animateRing);
    };
    animateRing();

    const expand = () => {
      cursor.classList.add("expanded");
      ring.classList.add("expanded");
    };
    const shrink = () => {
      cursor.classList.remove("expanded");
      ring.classList.remove("expanded");
    };

    const targets = document.querySelectorAll(
      "a, button, .practice-card, .attorney-card"
    );
    targets.forEach((el) => {
      el.addEventListener("mouseenter", expand);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);
}

// ── Preloader ─────────────────────────────────────────────────────────────────
function Preloader({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2000);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div id="preloader">
      <img src="/logo.png" alt="DSA" className="preloader-logo" />
      <div className="preloader-bar" />
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [loading, setLoading] = useState(true);

  // Activate scroll-reveal and counter animations
  useScrollReveal();
  useCounter();
  useCursor();

  return (
    <>
      {/* Custom cursor elements */}
      <div className="cursor" id="cursor" />
      <div className="cursor-ring" id="cursorRing" />

      {/* Preloader */}
      {loading && <Preloader onDone={() => setLoading(false)} />}

      {/* Main site */}
      <Navbar />
      <Hero />
      <Ticker />
      <About />
      <PracticeArea />
      <Attorneys />
      <WhyUs />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}