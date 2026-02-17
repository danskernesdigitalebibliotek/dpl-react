import { useMemo } from "react";
import { AddressWithCoordinates } from "./gsearch-requests";
import {
  calculateDistance,
  compareByDistance
} from "../utils/helpers/distance";

type Coordinates = { lat: number; lng: number };

/**
 * Generic hook that sorts items by distance from a selected address.
 *
 * @param items - The items to sort.
 * @param selectedAddress - The user-selected origin address (or null).
 * @param getCoordinates - Extracts lat/lng from an item, or returns null.
 *   Must be wrapped in useCallback by the caller.
 */
const useDistanceSorting = <T>(
  items: T[],
  selectedAddress: AddressWithCoordinates | null,
  getCoordinates: (item: T) => Coordinates | null
) =>
  useMemo(() => {
    if (!selectedAddress?.lat || !selectedAddress?.lng) {
      return items.map((item) => ({ item, distance: null }));
    }

    return items
      .map((item) => {
        const coords = getCoordinates(item);
        if (!coords) {
          return { item, distance: null };
        }

        const distance = calculateDistance(
          selectedAddress.lat,
          selectedAddress.lng,
          coords.lat,
          coords.lng
        );

        return { item, distance };
      })
      .sort(compareByDistance);
  }, [items, selectedAddress, getCoordinates]);

export default useDistanceSorting;
