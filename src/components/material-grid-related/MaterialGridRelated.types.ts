export type MaterialGridFilterType = "recommendation" | "series" | "author";

export type MaterialGridFilterOption = {
  label: string;
  value: MaterialGridFilterType;
  count?: number | null;
};
