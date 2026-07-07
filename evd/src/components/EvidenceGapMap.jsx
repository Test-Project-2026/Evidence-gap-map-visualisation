import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import useEGMData from "../hooks/useEGMData";
import useDebounce from "../hooks/useDebounce";
import getLevelClass from "../utils/getLevelClass";
import StudyModal from "./StudyModal";

export default function EvidenceGapMap() {
  const [filter, setFilter] = useState("");
  const [modal, setModal] = useState(null);
  const debouncedFilter = useDebounce(filter, 300);

  const { interventions, outcomes, getCellStudies, totalStudies, allInterventions, allOutcomes } =
    useEGMData(debouncedFilter);

  return (
    <div className="egm-wrapper">
      <header className="egm-header">
        <div className="egm-header-top">
          <div className="egm-title-group">
            <MapPin size={28} strokeWidth={1.6} className="egm-icon" />
            <div>
              <h1 className="egm-title">Evidence Gap Map</h1>
              <p className="egm-subtitle">
                Mapping {totalStudies} studies across {allInterventions.length}{" "}
                interventions and {allOutcomes.length} outcomes
              </p>
            </div>
          </div>
          <div className="egm-search">
            <Search size={16} strokeWidth={1.8} className="egm-search-icon" />
            <input
              type="text"
              placeholder="Filter rows or columns\u2026"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="egm-search-input"
              aria-label="Filter interventions and outcomes"
            />
          </div>
        </div>
      </header>

      <div className="egm-scroll">
        <div className="egm-grid">
          <div className="egm-corner">
            <span className="egm-corner-label">
              Intervention \u2192
              <br />
              Outcome \u2193
            </span>
          </div>

          {outcomes.map((outcome) => (
            <div key={outcome} className="egm-col-header">
              <span>{outcome}</span>
            </div>
          ))}

          {interventions.map((intervention) => (
            <div key={intervention} className="egm-row">
              <div className="egm-row-header">
                <span>{intervention}</span>
              </div>

              {outcomes.map((outcome) => {
                const cellStudies = getCellStudies(intervention, outcome);
                const count = cellStudies.length;
                const levelClass = getLevelClass(count);
                const isEmpty = count === 0;

                return (
                  <button
                    key={outcome}
                    className={`egm-cell ${levelClass} ${
                      isEmpty ? "egm-cell--empty" : "egm-cell--clickable"
                    }`}
                    onClick={() => {
                      if (!isEmpty) setModal({ studies: cellStudies, intervention, outcome });
                    }}
                    disabled={isEmpty}
                    aria-label={`${intervention} \u2013 ${outcome}: ${count} ${
                      count === 1 ? "study" : "studies"
                    }`}
                    title={
                      isEmpty
                        ? "No studies in this cell (gap)"
                        : `Click to view ${count} ${count === 1 ? "study" : "studies"}`
                    }
                  >
                    <span className="egm-cell-count">{count}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {modal && (
        <StudyModal
          studies={modal.studies}
          intervention={modal.intervention}
          outcome={modal.outcome}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
