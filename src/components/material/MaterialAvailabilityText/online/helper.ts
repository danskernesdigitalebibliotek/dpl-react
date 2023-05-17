import { UseTextFunction } from "../../../../core/utils/text";
import { ManifestationMaterialType } from "../../../../core/utils/types/material-type";

export type AvailabilityTextMap = Record<
  string,
  {
    text: string;
    count?: number;
    limit?: number;
  }
>;

export const getAvailabilityText = ({
  type,
  map,
  t
}: {
  type: ManifestationMaterialType | "materialIsIncluded";
  map: AvailabilityTextMap;
  t: UseTextFunction;
}) => {
  if (!map || !map[type]) return null;

  const { text, count, limit } = map[type];

  if (count === undefined && limit === undefined && text) {
    return t(text);
  }

  if (count !== undefined && limit !== undefined && text !== undefined) {
    return t(text, {
      placeholders: {
        "@count": count,
        "@limit": limit
      }
    });
  }

  return null;
};

export default {};
