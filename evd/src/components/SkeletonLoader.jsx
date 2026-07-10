export default function SkeletonLoader() {
  return (
    <div className="egm-wrapper">
      <div className="egm-header">
        <div className="egm-header-top">
          <div className="egm-title-group">
            <div className="skeleton skeleton-icon" />
            <div>
              <div className="skeleton skeleton-title" />
              <div className="skeleton skeleton-subtitle" />
            </div>
          </div>
          <div className="skeleton skeleton-search" />
        </div>
      </div>
      <div className="egm-scroll">
        <div className="egm-grid">
          <div className="egm-corner">
            <div className="skeleton skeleton-corner" />
          </div>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="egm-col-header">
              <div className="skeleton skeleton-col" />
            </div>
          ))}
          {Array.from({ length: 8 }).map((_, row) => (
            <div key={row} className="egm-row">
              <div className="egm-row-header">
                <div className="skeleton skeleton-row" />
              </div>
              {Array.from({ length: 8 }).map((_, col) => (
                <div key={col} className="egm-cell cell--empty">
                  <div className="skeleton skeleton-cell" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
