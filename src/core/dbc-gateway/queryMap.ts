import { serviceUrlKeys } from "../utils/reduxMiddleware/extractServiceBaseUrls";

// This map is for mapping query names to FBI service base urls.
export default {
  // Search requests.
  complexSearchWithPagination: serviceUrlKeys.fbiSearch,
  complexSearchWithPaginationWorkAccess: serviceUrlKeys.fbiSearch,
  intelligentFacets: serviceUrlKeys.fbiSearch,
  recommendFromFaust: serviceUrlKeys.fbiSearch,
  searchFacet: serviceUrlKeys.fbiSearch,
  searchWithPagination: serviceUrlKeys.fbiSearch,
  suggestionsFromQueryString: serviceUrlKeys.fbiSearch,
  getMaterial: serviceUrlKeys.fbiSearch,
  // Material requests.
  getMaterialGlobally: serviceUrlKeys.fbiMaterial,
  getInfomedia: serviceUrlKeys.fbiMaterial,
  getManifestationViaBestRepresentationByFaust: serviceUrlKeys.fbiMaterial,
  getManifestationViaMaterialByFaust: serviceUrlKeys.fbiMaterial,
  getReviewManifestations: serviceUrlKeys.fbiMaterial,
  getSmallWork: serviceUrlKeys.fbiMaterial,
  openOrder: serviceUrlKeys.fbiMaterial,
  // All other requests.
  default: serviceUrlKeys.fbi
} as const;
