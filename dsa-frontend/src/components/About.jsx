import logo from "../assets/logo.png";
 
const VALUES = [
  {
    icon: "⚖️",
    title: "Integrity",
    text: "Unwavering ethical standards in every case",
  },
  {
    icon: "🏆",
    title: "Excellence",
    text: "Award-winning legal representation",
  },
  {
    icon: "🎯",
    title: "Strategy",
    text: "Results-driven approach to every matter",
  },
  {
    icon: "🛡️",
    title: "Protection",
    text: "Comprehensive corporate risk management",
  },
];
 
export default function About() {
  return (
    <section id="about">
      <div className="section-inner">
        <div className="about-grid">
          {/* Image / Logo Panel */}
          <div className="about-image-wrap reveal">
            <div className="about-img-placeholder">
              <img
                src={logo}
                alt="DSA Logo"
                className="about-logo-centered"
              />
              <div
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "10px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  opacity: 0.6,
                }}
              >
                Corporate Solutions Law Firm
              </div>
            </div>
            <div className="about-img-badge">
              <span className="badge-num">15+</span>
              <span className="badge-text">Years of Legal Excellence</span>
            </div>
          </div>
 
          {/* Text Content */}
          <div className="about-text">
            <div className="section-label reveal">About DSA</div>
            <h2 className="section-title reveal reveal-delay-1">
              Where <span className="italic">Strategy</span> Meets
              <br />
              <span className="gold">Legal Mastery</span>
            </h2>
 
            <p className="about-desc reveal reveal-delay-2">
              <strong>DSA Corporate Solutions</strong> is a premier corporate
              law firm dedicated to providing exceptional legal counsel to
              businesses of all sizes. With over 15 years of industry
              experience, our seasoned attorneys combine deep legal knowledge
              with a strategic mindset to deliver outcomes that matter.
            </p>
 
            <p className="about-desc reveal reveal-delay-2">
              We are more than legal advisors — we are{" "}
              <strong>strategic partners</strong> committed to safeguarding your
              corporate interests, navigating complex regulatory landscapes, and
              ensuring long-term business success.
            </p>
 
            <div className="about-values reveal reveal-delay-3">
              {VALUES.map(({ icon, title, text }) => (
                <div className="value-item" key={title}>
                  <div className="value-icon">{icon}</div>
                  <div>
                    <div className="value-title">{title}</div>
                    <div className="value-text">{text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}