import { useState } from "react";
import { useDeepCompareEffect } from "react-use";
import {
  getAllFaustIds,
  convertPostIdToFaustId
} from "../../core/utils/helpers/general";
import { AvailabilityV3 } from "../../core/fbs/model";
import { Manifestation, Work } from "../../core/utils/types/entities";
import { Pid } from "../../core/utils/types/ids";
import { useConfig } from "../../core/utils/config";
import { useGetAvailability } from "../../apps/material/helper";

type ManifestationWithAvailability = Manifestation & AvailabilityV3;

const useAlternativeAvailableManifestation = (
  work: Work,
  currentManifestationPids: Pid[]
) => {
  const config = useConfig();
  const [isOtherManifestationPreferred, setIsOtherManifestationPreferred] =
    useState(false);
  const [otherManifestationPreferred, setOtherManifestationPreferred] =
    useState<ManifestationWithAvailability | null>(null);

  const faustIds = getAllFaustIds(work.manifestations.all);
  const { data: availabilityData } = useGetAvailability({
    faustIds,
    config
  });

  useDeepCompareEffect(() => {
    if (availabilityData) {
      const reservableData = availabilityData.filter(
        (manifestation) => manifestation.reservable
      );

      const sortedReservableData = reservableData.sort((a, b) => {
        return a.reservations - b.reservations;
      });

      const leastReservedData = sortedReservableData.shift();
      if (!leastReservedData) {
        return;
      }

      const leastReservedManifestation = work.manifestations.all.find(
        (manifestation) => {
          return (
            convertPostIdToFaustId(manifestation.pid) ===
            leastReservedData.recordId
          );
        }
      );
      if (!leastReservedManifestation) {
        return;
      }

      if (!currentManifestationPids.includes(leastReservedManifestation.pid)) {
        setIsOtherManifestationPreferred(true);
        setOtherManifestationPreferred({
          ...leastReservedManifestation,
          ...leastReservedData
        });
      }
    }
  }, [availabilityData, currentManifestationPids, work]);

  return { isOtherManifestationPreferred, otherManifestationPreferred };
};

export default useAlternativeAvailableManifestation;
