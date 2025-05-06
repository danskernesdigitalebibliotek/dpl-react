import { Cover } from "../../core/dbc-gateway/generated/graphql";

/**
 * The keys in the GraphQL `Cover` object that refer to actual image sizes.
 * These are used to access the image data (`cover[sizeKey]?.url`).
 */
export type CoverImageSizeKey = Extract<
  keyof Cover,
  "xSmall" | "small" | "medium" | "large"
>;

export type DisplaySize =
  | "2xsmall"
  | "xsmall"
  | "small"
  | "medium"
  | "large"
  | "xlarge";
