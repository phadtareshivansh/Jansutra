import { describe, it, expect } from "vitest";
import { windowStatus } from "./dateLogic";

describe("windowStatus", () => {
  it("returns open when now is inside the window", () => {
    expect(windowStatus("2026-05-01", "2026-05-15", new Date("2026-05-10T12:00:00"))).toBe("open");
  });

  it("returns upcoming when now is before the window", () => {
    expect(windowStatus("2026-05-01", "2026-05-15", new Date("2026-04-20T12:00:00"))).toBe("upcoming");
  });

  it("returns past when now is after the window", () => {
    expect(windowStatus("2026-05-01", "2026-05-15", new Date("2026-05-20T12:00:00"))).toBe("past");
  });

  it("treats the end date as inclusive", () => {
    expect(windowStatus("2026-05-01", "2026-05-15", new Date("2026-05-15T12:00:00"))).toBe("open");
  });
});
