import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Legend from "../components/Legend";

describe("Legend", () => {
  it("renders study count label", () => {
    render(<Legend />);
    expect(screen.getByText("Study count")).toBeInTheDocument();
  });

  it("renders all level labels", () => {
    render(<Legend />);
    expect(screen.getByText("No studies")).toBeInTheDocument();
    expect(screen.getByText("1 study")).toBeInTheDocument();
    expect(screen.getByText("2\u20133 studies")).toBeInTheDocument();
    expect(screen.getByText("4\u20135 studies")).toBeInTheDocument();
    expect(screen.getByText("6+ studies")).toBeInTheDocument();
  });

  it("renders 5 swatches", () => {
    const { container } = render(<Legend />);
    const swatches = container.querySelectorAll(".legend-swatch");
    expect(swatches).toHaveLength(5);
  });
});
