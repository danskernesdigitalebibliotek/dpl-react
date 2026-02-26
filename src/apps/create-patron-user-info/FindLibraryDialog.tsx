import React from "react";
import clsx from "clsx";
import { useText } from "../../core/utils/text";
import useAddressSearch from "../../core/address-lookup/useAddressSearch";
import sortByDistance from "../../core/address-lookup/sortByDistance";
import {
  formatDistance,
  parseCoordinates
} from "../../core/utils/helpers/distance";
import { TBranch } from "../../core/utils/branches";
import AddressSearchBar from "../../components/address-search-bar/AddressSearchBar";

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
  const t = useText();

  const {
    query,
    geoLocationError,
    handleQueryChange,
    handleAddressSelect,
    handleGetUserLocation,
    selectedAddress
  } = useAddressSearch();

  const sortedBranches = sortByDistance(
    branches || [],
    selectedAddress,
    (branch: TBranch) =>
      parseCoordinates(branch.location?.lat, branch.location?.lng)
  );

  const handleOnClick = (branchId: string) => {
    if (handleBranchSelect) {
      handleBranchSelect(branchId);
    }
  };

  return (
    <div className="find-library-dialog">
      <h2 className="find-library-dialog__title">
        {t("findLibraryDialogTitleText")}
      </h2>
      <AddressSearchBar
        id="address-input-2"
        label={t("addressSearchLabelText")}
        placeholder={t("addressSearchPlaceholderText")}
        buttonText={t("addressSearchGeoLocationButtonText")}
        query={query}
        onQueryChange={handleQueryChange}
        onAddressSelect={handleAddressSelect}
        onGetUserLocation={handleGetUserLocation}
        geoLocationError={geoLocationError}
      />
      <div
        className="find-library-dialog__location-list"
        role="group"
        aria-labelledby="find-library-dialog-pickup-heading"
      >
        <h3
          id="find-library-dialog-pickup-heading"
          className="find-library-dialog__location-list__title"
        >
          {t("findLibraryDialogSuggestionsListLabelText")}
        </h3>

        {sortedBranches.map(({ item: branch, distance }) => {
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
                {distance !== null && formatDistance(distance)}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default FindLibraryDialog;
