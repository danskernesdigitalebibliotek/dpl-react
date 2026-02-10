import LocationIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Location.svg";
import WarningIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-warning.svg";
import React, { useState, useMemo } from "react";
import clsx from "clsx";
import { useText } from "../../core/utils/text";
import {
  AddressWithCoordinates,
  getReverseGeocode
} from "../../core/address-lookup/gsearch-requests";
import { calculateDistanceBetweenTwoCoordinates } from "./helper";
import { getCurrentPosition } from "../../core/geo-location/geo-location";
import { TBranch } from "../../core/utils/branches";
import GSearchInput from "../../components/gsearch-input/GSearchInput";

type FindLibraryDialogProps = {
  branches?: TBranch[];
  selectedBranchId?: string;
  handleBranchSelect?: (branchId: string) => void;
};

function FindLibraryDialog({
  branches,
  selectedBranchId,
  handleBranchSelect
}: FindLibraryDialogProps) {
  const [selectedAddress, setSelectedAddress] =
    useState<AddressWithCoordinates | null>(null);
  const [geoLocationError, setGeoLocationError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const t = useText();

  const handleOnClick = (branchId: string) => {
    if (handleBranchSelect) {
      handleBranchSelect(branchId);
    }
  };

  const handleAddressSelect = (address: AddressWithCoordinates) => {
    setSelectedAddress(address);
  };

  const handleGetUserLocation = async () => {
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
  };

  const branchesWithDistance = useMemo(() => {
    if (!branches || !selectedAddress?.lat || !selectedAddress?.lng) {
      return branches?.map((branch) => ({ branch, distance: null })) || [];
    }

    const branchesWithDistances = branches.map((branch) => {
      const lat = branch.location?.lat ? parseFloat(branch.location.lat) : null;
      const lng = branch.location?.lng ? parseFloat(branch.location.lng) : null;

      if (!lat || !lng) {
        return { branch, distance: null };
      }

      const distance = calculateDistanceBetweenTwoCoordinates(
        selectedAddress.lat!,
        selectedAddress.lng!,
        lat!,
        lng!
      );

      return { branch, distance };
    });

    const sortedBranches = branchesWithDistances.sort((a, b) => {
      if (a.distance === null) return 1;
      if (b.distance === null) return -1;
      return a.distance - b.distance;
    });

    return sortedBranches;
  }, [branches, selectedAddress]);

  return (
    <div className="find-library-dialog">
      <h2 className="find-library-dialog__title">
        {t("findLibraryDialogTitleText")}
      </h2>
      <div className="find-library-dialog__location-group">
        <GSearchInput
          id="address-input-2"
          label={t("findLibraryDialogDawaInputLabelText")}
          placeholder={t("findLibraryDialogDawaInputPlaceholderText")}
          type="text"
          query={query}
          onQueryChange={(query) => setQuery(query)}
          onAddressSelect={(address) => {
            handleAddressSelect(address);
            setQuery(address.betegnelse);
          }}
        />
        <button
          type="button"
          onClick={handleGetUserLocation}
          className="find-library-dialog__location"
        >
          <img src={LocationIcon} alt="" />
          <p>{t("findLibraryDialogGeoLocationButtonText")}</p>
        </button>
        {geoLocationError && (
          <div className="find-library-dialog__error-message" role="alert">
            <img src={WarningIcon} alt="" />
            <p>{geoLocationError}</p>
          </div>
        )}
      </div>
      <div className="find-library-dialog__location-list">
        <p className="find-library-dialog__location-list__title">
          {t("findLibraryDialogSuggestionsListLabelText")}
        </p>

        {branchesWithDistance?.map(({ branch, distance }) => {
          const isSelected = branch.branchId === selectedBranchId;
          return (
            <button
              type="button"
              onClick={() => handleOnClick(branch.branchId)}
              key={branch.branchId}
              className={clsx("find-library-dialog__location-list__item", {
                "find-library-dialog__location-list__item--selected": isSelected
              })}
              aria-pressed={isSelected}
            >
              <div>
                <p className="find-library-dialog__location-list__item__name">
                  {branch.title}
                </p>
                <div className="find-library-dialog__location-list__item__address">
                  <p>{branch.location?.address}</p>
                  <p>{branch.location?.city}</p>
                </div>
              </div>
              <p className="find-library-dialog__location-list__item__distance">
                {distance !== null &&
                  distance.toFixed(1).replace(".", ",") + " km"}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default FindLibraryDialog;
