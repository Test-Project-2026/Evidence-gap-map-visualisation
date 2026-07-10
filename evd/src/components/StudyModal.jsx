import { useState, useEffect, useCallback, useRef } from "react";
import { X, BookOpen } from "lucide-react";

export default function StudyModal({ studies, intervention, outcome, onClose }) {
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 200);
  }, [onClose]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [handleClose]);

  const onOverlayClick = (e) => {
    if (e.target === overlayRef.current) handleClose();
  };

  return (
    <div
      ref={overlayRef}
      className={`modal-overlay ${visible ? "modal-overlay--visible" : ""}`}
      onClick={onOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Studies: ${intervention} \u2013 ${outcome}`}
    >
      <div className={`modal ${visible ? "modal--visible" : ""}`}>
        <div className="modal-header">
          <div className="modal-header-text">
            <BookOpen size={18} strokeWidth={1.8} />
            <span>
              {studies.length} {studies.length === 1 ? "Study" : "Studies"}
            </span>
          </div>
          <button className="modal-close" onClick={handleClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="modal-subtitle">
          <strong>{intervention}</strong>
          <span className="modal-separator">\u2192</span>
          <strong>{outcome}</strong>
        </div>

        <ul className="modal-list">
          {studies.map((study, i) => (
            <li key={i} className="modal-study">
              <span className="modal-study-title">{study.title}</span>
              <span className="modal-study-meta">
                {study.authors} ({study.year}). <em>{study.journal}</em>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
