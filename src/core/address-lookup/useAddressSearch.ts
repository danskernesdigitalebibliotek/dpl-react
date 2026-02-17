import { useState, useCallback } from "react";
import { AddressWithCoordinates, getReverseGeocode } from "./gsearch-requests";
import { getCurrentPosition } from "../geo-location/geo-location";
import { useText } from "../utils/text";

/**
 * Shared hook for managing address search state with GSearchInput.
 *
 * Handles the query string, selected address, resetting the selection
 * when the user edits the input, and browser geolocation lookup.
 */
const useAddressSearch = () => {
  const t = useText();
  const [query, setQuery] = useState("");
  const [selectedAddress, setSelectedAddress] =
    useState<AddressWithCoordinates | null>(null);
  const [geoLocationError, setGeoLocationError] = useState<string | null>(null);

  const handleQueryChange = useCallback(
    (q: string) => {
      setQuery(q);
      if (selectedAddress && q !== selectedAddress.betegnelse) {
        setSelectedAddress(null);
      }
    },
    [selectedAddress]
  );

  const handleAddressSelect = useCallback((address: AddressWithCoordinates) => {
    setSelectedAddress(address);
    setQuery(address.betegnelse);
  }, []);

  const handleGetUserLocation = useCallback(async () => {
    setGeoLocationError(null);

    try {
      const coords = await getCurrentPosition({
        notSupported: t("geoLocationErrorNotSupportedText"),
        permissionDenied: t("geoLocationErrorPermissionDeniedText"),
        positionUnavailable: t("geoLocationErrorPositionUnavailableText"),
        timeout: t("geoLocationErrorTimeoutText"),
        default: t("geoLocationErrorDefaultText")
      });
      const { latitude, longitude } = coords;

      const address = await getReverseGeocode(latitude, longitude, {
        fetchError: t("reverseGeocodeErrorDefaultText")
      });

      if (address) {
        setSelectedAddress(address);
        setQuery(address.betegnelse || "");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : t("geoLocationErrorDefaultText");
      setGeoLocationError(errorMessage);
    }
  }, [t]);

  return {
    query,
    setQuery,
    selectedAddress,
    setSelectedAddress,
    geoLocationError,
    handleQueryChange,
    handleAddressSelect,
    handleGetUserLocation
  };
};

export default useAddressSearch;
