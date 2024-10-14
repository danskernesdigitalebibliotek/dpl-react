import { useConfig } from "./config";
import { getAllFaustIds } from "./helpers/general";
import { useGetHoldings } from "../../apps/material/helper";
import { Manifestation } from "./types/entities";
import { Pid } from "./types/ids";

const useReservableFromAnotherLibrary = (
  manifestations: Manifestation[]
): {
  reservablePidsFromAnotherLibrary: Pid[];
  materialIsReservableFromAnotherLibrary: boolean;
} => {
  const config = useConfig();
  const { data: holdingsData } = useGetHoldings({
    faustIds: getAllFaustIds(manifestations),
    blacklist: "both",
    config
  });

  // If there is no holdings data or if there are holdings that are reservable, we return an empty array.
  // Because we use the array length to determine if we should show the button or not.
  if (holdingsData?.some(({ reservable }) => reservable === true)) {
    return {
      reservablePidsFromAnotherLibrary: [],
      materialIsReservableFromAnotherLibrary: false
    };
  }

  const reservablePidsFromAnotherLibrary = manifestations
    .filter(({ catalogueCodes }) =>
      catalogueCodes?.otherCatalogues.some((code) => code.startsWith("OVE"))
    )
    .map(({ pid }) => pid);

  const materialIsReservableFromAnotherLibrary = Boolean(
    reservablePidsFromAnotherLibrary.length
  );

  return {
    reservablePidsFromAnotherLibrary,
    materialIsReservableFromAnotherLibrary
  };
};

export default useReservableFromAnotherLibrary;
