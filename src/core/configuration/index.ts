import { isMobile } from "react-device-detect";
import pageSize from "./page-size.json";
import pageSizeLoanList from "./page-size-loan-list.json";
import coverTints from "./cover-tints.json";
import colors from "./colors.json";
import thresholds from "./status-thresholds.json";
import modalIds from "./modal-ids.json";

export type ConfScope =
  | "pageSize"
  | "coverTints"
  | "pageSizeLoanList"
  | "colors"
  | "modalIds"
  | "thresholds";
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
  pageSize,
  coverTints,
  pageSizeLoanList,
  colors,
  thresholds,
  modalIds,
  thresholds
} as Configuration;
