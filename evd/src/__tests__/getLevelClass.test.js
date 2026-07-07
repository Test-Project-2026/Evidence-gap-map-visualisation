import { describe, it, expect } from "vitest";
import getLevelClass from "../utils/getLevelClass";

describe("getLevelClass", () => {
  it("returns cell--empty for 0", () => {
    expect(getLevelClass(0)).toBe("cell--empty");
  });

  it("returns cell--level-1 for 1", () => {
    expect(getLevelClass(1)).toBe("cell--level-1");
  });

  it("returns cell--level-2 for 2", () => {
    expect(getLevelClass(2)).toBe("cell--level-2");
  });

  it("returns cell--level-2 for 3", () => {
    expect(getLevelClass(3)).toBe("cell--level-2");
  });

  it("returns cell--level-3 for 4", () => {
    expect(getLevelClass(4)).toBe("cell--level-3");
  });

  it("returns cell--level-3 for 5", () => {
    expect(getLevelClass(5)).toBe("cell--level-3");
  });

  it("returns cell--level-4 for 6", () => {
    expect(getLevelClass(6)).toBe("cell--level-4");
  });

  it("returns cell--level-4 for large numbers", () => {
    expect(getLevelClass(100)).toBe("cell--level-4");
  });
});
