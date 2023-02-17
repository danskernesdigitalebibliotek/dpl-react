import { useEffect, useState } from "react";
import { filterManifestationsByType } from "../../apps/material/helper";
import { handleFictionOrNonFictionReservation } from "../../components/reservation/helper";
import { getAvailabilityV3 } from "../fbs/fbs";
import { convertPostIdToFaustId, getAllFaustIds } from "./helpers/general";
import { Manifestation } from "./types/entities";

// TODO: add unit test see example in text.test.tsx
const UseReservableManifestations = ({
  manifestations,
  type
}: {
  manifestations: Manifestation[];
  type?: string;
}) => {
  const faustIds = getAllFaustIds(manifestations);

  const [reservableManifestations, setReservableManifestations] = useState<
    Manifestation[] | null
  >(null);
  const [unReservableManifestations, setUnReservableManifestations] = useState<
    Manifestation[] | null
  >(null);

  useEffect(() => {
    if (
      !manifestations.length ||
      reservableManifestations ||
      unReservableManifestations
    ) {
      return;
    }

    const fetchAvailability = async (m: Manifestation[]) => {
      // Fetch availability data.
      const availabilityData = await getAvailabilityV3({
        recordid: faustIds
      });
      // If we for some reason do not get any data, we return empty arrays.
      if (!availabilityData) {
        return { reservable: [], unReservable: [] };
      }

      // If type is set, filter the manifestations by the type.
      // Otherwise leave as is.
      const filterableManifestations = type
        ? filterManifestationsByType(type, m)
        : m;
      // Get manifestations that are reservable.
      const reservable = filterableManifestations.filter((manifestation) =>
        availabilityData.some(
          (item) =>
            item.reservable &&
            item.recordId === convertPostIdToFaustId(manifestation.pid)
        )
      );
      // Get manifestations that are unReservable.
      const unReservable = filterableManifestations.filter((manifestation) =>
        availabilityData.some(
          (item) =>
            !item.reservable &&
            item.recordId === convertPostIdToFaustId(manifestation.pid)
        )
      );
      return { reservable, unReservable };
    };

    fetchAvailability(manifestations).then(({ reservable, unReservable }) => {
      setReservableManifestations(
        handleFictionOrNonFictionReservation(reservable)
      );
      setUnReservableManifestations(unReservable);
    });
  }, [
    manifestations,
    faustIds,
    type,
    reservableManifestations,
    unReservableManifestations
  ]);

  return {
    reservableManifestations,
    unReservableManifestations
  };
};

export default UseReservableManifestations;
