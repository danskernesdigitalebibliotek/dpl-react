import { WorkId } from "../types/ids";

export const getCurrentLocation = () => String(window.location);

export const appendQueryParametersToUrl = (
  url: URL,
  parameters: { [key: string]: string }
) => {
  // We need to clone url in order not to manipulate the incoming object.
  const processedUrl = new URL(url);
  Object.keys(parameters).forEach((key) => {
    processedUrl.searchParams.set(key, parameters[key]);
  });

  return processedUrl;
};

export const getUrlQueryParam = (param: string): null | string => {
  const queryParams = new URLSearchParams(window.location.search);

  return queryParams.get(param)
    ? decodeURI(String(queryParams.get(param)))
    : null;
};

export const setQueryParametersInUrl = (parameters: {
  [key: string]: string;
}) => {
  const processedUrl = new URL(getCurrentLocation());
  Object.keys(parameters).forEach((key) => {
    processedUrl.searchParams.set(key, parameters[key]);
  });

  window.history.replaceState(null, "", processedUrl);
};

export const redirectTo = (url: URL): void => {
  window.location.assign(url);
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

export const constructMaterialUrl = (
  url: URL,
  workId: WorkId,
  type?: string
) => {
  const materialUrl = url;
  // Replace placeholders with values.
  materialUrl.pathname = processUrlPlaceholders(url.pathname, [
    [":workid", workId]
  ]);

  // Append type if specified.
  if (type) {
    return appendQueryParametersToUrl(materialUrl, { type });
  }

  return materialUrl;
};

export const constructSearchUrl = (searchUrl: URL, q: string) =>
  appendQueryParametersToUrl(searchUrl, {
    q
  });

export const constructSearchUrlWithFilter = (args: {
  searchUrl: URL;
  selectedItemString: string;
  filter: { [type: string]: string };
}) => {
  const { searchUrl, selectedItemString, filter } = args;
  return appendQueryParametersToUrl(searchUrl, {
    q: selectedItemString,
    ...filter
  });
};

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

export const replaceCurrentLocation = (replacementUrl: URL) => {
  window.history.replaceState(null, "", replacementUrl);
};

export const removeQueryParametersFromUrl = (url: URL, parameter: string) => {
  url.searchParams.delete(parameter);
  return url;
};
