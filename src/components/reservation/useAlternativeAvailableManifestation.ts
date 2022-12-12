import { useState, useEffect } from "react";
import { useGetAvailabilityV3 } from "../../core/fbs/fbs";
import { AvailabilityV3 } from "../../core/fbs/model";
import { convertPostIdToFaustId } from "../../core/utils/helpers/general";
import { Manifestation, Work } from "../../core/utils/types/entities";
import { FaustId, Pid } from "../../core/utils/types/ids";

type ManifestationWithAvailability = Manifestation & AvailabilityV3;

const useAlternativeAvailableManifestation = (
  work: Work,
  currentManifestationPid: Pid
) => {
  const [isOtherManifestationPreferred, setIsOtherManifestationPreferred] =
    useState(false);
  const [otherManifestationPreferred, setOtherManifestationPreferred] =
    useState<ManifestationWithAvailability | null>(null);

  const faustIds = work.manifestations.all.map((manifestation) =>
    convertPostIdToFaustId(manifestation.pid as Pid)
  ) as FaustId[];

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

      if (leastReservedManifestation.pid !== currentManifestationPid) {
        setIsOtherManifestationPreferred(true);
        setOtherManifestationPreferred({
          ...leastReservedManifestation,
          ...leastReservedData
        });
      }
    }
  }, [availabilityData, currentManifestationPid, work]);

  return { isOtherManifestationPreferred, otherManifestationPreferred };
};

export default useAlternativeAvailableManifestation;
