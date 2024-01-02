import { QueryFunctionContext } from "react-query";
import {
  getServiceBaseUrl,
  serviceUrlKeys
} from "../utils/reduxMiddleware/extractServiceBaseUrls";

const map = {
  searchWithPagination: serviceUrlKeys.fbiSearch,
  getMaterial: serviceUrlKeys.fbiMaterial,
  default: serviceUrlKeys.fbi
} as const;

const resolveBaseUrl = (query: string | null) => {
  if (!query) {
    return getServiceBaseUrl(map.default);
  }
  return getServiceBaseUrl(map[query as keyof typeof map] || map.default);
};

export const getQueryUrlFromContext = (
  context: QueryFunctionContext | undefined
) => {
  // Get the default base url if no context.
  if (!context) {
    return resolveBaseUrl(null);
  }

  const { queryKey } = context;
  const [queryName] = queryKey;
  return resolveBaseUrl(queryName as string);
};

export default {};
