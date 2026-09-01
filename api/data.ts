export type StateSchedule = {
  id: number;
  state: string;
  selfEnumStart: string;
  selfEnumEnd: string;
  houseListingStart: string;
  houseListingEnd: string;
};

export const STATE_SCHEDULES: StateSchedule[] = [
  { id: 1, state: "Andaman & Nicobar", selfEnumStart: "2026-04-01", selfEnumEnd: "2026-04-15", houseListingStart: "2026-04-16", houseListingEnd: "2026-05-15" },
  { id: 2, state: "Delhi (NDMC)", selfEnumStart: "2026-04-01", selfEnumEnd: "2026-04-15", houseListingStart: "2026-04-16", houseListingEnd: "2026-05-15" },
  { id: 3, state: "Goa", selfEnumStart: "2026-04-01", selfEnumEnd: "2026-04-15", houseListingStart: "2026-04-16", houseListingEnd: "2026-05-15" },
  { id: 4, state: "Gujarat", selfEnumStart: "2026-04-05", selfEnumEnd: "2026-04-19", houseListingStart: "2026-04-20", houseListingEnd: "2026-05-19" },
  { id: 5, state: "Jharkhand", selfEnumStart: "2026-05-01", selfEnumEnd: "2026-05-15", houseListingStart: "2026-05-16", houseListingEnd: "2026-06-14" },
  { id: 6, state: "Karnataka", selfEnumStart: "2026-04-01", selfEnumEnd: "2026-04-15", houseListingStart: "2026-04-16", houseListingEnd: "2026-05-15" },
  { id: 7, state: "Kerala", selfEnumStart: "2026-06-16", selfEnumEnd: "2026-06-30", houseListingStart: "2026-07-01", houseListingEnd: "2026-07-30" },
  { id: 8, state: "Maharashtra", selfEnumStart: "2026-05-01", selfEnumEnd: "2026-05-15", houseListingStart: "2026-05-16", houseListingEnd: "2026-06-14" },
  { id: 9, state: "Odisha", selfEnumStart: "2026-04-01", selfEnumEnd: "2026-04-15", houseListingStart: "2026-04-16", houseListingEnd: "2026-05-15" },
  { id: 10, state: "Rajasthan", selfEnumStart: "2026-05-01", selfEnumEnd: "2026-05-15", houseListingStart: "2026-05-16", houseListingEnd: "2026-06-14" },
  { id: 11, state: "Sikkim", selfEnumStart: "2026-04-01", selfEnumEnd: "2026-04-15", houseListingStart: "2026-04-16", houseListingEnd: "2026-05-15" },
  { id: 12, state: "Tamil Nadu", selfEnumStart: "2026-07-17", selfEnumEnd: "2026-07-31", houseListingStart: "2026-08-01", houseListingEnd: "2026-08-30" },
  { id: 13, state: "Uttar Pradesh", selfEnumStart: "2026-05-07", selfEnumEnd: "2026-05-21", houseListingStart: "2026-05-22", houseListingEnd: "2026-06-20" },
];
