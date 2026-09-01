export type StateSchedule = {
  id: number;
  state: string;
  selfEnumStart: string;
  selfEnumEnd: string;
  houseListingStart: string;
  houseListingEnd: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type DataPoint = {
  label: string;
  value: string;
  description: string;
};

export type AskResult = { answer: string };
