import { useMemo } from "react";
import useAddressSearch from "./useAddressSearch";
import sortByDistance from "./sortByDistance";

type Coordinates = { lat: number; lng: number };

/**
 * Combines address search with distance sorting.
 *
 * @param items - The items to sort.
 * @param getCoordinates - Extracts lat/lng from an item, or returns null.
 *   Must be wrapped in useCallback by the caller.
 */
const useAddressSorting = <T>(
  items: T[],
  getCoordinates: (item: T) => Coordinates | null
) => {
  const addressSearch = useAddressSearch();

  const sortedItems = useMemo(
    () =>
      sortByDistance(items, addressSearch.selectedAddress, getCoordinates),
    [items, addressSearch.selectedAddress, getCoordinates]
  );

  return {
    ...addressSearch,
    sortedItems
  };
};

export default useAddressSorting;
