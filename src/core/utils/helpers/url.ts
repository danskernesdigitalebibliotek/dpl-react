import { WorkId } from "../types/ids";

export const getCurrentLocation = () => String(window.location);

export const appendQueryParametersToUrl = (
  path: URL,
  parameters: { [key: string]: string },
  base?: string
) => {
  const location = new URL(path, base ?? getCurrentLocation());
  Object.keys(parameters).forEach((key) => {
    location.searchParams.append(key, parameters[key]);
  });

  return location;
};

export const getUrlQueryParam = (param: string): null | string => {
  const queryParams = new URLSearchParams(window.location.search);
  return queryParams.get(param);
};

export const redirect = (url: URL): void => {
  window.location.replace(url);
};

export const constructUrlWithPlaceholder = (
  url: string,
  placeholderName: string,
  replacement: string
) => {
  const regex = new RegExp(`${placeholderName}`, "g");
  const placeholders = url.match(regex);

  if (!placeholders) {
    return url;
  }

  return url.replace(regex, replacement);
};

export const processUrlPlaceholders = (
  url: string,
  placeholders: [string, string][]
) => {
  let processedUrl = url;

  placeholders.forEach((placeholder) => {
    const [name, replacement] = placeholder;
    processedUrl = constructUrlWithPlaceholder(processedUrl, name, replacement);
  });

  return processedUrl;
};

export const constructMaterialPath = (
  materialUrl: URL,
  workId: WorkId,
  type?: string
) => {
  // Replace placeholders with values.
  const path = processUrlPlaceholders(String(materialUrl), [
    [":workid", workId]
  ]);

  // Append type if specified.
  if (type) {
    return new URL(
      appendQueryParametersToUrl(new URL(path), {
        type
      }),
      getCurrentLocation()
    );
  }

  return new URL(path, getCurrentLocation());
};

export const constructSearchPath = (searchUrl: URL, q: string) =>
  appendQueryParametersToUrl(searchUrl, {
    q
  });

export const turnUrlStringsIntoObjects = (urls: { [key: string]: string }) => {
  return Object.keys(urls).reduce(
    (acc: { [key: string]: URL }, key: string) => {
      return {
        ...acc,
        [key]: new URL(urls[key], getCurrentLocation())
      };
    },
    {}
  );
};
