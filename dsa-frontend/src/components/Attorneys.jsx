import attorney1 from "../assets/attorney1.jpg";
import attorney2 from "../assets/attorney2.jpg";
import attorney3 from "../assets/attorney3.jpg";

const ATTORNEYS = [
  {
    image: attorney1,
    role: "Senior Partner",
    name: "Rajesh Sharma",
    spec: "Corporate Law · M&A · 20 Years",
  },
  {
    image: attorney2,
    role: "Managing Partner",
    name: "Priya Verma",
    spec: "IP Law · Compliance · 16 Years",
  },
  {
    image: attorney3,
    role: "Associate Partner",
    name: "Arjun Kapoor",
    spec: "Litigation · Employment Law · 12 Years",
  },
];

export default function Attorneys() {
  const handleClick = (e) => {
    e.preventDefault();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="attorneys">
      <div className="section-inner">
        <div className="attorneys-header">
          <div>
            <div className="section-label reveal">Our Team</div>
            <h2 className="section-title reveal reveal-delay-1">
              Meet Our <span className="gold">Distinguished</span>
              <br />
              <span className="italic">Attorneys</span>
            </h2>
          </div>
          <a
            href="#contact"
            className="btn-outline reveal reveal-delay-2"
            style={{ whiteSpace: "nowrap" }}
            onClick={handleClick}
          >
            View All Attorneys
          </a>
        </div>

        <div className="attorneys-grid">
          {ATTORNEYS.map(({ image, role, name, spec }, i) => (
            <div
              className={`attorney-card reveal${i > 0 ? ` reveal-delay-${i}` : ""}`}
              key={name}
            >
              <div className="attorney-img">
                <img
                  src={image}
                  alt={name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                    display: "block",
                  }}
                />
                <div className="attorney-img-overlay" />
                <div className="attorney-hover-line" />
                <div className="attorney-info">
                  <div className="attorney-role">{role}</div>
                  <div className="attorney-name">{name}</div>
                  <div className="attorney-spec">{spec}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}