export type WindowStatus = "open" | "upcoming" | "past";

function dayStart(d: string): number {
  return new Date(`${d}T00:00:00`).getTime();
}

export function windowStatus(
  start: string,
  end: string,
  refDate: Date = new Date()
): WindowStatus {
  const now = dayStart(refDate.toISOString().slice(0, 10));
  const s = dayStart(start);
  const e = dayStart(end);

  if (now < s) return "upcoming";
  if (now > e) return "past";
  return "open";
}

export function isWithinWindow(start: string, end: string, refDate: Date = new Date()): boolean {
  return windowStatus(start, end, refDate) === "open";
}
