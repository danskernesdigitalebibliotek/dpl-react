import { useConfig } from "../../core/utils/config";
import { FaustId } from "../../core/utils/types/ids";
import useGetAvailability from "../../core/utils/useGetAvailability";
import { ManifestationMaterialType } from "../../core/utils/types/material-type";

const usePhysicalAvailabilityData = ({
  enabled,
  faustIds,
  manifestText
}: {
  enabled: boolean;
  faustIds: FaustId[] | null;
  manifestText: string;
}) => {
  const config = useConfig();

  const response = useGetAvailability({
    faustIds: faustIds ?? [],
    config,
    options: {
      query: {
        // FBS / useGetAvailabilityV3 is responsible for handling availability
        // for physical items. This will be the majority of all materials so we
        // use this for everything except materials that are explicitly online.
        enabled:
          enabled &&
          faustIds !== null &&
          manifestText !== ManifestationMaterialType.article
      }
    }
  });

  const { isLoading, data } = response;

  // If hook is not enabled make it clear that the loading and availability status is unknown.
  if (!enabled) {
    return {
      isLoading: null,
      isAvailable: null
    };
  }

  // Articles are always available.
  if (manifestText === ManifestationMaterialType.article) {
    return {
      isLoading: false,
      isAvailable: true
    };
  }

  // If we do not have data yet, return loading state.
  if (!data) {
    return {
      isLoading,
      isAvailable: null
    };
  }

  // If we have data, check if any of the items are available.
  if (data?.some((item) => item.available)) {
    return {
      isLoading: false,
      isAvailable: true
    };
  }

  // Otherwise the manifestation is not available.
  return {
    isLoading: false,
    isAvailable: false
  };
};

export default usePhysicalAvailabilityData;
