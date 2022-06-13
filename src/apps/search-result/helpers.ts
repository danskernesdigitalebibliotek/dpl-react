import configuration, { getDeviceConf } from "../../core/configuration";

interface NubmerOfResultsDataAttributes {
  desktop?: number;
  mobile?: number;
}

export const getNumberOfResultItems = ({
  desktop,
  mobile
}: NubmerOfResultsDataAttributes) => {
  if (desktop && mobile) {
    return getDeviceConf("search", {
      search: {
        mobile: {
          numberOfResultItems: mobile
        },
        desktop: {
          numberOfResultItems: desktop
        }
      }
    }).numberOfResultItems;
  }

  return getDeviceConf("search", configuration).numberOfResultItems;
};

export default {};
