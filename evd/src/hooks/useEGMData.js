import { useState, useEffect, useMemo } from "react";
import rawStudies, { interventions, outcomes } from "../data/mockData";

function buildMatrix(studies) {
  const matrix = {};
  for (const s of studies) {
    const key = `${s.intervention}|||${s.outcome}`;
    if (!matrix[key]) matrix[key] = [];
    matrix[key].push(s);
  }
  return matrix;
}

export default function useEGMData(filter = "") {
  const [studies, setStudies] = useState(rawStudies);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const matrix = useMemo(() => buildMatrix(studies), [studies]);

  const filterLower = filter.toLowerCase();

  const filteredInterventions = useMemo(
    () => interventions.filter((i) => i.toLowerCase().includes(filterLower)),
    [filterLower]
  );

  const filteredOutcomes = useMemo(
    () => outcomes.filter((o) => o.toLowerCase().includes(filterLower)),
    [filterLower]
  );

  const totalStudies = studies.length;

  const getCellStudies = (intervention, outcome) => {
    return matrix[`${intervention}|||${outcome}`] || [];
  };

  return {
    studies,
    setStudies,
    loading,
    matrix,
    interventions: filteredInterventions,
    outcomes: filteredOutcomes,
    allInterventions: interventions,
    allOutcomes: outcomes,
    totalStudies,
    getCellStudies,
  };
}
