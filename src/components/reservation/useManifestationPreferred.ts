import { useState, useEffect } from "react";
import { useGetAvailabilityV3 } from "../../core/fbs/fbs";
import { convertPostIdToFaustId } from "../../core/utils/helpers/general";
import { FaustId, Pid } from "../../core/utils/types/ids";

const useManifestationPreferred = (
  faustIds: FaustId[],
  mainManifestationPid: Pid
) => {
  const [isOtherManifestationPreferred, setIsOtherManifestationPreferred] =
    useState(false);

  const { data: availabilityData } = useGetAvailabilityV3({
    recordid: faustIds
  });

  useEffect(() => {
    if (availabilityData) {
      const reservableData = availabilityData.filter(
        (manifestation) => manifestation.reservable
      );

      const sortedReservableData = reservableData.sort((a, b) => {
        return a.reservations - b.reservations;
      });

      const leastReservedData = sortedReservableData.shift();

      if (
        leastReservedData?.recordId !==
        convertPostIdToFaustId(mainManifestationPid)
      ) {
        setIsOtherManifestationPreferred(true);
      }
    }
  }, [availabilityData, mainManifestationPid]);

  return { isOtherManifestationPreferred };
};

export default useManifestationPreferred;
