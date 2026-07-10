import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import StudyModal from "../components/StudyModal";

const mockStudies = [
  { title: "Study One", authors: "Author A", year: 2020, journal: "Journal A" },
  { title: "Study Two", authors: "Author B", year: 2021, journal: "Journal B" },
];

describe("StudyModal", () => {
  it("renders study count in header", () => {
    render(
      <StudyModal
        studies={mockStudies}
        intervention="CCT"
        outcome="Health"
        onClose={() => {}}
      />
    );
    expect(screen.getByText("2 Studies")).toBeInTheDocument();
  });

  it("renders intervention and outcome", () => {
    render(
      <StudyModal
        studies={mockStudies}
        intervention="CCT"
        outcome="Health"
        onClose={() => {}}
      />
    );
    expect(screen.getByText("CCT")).toBeInTheDocument();
    expect(screen.getByText("Health")).toBeInTheDocument();
  });

  it("renders all study titles", () => {
    render(
      <StudyModal
        studies={mockStudies}
        intervention="CCT"
        outcome="Health"
        onClose={() => {}}
      />
    );
    expect(screen.getByText("Study One")).toBeInTheDocument();
    expect(screen.getByText("Study Two")).toBeInTheDocument();
  });

  it("calls onClose when close button clicked", async () => {
    const onClose = vi.fn();
    render(
      <StudyModal
        studies={mockStudies}
        intervention="CCT"
        outcome="Health"
        onClose={onClose}
      />
    );
    fireEvent.click(screen.getByLabelText("Close"));
    await waitFor(() => expect(onClose).toHaveBeenCalled());
  });

  it("renders '1 Study' for single study", () => {
    render(
      <StudyModal
        studies={[mockStudies[0]]}
        intervention="CCT"
        outcome="Health"
        onClose={() => {}}
      />
    );
    expect(screen.getByText("1 Study")).toBeInTheDocument();
  });
});
