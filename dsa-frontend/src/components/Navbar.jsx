import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
 
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
 
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
 
  const toggleMenu = () => setMenuOpen((prev) => !prev);
 
  const closeMenu = () => setMenuOpen(false);
 
  const handleNavClick = (e, href) => {
    e.preventDefault();
    closeMenu();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };
 
  return (
    <nav id="navbar" className={scrolled ? "scrolled" : ""}>
      <a href="#" className="nav-logo" onClick={(e) => handleNavClick(e, "#hero")}>
        <img src={logo} alt="DSA Corporate Solutions Logo" />
        <div className="nav-logo-text">
          <span className="brand">DSA</span>
          <span className="tagline">Corporate Solutions</span>
        </div>
      </a>
 
      <ul className={`nav-links${menuOpen ? " open" : ""}`} id="navLinks">
        {[
          { href: "#about", label: "About" },
          { href: "#practice", label: "Practice Areas" },
          { href: "#attorneys", label: "Attorneys" },
          { href: "#why", label: "Why Us" },
          { href: "#testimonials", label: "Testimonials" },
        ].map(({ href, label }) => (
          <li key={href}>
            <a href={href} onClick={(e) => handleNavClick(e, href)}>
              {label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#contact"
            className="nav-cta"
            onClick={(e) => handleNavClick(e, "#contact")}
          >
            Free Consultation
          </a>
        </li>
      </ul>
 
      <div
        className="nav-hamburger"
        id="hamburger"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span
          style={{
            transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "",
          }}
        />
        <span style={{ opacity: menuOpen ? 0 : 1 }} />
        <span
          style={{
            transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "",
          }}
        />
      </div>
    </nav>
  );
}
