import { serviceUrlKeys } from "../utils/reduxMiddleware/extractServiceBaseUrls";

// This map is for mapping query names to FBI service base urls.
export default {
  // Local requests.
  complexFacetSearch: serviceUrlKeys.fbiLocal,
  complexSearchWithPagination: serviceUrlKeys.fbiLocal,
  complexSuggest: serviceUrlKeys.fbiLocal,
  complexSearchWithPaginationWorkAccess: serviceUrlKeys.fbiLocal,
  getMaterial: serviceUrlKeys.fbiLocal,
  intelligentFacets: serviceUrlKeys.fbiLocal,
  recommendFromFaust: serviceUrlKeys.fbiLocal,
  searchFacet: serviceUrlKeys.fbiLocal,
  searchWithPagination: serviceUrlKeys.fbiLocal,
  suggestionsFromQueryString: serviceUrlKeys.fbiLocal,
  // Global requests.
  getInfomedia: serviceUrlKeys.fbiGlobal,
  getManifestationViaBestRepresentationByFaust: serviceUrlKeys.fbiGlobal,
  getManifestationViaMaterialByFaust: serviceUrlKeys.fbiGlobal,
  getMaterialGlobally: serviceUrlKeys.fbiGlobal,
  getReviewManifestations: serviceUrlKeys.fbiGlobal,
  getSmallWork: serviceUrlKeys.fbiGlobal,
  openOrder: serviceUrlKeys.fbiGlobal,
  // All other requests.
  default: serviceUrlKeys.fbi
} as const;
