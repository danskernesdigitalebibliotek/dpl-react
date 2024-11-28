import { useEffect, useState } from "react";
import {
  getAvailability,
  filterManifestationsByType
} from "../../apps/material/helper";
import { convertPostIdToFaustId, getAllFaustIds } from "./helpers/general";
import { Manifestation } from "./types/entities";
import { AvailabilityV3 } from "../fbs/model/availabilityV3";
import { useConfig } from "./config";
import { AvailabilityV3 } from "../fbs/model/availabilityV3";

const UseReservableManifestations = ({
  manifestations,
  type
}: {
  manifestations: Manifestation[];
  type?: string;
}) => {
  const config = useConfig();
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
      let data: AvailabilityV3[] | null = null;
      try {
        data = await getAvailability({ faustIds, config });
      } catch (error) {
        // eslint-disable-next-line
        console.error("`getAvailability` error:", error);
      }

      // If we for some reason do not get any data, we return empty arrays.
      if (!data) {
        return { reservable: [], unReservable: [] };
      }

      // If type is set, filter the manifestations by the type.
      // Otherwise leave as is.
      const filterableManifestations = type
        ? filterManifestationsByType(type, m)
        : m;
      // Get manifestations that are reservable.
      const reservable = filterableManifestations.filter((manifestation) =>
        data?.some(
          (item) =>
            item.reservable &&
            item.recordId === convertPostIdToFaustId(manifestation.pid)
        )
      );
      // Get manifestations that are unReservable.
      const unReservable = filterableManifestations.filter((manifestation) =>
        data?.some(
          (item) =>
            !item.reservable &&
            item.recordId === convertPostIdToFaustId(manifestation.pid)
        )
      );
      return { reservable, unReservable };
    };

    fetchAvailability(manifestations).then(({ reservable, unReservable }) => {
      setReservableManifestations(reservable);
      setUnReservableManifestations(unReservable);
    });
  }, [
    manifestations,
    faustIds,
    type,
    reservableManifestations,
    unReservableManifestations,
    config
  ]);

  return {
    reservableManifestations,
    unReservableManifestations
  };
};

export default UseReservableManifestations;
