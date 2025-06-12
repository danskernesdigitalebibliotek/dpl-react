import { Cover } from "../../core/dbc-gateway/generated/graphql";

/**
 * The keys in the GraphQL `Cover` object that refer to the actual image sizes.
 * Present in the data.
 */
export type FbiCoverImageSizeKey = Extract<
  keyof Cover,
  "xSmall" | "small" | "medium" | "large"
>;

/**
 * The sizes used in the CSS classes for styling defined in the design system.
 */
export type DisplaySize =
  | "2xsmall"
  | "xsmall"
  | "small"
  | "medium"
  | "large"
  | "xlarge";

/**
 * Maps GraphQL size keys (`FbiCoverImageSizeKey`) to corresponding
 * CSS class suffixes like `cover--size-xsmall`.
 *
 * This resolves naming mismatches like `xSmall` (API) → `xsmall` (CSS).
 */
export const graphQLKeyToCssSize: Record<FbiCoverImageSizeKey, DisplaySize> = {
  xSmall: "xsmall",
  small: "small",
  medium: "medium",
  large: "large"
};

/**
 * Supported ID types for fetching covers.
 *
 * These represent the sources by which a cover image can be looked up.
 * Currently, only `isbn` and `pid` are supported in FBI.
 *
 */
export const CoverIdTypes = {
  isbn: "isbn",
  pid: "pid"
} as const;

export type CoverIdType = (typeof CoverIdTypes)[keyof typeof CoverIdTypes];
