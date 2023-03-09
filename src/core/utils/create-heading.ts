export type HeadingLevelType = "h2" | "h3" | "h4" | "h5";

// dynamically generate heading level
export const createHeading = (headingLevel: HeadingLevelType) =>
  headingLevel as keyof JSX.IntrinsicElements;
