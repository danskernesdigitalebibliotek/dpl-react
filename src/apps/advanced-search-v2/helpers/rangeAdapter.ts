import { RangeValue } from "../types";

const parseToNumber = (value: string | undefined): number | null => {
  const parsed = parseInt(value ?? "", 10);
  return isNaN(parsed) ? null : parsed;
};

export const parseRangeFromStrings = (values: string[]): RangeValue => ({
  from: parseToNumber(values[0]),
  to: parseToNumber(values[1])
});

export const rangeToStrings = (range: RangeValue): string[] =>
  [range.from, range.to].filter((v): v is number => v !== null).map(String);
