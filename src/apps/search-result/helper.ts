import { head } from "lodash";
import { FacetField } from "../../core/dbc-gateway/generated/graphql";
import { Filter } from "../../core/filter.slice";
import { getMaterialTypes } from "../../core/utils/helpers/general";
import { Manifestation } from "../../core/utils/types/entities";
import { ManifestationMaterialType } from "../../core/utils/types/material-type";

export const getFirstMaterialTypeFromFilters = (
  filters: Filter,
  manifestations: Manifestation[]
) => {
  const materialTypeFilter = head(
    Object.keys(filters[FacetField.MaterialTypesSpecific] || {}).sort()
  ) as ManifestationMaterialType;
  const allMaterialTypes = getMaterialTypes(manifestations);
  return materialTypeFilter && allMaterialTypes.includes(materialTypeFilter)
    ? materialTypeFilter
    : undefined;
};

export const shouldShowInvalidSearchPage = (
  q: string,
  qUrlParameter: string | null
) => {
  return (
    (!qUrlParameter && !q) || (!qUrlParameter && q === "null") || q.length < 3
  );
};

export default {};
