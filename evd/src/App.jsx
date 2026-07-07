import { useState, useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import EvidenceGapMap from "./components/EvidenceGapMap";
import SkeletonLoader from "./components/SkeletonLoader";
import Legend from "./components/Legend";
import "./App.css";

function LoadingGate({ children }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(timer);
  }, []);
  return ready ? children : <SkeletonLoader />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <div className="app">
        <LoadingGate>
          <EvidenceGapMap />
          <Legend />
        </LoadingGate>
      </div>
    </ErrorBoundary>
  );
}
