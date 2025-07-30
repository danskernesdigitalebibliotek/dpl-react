import { head } from "lodash";
import { Filter } from "../../core/filter.slice";
import { getMaterialTypes } from "../../core/utils/helpers/general";
import { Manifestation } from "../../core/utils/types/entities";
import { ManifestationMaterialType } from "../../core/utils/types/material-type";
import { FacetFieldEnum } from "../../core/dbc-gateway/generated/graphql";

export const mapFacetToFilter = (facet: FacetFieldEnum) => {
  switch (facet) {
    case FacetFieldEnum.Materialtypesspecific:
      return "materialTypesSpecific";
    case FacetFieldEnum.Worktypes:
      return "workTypes";
    case FacetFieldEnum.Creators:
      return "creators";
    case FacetFieldEnum.Subjects:
      return "subjects";
    default:
      return "invalid";
  }
};

export const getFirstMaterialTypeFromFilters = (
  filters: Filter,
  manifestations: Manifestation[]
) => {
  const materialTypeFilter = head(
    Object.keys(filters[FacetFieldEnum.Materialtypesspecific] || {}).sort()
  ) as ManifestationMaterialType;
  const allMaterialTypes = getMaterialTypes(manifestations);
  return materialTypeFilter && allMaterialTypes.includes(materialTypeFilter)
    ? materialTypeFilter
    : undefined;
};

export const formatSearchDisplayQuery = ({
  q,
  creator,
  subject,
  t
}: {
  q?: string;
  creator?: string | null;
  subject?: string | null;
  t: (key: string) => string;
}): string => {
  return [
    q,
    creator ? `${t("byAuthorText")}: ${creator}` : null,
    subject ? `${t("facetSubjectsText")}: ${subject}` : null
  ]
    .filter(Boolean)
    .join("; ");
};

export default {};
