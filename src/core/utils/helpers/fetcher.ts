import { store } from "../../store";

type Api = "publizon" | "fbs" | "dplCms" | "cover" | "materialList" | "fbi";
type ApiBaseUrl = `${Api}BaseUrl`;

export const configTypes: Record<Api, ApiBaseUrl> = {
  fbs: "fbsBaseUrl",
  publizon: "publizonBaseUrl",
  dplCms: "dplCmsBaseUrl",
  cover: "coverBaseUrl",
  materialList: "materialListBaseUrl",
  fbi: "fbiBaseUrl"
} as const;

const getFetcherUrl = (endpoint: string) => {
  const {
    url: { data: appUrls }
  } = store.getState();

  return appUrls[endpoint] as ApiBaseUrl | undefined;
};

export default getFetcherUrl;
