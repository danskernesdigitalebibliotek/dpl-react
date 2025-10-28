import LocationIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Location.svg";
import WarningIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-warning.svg";
import DawaInput, { DawaAddress } from "../../components/dawa-input/DawaInput";
import React, { useState } from "react";
import clsx from "clsx";

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

function FindLibraryDialog({
  branches,
  selectedBranchId,
  handleBranchSelect
}: FindLibraryDialogProps) {
  const [selectedDawaAddress, setSelectedDawaAddress] =
    useState<DawaAddress | null>(null);
  const handleOnClick = (branchId: string) => {
    if (handleBranchSelect) {
      handleBranchSelect(branchId);
    }
  };

  const handleDawaAddressSelect = (address: DawaAddress) => {
    setSelectedDawaAddress(address);
  };

  return (
    <div className="find-library-dialog">
      <p className="find-library-dialog__title">Find nærmeste bibliotek</p>
      <div className="find-library-dialog__location-group">
        <DawaInput
          id="address-input"
          label="Indtast din adresse"
          placeholder="Fx Torvegade 1, 1401 København K"
          type="text"
          onDawaAddressSelect={(address) => {
            handleDawaAddressSelect(address);
          }}
        />
        <button onClick={() => {}} className="find-library-dialog__location">
          <img src={LocationIcon} alt="" />
          <p>Find nærmeste bibliotek ud fra din lokation</p>
        </button>
        {/* <div className="find-library-dialog__error-message">
          <img src={WarningIcon} alt="" />
          <p>
            Årh nej. Der er sket en fejl i afstandsmåleren. Prøv at reloade
            siden eller indtast adressen forfra.
          </p>
        </div> */}
      </div>
      <div className="find-library-dialog__location-list">
        <p className="find-library-dialog__location-list__title">
          Vælg bibliotek
        </p>

        {branches?.map((branch) => {
          return (
            <button
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
                {selectedDawaAddress &&
                  selectedDawaAddress.lat &&
                  selectedDawaAddress.lng &&
                  branch.location?.lat &&
                  branch.location?.lng &&
                  calculateDistance(
                    selectedDawaAddress.lat,
                    selectedDawaAddress.lng,
                    parseFloat(branch.location.lat),
                    parseFloat(branch.location.lng)
                  )
                    .toFixed(1)
                    .replace(".", ",") + " km"}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default FindLibraryDialog;
