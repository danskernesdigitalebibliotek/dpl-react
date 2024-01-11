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

type Baseurl = typeof map[keyof typeof map];

export const resolveBaseUrl = (query?: string) => {
  if (!query) {
    return getServiceBaseUrl(map.default) as Baseurl;
  }

  return getServiceBaseUrl(
    map[query as keyof typeof map] || map.default
  ) as Baseurl;
};

export const getQueryUrlFromContext = (
  context: QueryFunctionContext | undefined
) => {
  // Get the default base url if no context.
  if (!context) {
    return resolveBaseUrl();
  }

  const { queryKey } = context;
  const [queryName] = queryKey;
  return resolveBaseUrl(queryName as string);
};

export default {};
