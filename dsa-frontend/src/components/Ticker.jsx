const ITEMS = [
  "Corporate Law",
  "Mergers & Acquisitions",
  "Intellectual Property",
  "Contract Disputes",
  "Compliance & Regulatory",
  "Corporate Litigation",
  "Employment Law",
  "Business Formation",
];
 
export default function Ticker() {
  // Duplicate items for seamless infinite scroll
  const allItems = [...ITEMS, ...ITEMS];
 
  return (
    <div className="ticker">
      <div className="ticker-inner" id="tickerInner">
        {allItems.map((item, i) => (
          <div className="ticker-item" key={i}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
 