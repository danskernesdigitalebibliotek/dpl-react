import LocationIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Location.svg";
import WarningIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-warning.svg";
import React, { useCallback } from "react";
import clsx from "clsx";
import { useText } from "../../core/utils/text";
import useAddressSorting from "../../core/address-lookup/useAddressSorting";
import {
  formatDistance,
  parseCoordinates
} from "../../core/utils/helpers/distance";
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
  const t = useText();

  const getCoordinates = useCallback(
    (branch: TBranch) =>
      parseCoordinates(branch.location?.lat, branch.location?.lng),
    []
  );

  const {
    query,
    geoLocationError,
    handleQueryChange,
    handleAddressSelect,
    handleGetUserLocation,
    sortedItems: sortedBranches
  } = useAddressSorting(branches || [], getCoordinates);

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
      <div className="find-library-dialog__location-group">
        <GSearchInput
          id="address-input-2"
          label={t("findLibraryDialogAddressInputLabelText")}
          placeholder={t("findLibraryDialogAddressInputPlaceholderText")}
          type="text"
          query={query}
          onQueryChange={handleQueryChange}
          onAddressSelect={handleAddressSelect}
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
