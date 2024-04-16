import { first } from "lodash";
import {
  CoverImageUrls,
  Cover as CoverType
} from "../../core/cover-service-api/model";
import { Manifestation } from "../../core/utils/types/entities";

type CoverServiceSizes = keyof CoverImageUrls;

const getUrl = (cover: CoverType, size: CoverServiceSizes) =>
  cover.imageUrls?.[size]?.url;

export const getCoverUrl = ({
  coverData,
  bestRepresentation,
  size
}: {
  coverData: CoverType[] | null | undefined;
  bestRepresentation?: Manifestation;
  size: CoverServiceSizes;
}) => {
  if (!coverData) {
    return null;
  }

  const firstCover = first(coverData);

  if (!bestRepresentation && firstCover && getUrl(firstCover, size)) {
    return getUrl(firstCover, size);
  }

  const bestRepresentationCover = first(
    coverData.filter(
      (item: CoverType) =>
        bestRepresentation && item.id === bestRepresentation.pid
    )
  );

  if (bestRepresentationCover && getUrl(bestRepresentationCover, size)) {
    return getUrl(bestRepresentationCover, size);
  }

  if (firstCover && getUrl(firstCover, size)) {
    return getUrl(firstCover, size);
  }

  return null;
};

export default {};

// ************** VITEST ***************
if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;
  const coverData = [
    {
      id: "1-somestring:2",
      imageUrls: {
        small: {
          url: "url1"
        },
        large: {
          url: null
        }
      }
    },
    {
      id: "3-somestring:4",
      imageUrls: {
        small: {
          url: "url2"
        }
      }
    },
    {
      id: "4-somestring:5",
      imageUrls: {
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
