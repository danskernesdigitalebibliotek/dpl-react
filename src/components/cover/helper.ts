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
