import configuration, { getDeviceConf } from "../../core/configuration";

interface PageSizeDataAttributes {
  desktop?: number;
  mobile?: number;
}

export const getPageSize = ({ desktop, mobile }: PageSizeDataAttributes) => {
  if (desktop && mobile) {
    return getDeviceConf("search", {
      search: {
        mobile: {
          pageSize: mobile
        },
        desktop: {
          pageSize: desktop
        }
      }
    }).pageSize;
  }

  return getDeviceConf("search", configuration).pageSize;
};

export default {};
