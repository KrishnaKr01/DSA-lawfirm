const PRACTICES = [
  {
    num: "01",
    icon: "🏛️",
    name: "Corporate Law",
    desc: "Full-spectrum corporate legal services — governance, structure, bylaws, shareholder agreements, and board advisory.",
  },
  {
    num: "02",
    icon: "🤝",
    name: "Mergers & Acquisitions",
    desc: "Expert M&A counsel from due diligence and deal structuring through negotiation, documentation, and seamless closing.",
  },
  {
    num: "03",
    icon: "💡",
    name: "Intellectual Property",
    desc: "Protect your innovations — trademark registration, patent filings, copyright enforcement, and IP litigation support.",
  },
  {
    num: "04",
    icon: "📋",
    name: "Compliance & Regulatory",
    desc: "Navigating complex regulatory frameworks — securities law, financial compliance, and government regulatory affairs.",
  },
  {
    num: "05",
    icon: "⚔️",
    name: "Corporate Litigation",
    desc: "Aggressive, strategic courtroom representation for commercial disputes, contract breaches, and corporate conflicts.",
  },
  {
    num: "06",
    icon: "👥",
    name: "Employment Law",
    desc: "HR compliance, employment contracts, workplace investigations, and executive compensation structuring.",
  },
];
 
export default function PracticeArea() {
  const handleClick = (e) => {
    e.preventDefault();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };
 
  return (
    <section id="practice">
      <div className="section-inner">
        {/* Header */}
        <div className="practice-header">
          <div className="section-label reveal">What We Do</div>
          <h2 className="section-title reveal reveal-delay-1">
            Our <span className="gold">Practice</span>{" "}
            <span className="italic">Areas</span>
          </h2>
          <p
            className="reveal reveal-delay-2"
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "15px",
              color: "var(--text-muted)",
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: "1.7",
            }}
          >
            Comprehensive legal solutions across all facets of corporate law,
            tailored to your business needs.
          </p>
        </div>
 
        {/* Cards Grid */}
        <div className="practice-grid">
          {PRACTICES.map(({ num, icon, name, desc }, i) => (
            <div
              className={`practice-card reveal${i > 0 ? ` reveal-delay-${Math.min(i, 4)}` : ""}`}
              key={num}
            >
              <div className="practice-num">{num}</div>
              <div className="practice-icon">{icon}</div>
              <div className="practice-name">{name}</div>
              <div className="practice-desc">{desc}</div>
              <a href="#contact" className="practice-link" onClick={handleClick}>
                Learn More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}