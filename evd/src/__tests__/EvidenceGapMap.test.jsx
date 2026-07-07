import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import EvidenceGapMap from "../components/EvidenceGapMap";

vi.mock("../hooks/useEGMData", () => ({
  default: () => ({
    loading: false,
    interventions: ["CCT", "Agri"],
    outcomes: ["Health", "Income"],
    allInterventions: ["CCT", "Agri"],
    allOutcomes: ["Health", "Income"],
    totalStudies: 5,
    getCellStudies: (intervention, outcome) => {
      if (intervention === "CCT" && outcome === "Health") {
        return [
          { title: "Study A", authors: "X", year: 2020, journal: "J1" },
          { title: "Study B", authors: "Y", year: 2021, journal: "J2" },
        ];
      }
      return [];
    },
  }),
}));

describe("EvidenceGapMap", () => {
  it("renders title", () => {
    render(<EvidenceGapMap />);
    expect(screen.getByText("Evidence Gap Map")).toBeInTheDocument();
  });

  it("renders subtitle with study count", () => {
    render(<EvidenceGapMap />);
    expect(screen.getByText(/5 studies/)).toBeInTheDocument();
  });

  it("renders row and column headers", () => {
    render(<EvidenceGapMap />);
    expect(screen.getByText("CCT")).toBeInTheDocument();
    expect(screen.getByText("Agri")).toBeInTheDocument();
    expect(screen.getByText("Health")).toBeInTheDocument();
    expect(screen.getByText("Income")).toBeInTheDocument();
  });

  it("shows study count in populated cell", () => {
    render(<EvidenceGapMap />);
    const cell = screen.getByLabelText("CCT \u2013 Health: 2 studies");
    expect(cell).toBeInTheDocument();
    expect(cell).toHaveTextContent("2");
  });

  it("shows 0 in empty cell", () => {
    render(<EvidenceGapMap />);
    const cell = screen.getByLabelText("Agri \u2013 Income: 0 studies");
    expect(cell).toHaveTextContent("0");
  });

  it("opens modal on cell click", async () => {
    render(<EvidenceGapMap />);
    const cell = screen.getByLabelText("CCT \u2013 Health: 2 studies");
    fireEvent.click(cell);
    expect(await screen.findByText("2 Studies")).toBeInTheDocument();
    expect(screen.getByText("Study A")).toBeInTheDocument();
    expect(screen.getByText("Study B")).toBeInTheDocument();
  });

  it("empty cell is disabled", () => {
    render(<EvidenceGapMap />);
    const cell = screen.getByLabelText("Agri \u2013 Income: 0 studies");
    expect(cell).toBeDisabled();
  });
});
