import { getToken, TOKEN_LIBRARY_KEY, TOKEN_USER_KEY } from "../../token";
import {
  getServiceBaseUrl,
  serviceUrlKeys
} from "../../utils/reduxMiddleware/extractServiceBaseUrls";
import fetcherFactory from "./fetcherFactory";

const fbsFetcher = fetcherFactory(
  {
    baseUrl: getServiceBaseUrl(serviceUrlKeys.fbs)
  },
  (options) => {
    return {
      ...options,
      bearerToken: getToken(TOKEN_USER_KEY) ?? getToken(TOKEN_LIBRARY_KEY)
    };
  }
);

export default fbsFetcher;
