import { store } from "../../store";

type Api = "publizon" | "fbs" | "dplCms";
type ApiBaseUrl = `${Api}BaseUrl`;

interface ConfigPossibilities {
  fbs: ApiBaseUrl;
  publizon: ApiBaseUrl;
  dplCms: ApiBaseUrl;
}

export const configTypes: ConfigPossibilities = {
  fbs: "fbsBaseUrl",
  publizon: "publizonBaseUrl",
  dplCms: "dplCmsBaseUrl"
} as const;

export const getFetcherUrl = (endpoint: string) => {
  const {
    url: { data: appUrls }
  } = store.getState();

  return appUrls[endpoint];
};
