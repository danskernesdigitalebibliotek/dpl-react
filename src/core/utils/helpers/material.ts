export const cleanCreatorName = (creator: string): string => {
  // Remove parentheses with birth years like "(f. 1972)" or "(f. 1805)" or "(f. 1953-02-05)"
  return creator.replace(/\s*\([^)]*\)\s*$/g, "").trim();
};
