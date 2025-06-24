import { first } from "lodash";
import type {
  Cover as GraphQLCover,
  Manifestation as GraphQLManifestation
} from "../../core/dbc-gateway/generated/graphql";
import { Manifestation } from "../../core/utils/types/entities";
import { Pid } from "../../core/utils/types/ids";
import {
  CoverIdType,
  FbiCoverImageSizeKey,
  DisplaySize,
  graphQLKeyToCssSize
} from "./cover.types";

type GraphQLCoverData = Pick<GraphQLManifestation, "pid" | "cover">;

/**
 * Resolves the final display size for styling.
 * Uses provided `displaySize`, or maps the API `size` to a valid CSS-safe string.
 */
export function getCoverDisplaySize({
  displaySize,
  size
}: {
  displaySize?: DisplaySize;
  size: FbiCoverImageSizeKey;
}): DisplaySize {
  return displaySize ?? graphQLKeyToCssSize[size];
}

const getUrl = (
  cover: GraphQLCover | null | undefined,
  size: FbiCoverImageSizeKey
): string | null => {
  return cover?.[size]?.url ?? null;
};

const coverDataRemoveEmptyCovers = ({
  coverData,
  size
}: {
  coverData: GraphQLCoverData[];
  size: FbiCoverImageSizeKey;
}): GraphQLCoverData[] => {
  if (!coverData) return [];

  return coverData.filter((item) => !!getUrl(item.cover, size));
};

export const getCoverUrl = ({
  coverData,
  bestRepresentation,
  size
}: {
  coverData: GraphQLCoverData[];
  bestRepresentation?: Manifestation;
  size: FbiCoverImageSizeKey;
}) => {
  if (!coverData) {
    return null;
  }

  // Make sure we only have covers in our data that has a url in the given size.
  const covers = coverDataRemoveEmptyCovers({ coverData, size });
  // Get the first cover which we can use as a fallback cover.
  const firstCover = first(covers);

  // If no best representation has been given use first cover if available.
  if (!bestRepresentation && firstCover && getUrl(firstCover.cover, size)) {
    return getUrl(firstCover.cover, size);
  }

  // See if we can find a cover that has same id as the best representation id.
  const bestRepresentationCover = first(
    covers.filter((item) => bestRepresentation?.pid === item.pid)
  );
  // If we have a best representation cover in the given size use that.
  if (bestRepresentationCover && getUrl(bestRepresentationCover.cover, size)) {
    return getUrl(bestRepresentationCover.cover, size);
  }

  // If the best representation method failed we try the first cover.
  if (firstCover && getUrl(firstCover.cover, size)) {
    return getUrl(firstCover.cover, size);
  }

  // Everything else failed. We don't know what to do 🤷.
  return null;
};

/**
 * Filters out null entries from a list of manifestations.
 * Use when GraphQL returns `(Manifestation | null)[]`.
 */
export function filterNonNullManifestations<T>(
  manifestations: (T | null | undefined)[] | null | undefined
): T[] {
  return manifestations?.filter((m): m is T => m != null) ?? [];
}

/**
 * Converts a list of ISBNs into a CQL query string,
 * i.e. "term.isbn=9781 OR term.isbn=9782".
 * Used when resolving a PID via the best representation query.
 */
export const createIsbnCql = (ids: (string | number)[] = []) =>
  ids.length ? ids.map((id) => `term.isbn=${id}`).join(" OR ") : "";

/**
 * Resolves the list of PIDs to use when fetching covers.
 * - For `pid`, returns the raw `ids` array.
 * - For `isbn`, returns an array with the resolved PID if available.
 */
export function resolveCoverPidValues({
  idType,
  ids,
  resolvedIsbnPid
}: {
  idType: CoverIdType;
  ids?: (Pid | string)[];
  resolvedIsbnPid?: string;
}): string[] {
  if (idType === "isbn") {
    return resolvedIsbnPid ? [resolvedIsbnPid] : [];
  }

  return Array.isArray(ids) ? (ids as Pid[]) : [];
}

export default {};

// ************** VITEST ***************
export const coverImageUrls = {
  xSmall:
    "https://fbiinfo-present.dbc.dk/images/OFkgpMOxSKmmt25AzzxAVw/120px!AIw2BkPOLypFEqL1vHy1yBKouHF-HNcXWWoIyBuG00fdtw",
  small:
    "https://fbiinfo-present.dbc.dk/images/OFkgpMOxSKmmt25AzzxAVw/240px!AIw-TQ9oCb7zdDSJjkBiw6jkSDQS8nTg5n_uSZweQTK12Q",
  medium:
    "https://fbiinfo-present.dbc.dk/images/OFkgpMOxSKmmt25AzzxAVw/480px!AIyr0djl0iG3rFEf29ecuiCXPXmHQPBheE83TYngKX_OHQ",
  large:
    "https://fbiinfo-present.dbc.dk/images/OFkgpMOxSKmmt25AzzxAVw/960px!AIwcwpzg_AMmUzDNPm_6frtTRgiUYiSpIQY0GBRgMjTI0A"
};
if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;

  const coverData = [
    {
      pid: "1-somestring:2",
      cover: {
        small: {
          url: "url1"
        },
        large: {
          url: null
        }
      }
    },
    {
      pid: "3-somestring:4",
      cover: {
        small: {
          url: "url2"
        }
      }
    },
    {
      pid: "4-somestring:5",
      cover: {
        small: {
          url: null
        }
      }
    }
  ];

  describe("Testing getCoverUrl function with no best representation given", () => {
    it("Should show first cover if cover is available in size given", () => {
      const url = getCoverUrl({
        coverData,
        size: "small"
      });
      expect(url).toBe("url1");
    });

    it("Should return null if the size is available but the url is null", () => {
      const url = getCoverUrl({
        coverData,
        size: "large"
      });
      expect(url).toBeNull();
    });

    it("Should return null if the size does not exist", () => {
      const url = getCoverUrl({
        coverData,
        size: "medium"
      });
      expect(url).toBe(null);
    });
    it("Should return null if there are no covvers in data", () => {
      const url = getCoverUrl({
        coverData: [],
        size: "small"
      });
      expect(url).toBeNull();
    });
  });

  describe("Testing getCoverUrl function with a best representation given", () => {
    it("Should show the best representation cover if size matches", () => {
      type GetCoverUrlParams = Parameters<typeof getCoverUrl>[0];
      const bestRepresentation = {
        genreAndForm: ["Book"],
        pid: "3-somestring:4"
      };

      const url = getCoverUrl({
        coverData,
        size: "small",
        bestRepresentation
      } as GetCoverUrlParams);
      expect(url).toBe("url2");
    });
    it("Should show the first cover if size matches the best representation cover but url is null", () => {
      type GetCoverUrlParams = Parameters<typeof getCoverUrl>[0];
      const bestRepresentation = {
        genreAndForm: ["Book"],
        pid: "4-somestring:5"
      };

      const url = getCoverUrl({
        coverData,
        size: "small",
        bestRepresentation
      } as GetCoverUrlParams);
      expect(url).toBe("url1");
    });
    it("Should show the first cover if size matches the best representation cover but url is null", () => {
      type GetCoverUrlParams = Parameters<typeof getCoverUrl>[0];
      const bestRepresentation = {
        genreAndForm: ["Book"],
        pid: "4-somestring:5"
      };

      const url = getCoverUrl({
        coverData,
        size: "small",
        bestRepresentation
      } as GetCoverUrlParams);
      expect(url).toBe("url1");
    });
  });
}
