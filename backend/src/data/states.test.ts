import { describe, it, expect } from "vitest";
import { STATE_SCHEDULES } from "./states";

describe("Census 2027 state seed data", () => {
  it("contains the 13 sample states from the brief", () => {
    const states = STATE_SCHEDULES.map((s) => s.state);
    for (const expected of [
      "Karnataka",
      "Goa",
      "Odisha",
      "Sikkim",
      "Andaman & Nicobar",
      "Delhi (NDMC)",
      "Gujarat",
      "Maharashtra",
      "Rajasthan",
      "Jharkhand",
      "Uttar Pradesh",
      "Kerala",
      "Tamil Nadu",
    ]) {
      expect(states).toContain(expected);
    }
  });

  it("has exact real dates for the sample schedule", () => {
    const maharashtra = STATE_SCHEDULES.find((s) => s.state === "Maharashtra");
    expect(maharashtra).toMatchObject({
      selfEnumStart: "2026-05-01",
      selfEnumEnd: "2026-05-15",
      houseListingStart: "2026-05-16",
      houseListingEnd: "2026-06-14",
    });
  });

  it("keeps every self-enum window 15 days long", () => {
    for (const s of STATE_SCHEDULES) {
      const start = new Date(`${s.selfEnumStart}T00:00:00`).getTime();
      const end = new Date(`${s.selfEnumEnd}T00:00:00`).getTime();
      const days = (end - start) / (1000 * 60 * 60 * 24) + 1;
      expect(days).toBe(15);
    }
  });
});
