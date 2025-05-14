import { Cover, CoverDetails } from "../../core/dbc-gateway/generated/graphql";
import { Pid } from "../../core/utils/types/ids";
import { CoverImageSizeKey, DisplaySize } from "./cover.types";

/**
 * Maps a `DisplaySize` (used in styling/layout) to the corresponding
 * GraphQL image size key (`CoverImageSizeKey`) used to fetch the image.
 */
export const displaySizeToImageSizeKey: Record<DisplaySize, CoverImageSizeKey> =
  {
    "2xsmall": "small", // fallback to smallest image available
    xsmall: "xSmall",
    small: "small",
    medium: "medium",
    large: "large",
    xlarge: "large" // no xLarge field in API, use large
  };

/**
 * Maps GraphQL size keys (`CoverImageSizeKey`) to corresponding
 * CSS class suffixes like `cover--size-xsmall`.
 *
 * This resolves naming mismatches like `xSmall` (API) → `xsmall` (CSS).
 */
export const coverImageSizeKeyToClassName: Record<CoverImageSizeKey, string> = {
  xSmall: "xsmall",
  small: "small",
  medium: "medium",
  large: "large"
};

/**
 * Resolves the final display size for styling.
 * Uses provided `displaySize`, or maps the API `size` to a valid CSS-safe string.
 */
export function getCoverDisplaySize({
  displaySize,
  size
}: {
  displaySize?: DisplaySize;
  size: CoverImageSizeKey;
}): DisplaySize {
  if (displaySize) return displaySize;

  return coverImageSizeKeyToClassName[size] as DisplaySize;
}

function isValidUrl(coverDetail?: CoverDetails | null): boolean {
  return (
    typeof coverDetail?.url === "string" && coverDetail.url.trim().length > 0
  );
}

/**
 * Tries to return a valid image URL from a `Cover` object.
 * Starts with the requested size and falls back to other available sizes.
 */
export function getCoverUrl(
  cover: Cover | null | undefined,
  requestedSize: CoverImageSizeKey
): string | null {
  if (!cover) return null;

  const fallbackOrder: CoverImageSizeKey[] = [
    requestedSize,
    "large",
    "medium",
    "small",
    "xSmall"
  ];

  for (const size of fallbackOrder) {
    const candidate = cover[size];
    if (isValidUrl(candidate)) {
      console.log("Found validcandidate", candidate, "for size", size);
      return candidate!.url!;
    }
  }

  return null;
}

/**
 * Asserts that the given value is a valid Pid and returns it typed as Pid.
 * Throws an error in development if not valid.
 *
 */
const pidPattern = /^\d+-[^:]+:[^:]+$/;
export function assertIsValidPid(value: unknown): Pid {
  if (typeof value !== "string" || !pidPattern.test(value)) {
    if (process.env.NODE_ENV !== "production") {
      throw new Error(
        `Invalid PID in function [assertIsValidPid]: ${String(value)}`
      );
    }
  }

  return value as Pid;
}

// ************** VITEST ***************
export const coverImageUrls = {
  xSmall:
    "https://fbiinfo-present.dbc.dk/images/fqQUCHhgRESy6YUbqwImuQ/120px!AH7opMKAJfSMeS7gteYE91wntAyWm-CpSfewRK66ABrDyQ",
  small:
    "https://fbiinfo-present.dbc.dk/images/fqQUCHhgRESy6YUbqwImuQ/240px!AH5dN1m-qZdHin3coYuZtXSJ20_3Z9qVWW3AXHVo4B8gPA",
  medium:
    "https://fbiinfo-present.dbc.dk/images/fqQUCHhgRESy6YUbqwImuQ/480px!AH7Pm6IQwQwifW3y9LX8dw157u10Mbg8lFAquSfoksBpiA",
  large:
    "https://fbiinfo-present.dbc.dk/images/fqQUCHhgRESy6YUbqwImuQ/960px!AH4Bk_tNuPyiLxLT-hjGqsfpHN__fU1H9-AfE-d_eYRSbw"
};
if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;

  const baseCoverData: Cover = {
    __typename: "Cover",
    xSmall: {
      __typename: "CoverDetails",
      url: coverImageUrls.xSmall,
      width: 120,
      height: 188
    },
    small: {
      __typename: "CoverDetails",
      url: coverImageUrls.small,
      width: 240,
      height: 377
    },
    medium: {
      __typename: "CoverDetails",
      url: coverImageUrls.medium,
      width: 480,
      height: 754
    },
    large: {
      __typename: "CoverDetails",
      url: coverImageUrls.large,
      width: 500,
      height: 785
    },
    detail: null,
    detail42: null,
    detail117: null,
    detail207: null,
    detail500: null,
    origin: null,
    thumbnail: null
  };

  describe("getCoverUrl – resolves cover image URLs with fallback logic", () => {
    it("returns the requested cover size URL if valid", () => {
      const url = getCoverUrl(baseCoverData, "small");
      expect(url).toBe(coverImageUrls.small);
    });

    it("returns null if requested size exists but URL is null", () => {
      const cover: Cover = {
        ...baseCoverData,
        large: { ...baseCoverData.large, url: null },
        medium: null,
        small: null,
        xSmall: null
      };
      const url = getCoverUrl(cover, "large");
      expect(url).toBeNull();
    });

    it("falls back to large when medium is missing", () => {
      const cover: Cover = {
        ...baseCoverData,
        medium: null
      };
      const url = getCoverUrl(cover, "medium");
      expect(url).toBe(coverImageUrls.large);
    });

    it("returns null if no cover is provided", () => {
      const url = getCoverUrl(null, "small");
      expect(url).toBeNull();
    });

    it("returns null if all cover sizes are missing or invalid", () => {
      const emptyCover: Cover = {
        ...baseCoverData,
        xSmall: { __typename: "CoverDetails", url: " ", width: 0, height: 0 },
        small: { __typename: "CoverDetails", url: "", width: 0, height: 0 },
        medium: null,
        large: null
      };
      const url = getCoverUrl(emptyCover, "small");
      expect(url).toBeNull();
    });

    it("falls back from medium → large if medium is missing", () => {
      const cover: Cover = {
        ...baseCoverData,
        medium: null
      };
      const url = getCoverUrl(cover, "medium");
      expect(url).toBe(coverImageUrls.large);
    });

    it("falls back from medium → xSmall if large/small are invalid", () => {
      const cover: Cover = {
        ...baseCoverData,
        medium: {
          __typename: "CoverDetails",
          url: null,
          width: 0,
          height: 0
        },
        large: {
          __typename: "CoverDetails",
          url: null,
          width: 0,
          height: 0
        },
        small: null
      };
      const url = getCoverUrl(cover, "medium");
      expect(url).toBe(coverImageUrls.xSmall);
    });

    it("returns valid URL even if width/height are missing", () => {
      const cover: Cover = {
        ...baseCoverData,
        small: {
          __typename: "CoverDetails",
          url: coverImageUrls.small,
          height: null,
          width: null
        }
      };
      const url = getCoverUrl(cover, "small");
      expect(url).toBe(coverImageUrls.small);
    });
  });
}
