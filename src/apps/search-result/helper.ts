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
    default:
      return "invalid";
  }
};

export const getFirstMaterialTypeFromFilters = (
  filters: Filter,
  manifestations: Manifestation[]
) => {
  if (!filters || !filters.materialTypesSpecific) {
    return undefined;
  }
  const materialTypeFilter = head(
    Object.keys(filters.materialTypesSpecific)
  ) as ManifestationMaterialType;
  const allMaterialTypes = getMaterialTypes(manifestations);
  return materialTypeFilter && allMaterialTypes.includes(materialTypeFilter)
    ? materialTypeFilter
    : undefined;
};

export default {};
