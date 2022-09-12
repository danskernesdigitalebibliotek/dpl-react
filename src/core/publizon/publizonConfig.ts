/**
 * Simple configuration wrapper to ensure correctness.
 */

export enum Options {
  baseUrl = "baseUrl"
}

const config: { [key in Options]: string } = {
  baseUrl: ""
};

export function setConfig(type: Options, value: string) {
  config[type] = value;
}

export function getConfig(type: Options) {
  return config[type];
}

export default getConfig;
