import { head } from "lodash";
import { Filter } from "../../core/filter.slice";
import { getMaterialTypes } from "../../core/utils/helpers/general";
import { Manifestation } from "../../core/utils/types/entities";
import { ManifestationMaterialType } from "../../core/utils/types/material-type";
import { FacetFieldEnum } from "../../core/dbc-gateway/generated/graphql";

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

export default {};
