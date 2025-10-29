import LocationIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Location.svg";
import WarningIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-warning.svg";
import DawaInput, { DawaAddress } from "../../components/dawa-input/DawaInput";
import React, { useState, useMemo } from "react";
import clsx from "clsx";
import { useText } from "../../core/utils/text";

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

const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) => {
  // Haversine formula
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const reverseGeocode = async (
  lat: number,
  lng: number
): Promise<DawaAddress | null> => {
  try {
    const response = await fetch(
      `https://api.dataforsyningen.dk/adgangsadresser/reverse?x=${lng}&y=${lat}&struktur=mini`
    );

    if (!response.ok) {
      // TODO: translate
      throw new Error("Kunne ikke hente adresse");
    }

    const data = await response.json();

    if (data) {
      return {
        ...data,
        lat,
        lng
      };
    }

    return null;
  } catch (error) {
    // TODO: translate
    throw new Error("Kunne ikke konvertere lokation til adresse.");
  }
};

const getUserLocation = (
  onSuccess: (address: DawaAddress) => void,
  onError: (errorMessage: string) => void
) => {
  if (!navigator.geolocation) {
    // TODO: translate
    onError("Geolocation er ikke understøttet af din browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const address = await reverseGeocode(latitude, longitude);
        if (address) {
          onSuccess(address);
        }
      } catch (error) {
        onError("Kunne ikke konvertere lokation til adresse.");
      }
    },
    (error) => {
      let errorMessage = "Der opstod en fejl ved hentning af din lokation.";

      switch (error.code) {
        // TODO: translate
        case error.PERMISSION_DENIED:
          errorMessage =
            "Du har afvist adgang til din lokation. Tillad lokationsadgang i din browser.";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = "Din lokation er ikke tilgængelig i øjeblikket.";
          break;
        case error.TIMEOUT:
          errorMessage = "Anmodningen om din lokation fik timeout. Prøv igen.";
          break;
      }

      onError(errorMessage);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
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

  const handleGetUserLocation = () => {
    setGeoLocationError(null);
    getUserLocation(
      (address) => {
        setSelectedDawaAddress(address);
        setQuery(address.betegnelse || "");
      },
      (errorMessage) => {
        setGeoLocationError(errorMessage);
      }
    );
  };

  const branchesWithDistance = useMemo(() => {
    if (!branches || !selectedDawaAddress?.lat || !selectedDawaAddress?.lng) {
      return branches?.map((branch) => ({ branch, distance: null })) || [];
    }

    return branches
      .map((branch) => {
        const lat = branch.location?.lat
          ? parseFloat(branch.location.lat)
          : null;
        const lng = branch.location?.lng
          ? parseFloat(branch.location.lng)
          : null;

        const distance =
          lat && lng
            ? calculateDistance(
                selectedDawaAddress.lat,
                selectedDawaAddress.lng,
                lat,
                lng
              )
            : null;

        return { branch, distance };
      })
      .sort((a, b) => {
        if (a.distance === null) return 1;
        if (b.distance === null) return -1;
        return a.distance - b.distance;
      });
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
          {/* TODO: translate */}
          <p>Find nærmeste bibliotek ud fra din lokation</p>
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
          {/* TODO: translate */}
          Vælg bibliotek
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
