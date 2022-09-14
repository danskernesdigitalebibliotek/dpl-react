import { getDeviceConf } from "../../core/configuration";
import { getPageSizeFromConfiguration } from "../../core/utils/helpers/general";

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

export const getPageSize = (pageSizes: Partial<PageSizeDataAttributes>) => {
  const { desktop, mobile } = pageSizes;
  let pageSize = 0;
  if (desktop && mobile) {
    pageSize = getPageSizeFromDataAttributes(
      pageSizes as PageSizeDataAttributes
    );
  } else {
    pageSize = getPageSizeFromConfiguration("pageSize");
  }

  return pageSize;
};
export default {};
