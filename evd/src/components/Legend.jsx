const LEVELS = [
  { min: 0, max: 0, label: "No studies", className: "cell--empty" },
  { min: 1, max: 1, label: "1 study", className: "cell--level-1" },
  { min: 2, max: 3, label: "2\u20133 studies", className: "cell--level-2" },
  { min: 4, max: 5, label: "4\u20135 studies", className: "cell--level-3" },
  { min: 6, max: Infinity, label: "6+ studies", className: "cell--level-4" },
];

export default function Legend() {
  return (
    <div className="legend">
      <span className="legend-title">Study count</span>
      <div className="legend-items">
        {LEVELS.map((level) => (
          <div key={level.label} className="legend-item">
            <span className={`legend-swatch ${level.className}`} />
            <span className="legend-label">{level.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
