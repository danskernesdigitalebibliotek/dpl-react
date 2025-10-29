import LocationIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Location.svg";
import WarningIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-warning.svg";
import DawaInput from "../../components/dawa-input/DawaInput";
import React, { useState, useMemo } from "react";
import clsx from "clsx";
import { useText } from "../../core/utils/text";
import {
  DawaAddress,
  getReverseGeocode
} from "../../core/address-lookup/dawa-reqests";
import { calculateDistanceBetweenTwoCoordinates } from "./helper";
import { getCurrentPosition } from "../../core/geo-location/geo-location";

type FindLibraryDialogProps = {
  branches?: Array<{
    branchId: string;
    title: string;
    location?: {
      lat: string;
      lng: string;
      value: string;
      address: string;
      city: string;
    };
  }>;
  selectedBranchId?: string;
  handleBranchSelect?: (branchId: string) => void;
};

function FindLibraryDialog({
  branches,
  selectedBranchId,
  handleBranchSelect
}: FindLibraryDialogProps) {
  const [selectedDawaAddress, setSelectedDawaAddress] =
    useState<DawaAddress | null>(null);
  const [geoLocationError, setGeoLocationError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const t = useText();

  const handleOnClick = (branchId: string) => {
    if (handleBranchSelect) {
      handleBranchSelect(branchId);
    }
  };

  const handleDawaAddressSelect = (address: DawaAddress) => {
    setSelectedDawaAddress(address);
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
        setSelectedDawaAddress(address);
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
    if (!branches || !selectedDawaAddress?.lat || !selectedDawaAddress?.lng) {
      return branches?.map((branch) => ({ branch, distance: null })) || [];
    }

    const branchesWithDistances = branches.map((branch) => {
      const lat = branch.location?.lat ? parseFloat(branch.location.lat) : null;
      const lng = branch.location?.lng ? parseFloat(branch.location.lng) : null;

      const distance =
        lat && lng
          ? calculateDistanceBetweenTwoCoordinates(
              selectedDawaAddress.lat,
              selectedDawaAddress.lng,
              lat,
              lng
            )
          : null;

      return { branch, distance };
    });
    const sortedBranches = branchesWithDistances.sort((a, b) => {
      if (a.distance === null) return 1;
      if (b.distance === null) return -1;
      return a.distance - b.distance;
    });
    return sortedBranches;
  }, [branches, selectedDawaAddress]);

  return (
    <div className="find-library-dialog">
      <p className="find-library-dialog__title">
        {t("findLibraryDialogTitleText")}
      </p>
      <div className="find-library-dialog__location-group">
        <DawaInput
          id="address-input"
          label={t("findLibraryDialogDawaInputLabelText")}
          placeholder={t("findLibraryDialogDawaInputPlaceholderText")}
          type="text"
          query={query}
          onQueryChange={(query) => setQuery(query)}
          onDawaAddressSelect={(address) => {
            handleDawaAddressSelect(address);
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
          <div className="find-library-dialog__error-message">
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
          return (
            <button
              type="button"
              onClick={() => handleOnClick(branch.branchId)}
              key={branch.branchId}
              className={clsx("find-library-dialog__location-list__item", {
                "find-library-dialog__location-list__item--selected":
                  branch.branchId === selectedBranchId
              })}
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
