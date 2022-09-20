import { store } from "../../store";

interface ConfigPossibilities {
  fbs: string;
  publizon: string;
}

export const configTypes: ConfigPossibilities = {
  fbs: "fbsBaseUrl",
  publizon: "publizonBaseUrl"
} as const;

export const getFectcherUrl = (endpoint: string) => {
  const {
    url: { data: appUrls }
  } = store.getState();

  return appUrls[endpoint];
};
