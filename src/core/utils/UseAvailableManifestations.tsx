import { useEffect, useState } from "react";
import { filterManifestationsByType } from "../../apps/material/helper";
import { getAvailabilityV3 } from "../fbs/fbs";
import { convertPostIdToFaustId } from "./helpers/general";
import { Manifestation } from "./types/entities";

const UseAvailableManifestations = ({
  manifestations,
  type
}: {
  manifestations: Manifestation[];
  type?: string;
}) => {
  const faustIds = manifestations.map(({ pid }) => convertPostIdToFaustId(pid));

  const [availableManifestations, setAvailableManifestations] = useState<
    Manifestation[] | null
  >(null);
  const [unAvailableManifestations, setUnAvailableManifestations] = useState<
    Manifestation[] | null
  >(null);

  useEffect(() => {
    if (
      !manifestations.length ||
      availableManifestations ||
      unAvailableManifestations
    ) {
      return;
    }

    const fetchAvailability = async () => {
      // Fetch availability data.
      const data = await getAvailabilityV3({
        recordid: faustIds
      });
      // If we for some reason do not get any data, we return empty arrays.
      if (!data) {
        return { available: [], unavailable: [] };
      }

      // Get manifestations that are available.
      const available = manifestations.filter((manifestation) =>
        data.some(
          (item) =>
            item.available &&
            item.recordId === convertPostIdToFaustId(manifestation.pid)
        )
      );
      // Get manifestations that are unavailable.
      const unavailable = manifestations.filter((manifestation) =>
        data.some(
          (item) =>
            !item.available &&
            item.recordId === convertPostIdToFaustId(manifestation.pid)
        )
      );
      return { available, unavailable };
    };

    fetchAvailability().then(({ available, unavailable }) => {
      // If type is set, filter the available and unavailable manifestations by the type.
      if (type) {
        setAvailableManifestations(filterManifestationsByType(type, available));
        setUnAvailableManifestations(
          filterManifestationsByType(type, unavailable)
        );
        return;
      }
      // Otherwise set the available and unavailable manifestations as is.
      setAvailableManifestations(available);
      setUnAvailableManifestations(unavailable);
    });
  }, [
    manifestations,
    faustIds,
    type,
    availableManifestations,
    unAvailableManifestations
  ]);

  return {
    availableManifestations,
    unAvailableManifestations
  };
};

export default UseAvailableManifestations;
