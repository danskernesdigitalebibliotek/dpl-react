import { EnhancedStore } from "@reduxjs/toolkit";
import { Middleware } from "redux";

type Api = "publizon" | "fbs" | "dplCms" | "cover" | "materialList" | "fbi";
export type ApiBaseUrlKey = `${Api}BaseUrl`;

export const serviceUrlKeys: Record<Api, ApiBaseUrlKey> = {
  fbs: "fbsBaseUrl",
  publizon: "publizonBaseUrl",
  dplCms: "dplCmsBaseUrl",
  cover: "coverBaseUrl",
  materialList: "materialListBaseUrl",
  fbi: "fbiBaseUrl"
} as const;

type ServiceBaseUrls = Record<Api, ApiBaseUrlKey> | Record<string, string>;
type ServiceBaseUrlKey = keyof typeof serviceBaseUrls;

// ServiceBaseUrls "store". We use this to store the base urls for the different services.
let serviceBaseUrls: ServiceBaseUrls = {};

const filterUrls = (
  urls: ServiceBaseUrls,
  filterFunction: (key: string) => boolean
) =>
  Object.keys(urls)
    .filter(filterFunction)
    .reduce<Record<string, string>>((obj, key) => {
      return { ...obj, ...{ [key]: urls[key as Api] } };
    }, {});

// Redux middleware that extracts the service base urls from the action
// and stores them in the serviceBaseUrls "store".
const extractServiceBaseUrls: Middleware<
  Record<string, never>,
  EnhancedStore
> = () => (next) => (action) => {
  if (String(action.type) === "url/addUrlEntries") {
    const {
      payload: { entries }
    } = action;

    // Get all service base urls and put them in the serviceBaseUrls "store".
    serviceBaseUrls = filterUrls(entries, (key) =>
      Object.values(serviceUrlKeys).includes(key as ApiBaseUrlKey)
    );
    // Get the rest of the urls.
    const otherUrls = filterUrls(
      entries,
      (key) => !Object.values(serviceUrlKeys).includes(key as ApiBaseUrlKey)
    );

    // Dispatch the urls without the base urls.
    return next({
      ...action,
      payload: { entries: otherUrls }
    });
  }

  return next(action);
};

export const getServiceBaseUrl = (apiBaseUrlKey: ApiBaseUrlKey) => {
  if (!serviceBaseUrls[apiBaseUrlKey as ServiceBaseUrlKey]) {
    throw new Error(`Service base url for ${apiBaseUrlKey} is not defined.`);
  }
  return serviceBaseUrls[apiBaseUrlKey as ServiceBaseUrlKey];
};

export default extractServiceBaseUrls;
