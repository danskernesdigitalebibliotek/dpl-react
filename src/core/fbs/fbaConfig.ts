/**
 * Simple configuration wrapper to ensure correctness.
 */

export enum Options {
  baseUrl = "baseUrl"
}

const config: { [key in Options]: string } = {
  baseUrl: "https://fbs-openplatform.dbc.dk"
};

export function setConfig(type: Options, value: string) {
  config[type] = value;
}

export function getConfig(type: Options) {
  return config[type];
}

export default getConfig;
