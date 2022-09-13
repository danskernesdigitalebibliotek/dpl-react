import configuration, { getDeviceConf } from "../../core/configuration";

interface PageSizeDataAttributes {
  desktop: number;
  mobile: number;
}

export const getPageSizeFromDataAttributes = ({
  desktop,
  mobile
}: PageSizeDataAttributes) => {
  const { pageSize } = getDeviceConf("pageSize", {
    pageSize: {
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
  const { pageSize } = getDeviceConf("pageSize", configuration);
  return Number(pageSize);
};

export const getPageSize = (pageSizes: Partial<PageSizeDataAttributes>) => {
  const { desktop, mobile } = pageSizes;
  let pageSize = 0;
  if (desktop && mobile) {
    pageSize = getPageSizeFromDataAttributes(
      pageSizes as PageSizeDataAttributes
    );
  } else {
    pageSize = getPageSizeFromConfiguration();
  }

  return pageSize;
};
export default {};
