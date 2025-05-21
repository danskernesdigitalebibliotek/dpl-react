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
 * The sizes used in the CSS classes for styling.
 * See the design system for the exact values.
 */
export type DisplaySize =
  | "2xsmall"
  | "xsmall"
  | "small"
  | "medium"
  | "large"
  | "xlarge";

/**
 * Maps `DisplaySize` (used in layout) to the closest available
 * GraphQL image size key (`FbiCoverImageSizeKey`).
 *
 * Some sizes like "2xsmall" and "xlarge" are approximated because
 * the GraphQL API only supports: "xSmall", "small", "medium", "large".
 */
export const displaySizeToGraphQLKey: Record<
  DisplaySize,
  FbiCoverImageSizeKey
> = {
  "2xsmall": "xSmall",
  xsmall: "xSmall",
  small: "small",
  medium: "medium",
  large: "large",
  xlarge: "large"
};
/**
 * Maps GraphQL size keys (`FbiCoverImageSizeKey`) to corresponding
 * CSS class suffixes like `cover--size-xsmall`.
 *
 * This resolves naming mismatches like `xSmall` (API) → `xsmall` (CSS).
 */
export const graphQLKeyToCssSize: Record<FbiCoverImageSizeKey, string> = {
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
