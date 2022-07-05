import { isMobile } from "react-device-detect";
import search from "./search.json";

type ConfScope = "search";
type Device = "mobile" | "desktop";
type ConfigurationEntry = {
  [key: string]: string | number | Record<string, unknown>;
};
export type Configuration = {
  [confScope: string]: Record<string, unknown>;
};

export const getConf = (
  type: ConfScope,
  configuration: Configuration,
  device?: Device
) => {
  const subConf = configuration[type];

  if (device) {
    return subConf[device] as ConfigurationEntry;
  }
  return subConf as ConfigurationEntry;
};

export const getDeviceConf = (
  type: ConfScope,
  configuration: Configuration
) => {
  const device: Device = isMobile ? "mobile" : "desktop";

  return getConf(type, configuration, device);
};

export default {
  search
} as Configuration;
