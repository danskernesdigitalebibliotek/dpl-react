export const getCurrentLocation = () => String(window.location);

export const appendQueryParametersToPath = (
  path: string,
  parameters: { [key: string]: string },
  base?: string
) => {
  const location = new URL(path, base ?? getCurrentLocation());
  Object.keys(parameters).forEach((key) => {
    location.searchParams.append(key, parameters[key]);
  });

  return String(location);
};

export const getUrlQueryParam = (param: string): null | string => {
  const queryParams = new URLSearchParams(window.location.search);
  return queryParams.get(param);
};

export const redirect = (url: string): void => {
  window.location.replace(url);
};
