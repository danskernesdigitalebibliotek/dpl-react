import configuration, { getDeviceConf } from "../../core/configuration";

interface PageSizeDataAttributes {
  desktop: number;
  mobile: number;
}

export const getPageSizeFromDataAttributes = ({
  desktop,
  mobile
}: PageSizeDataAttributes) => {
  const { pageSize } = getDeviceConf("search", {
    search: {
      mobile: {
        pageSize: mobile
      },
      desktop: {
        pageSize: desktop
      }
    }
  });
  return Number(pageSize);
};

export const getPageSizeFromConfiguration = () => {
  const { pageSize } = getDeviceConf("search", configuration);
  return Number(pageSize);
};

export default {};
