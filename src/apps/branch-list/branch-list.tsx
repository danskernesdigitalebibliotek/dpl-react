import LocationIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Location.svg";
import WarningIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-warning.svg";
import React, { FC, useCallback } from "react";
import ContentListPage from "../../components/content-list/ContentListPage";
import ContentList from "../../components/content-list/ContentList";
import ContentListFilters from "../../components/content-list/ContentListFilters";
import ContentListItem from "../../components/content-list/ContentListItem";
import GSearchInput from "../../components/gsearch-input/GSearchInput";
import useAddressSorting from "../../core/address-lookup/useAddressSorting";
import {
  formatDistance,
  parseCoordinates
} from "../../core/utils/helpers/distance";
import { useConfig } from "../../core/utils/config";
import { useText } from "../../core/utils/text";

type Branch = {
  title: string;
  url: string;
  image?: string;
  address?: string;
  city?: string;
  lat?: string;
  lng?: string;
};

const BranchList: FC = () => {
  const config = useConfig();
  const t = useText();

  const branches = config<Branch[]>("branchesConfig", {
    transformer: "jsonParse"
  });

  const getCoordinates = useCallback(
    (branch: Branch) => parseCoordinates(branch.lat, branch.lng),
    []
  );

  const {
    query,
    handleQueryChange,
    handleAddressSelect,
    handleGetUserLocation,
    geoLocationError,
    sortedItems: branchesWithDistance
  } = useAddressSorting(branches, getCoordinates);

  return (
    <ContentListPage title={t("branchListTitleText")}>
      <ContentListFilters>
        <GSearchInput
          id="branch-list-address-input"
          label={t("branchListAddressSearchLabelText")}
          type="text"
          placeholder={t("branchListAddressSearchPlaceholderText")}
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
          <p>{t("branchListGeoLocationButtonText")}</p>
        </button>
        {geoLocationError && (
          <div className="find-library-dialog__error-message" role="alert">
            <img src={WarningIcon} alt="" />
            <p>{geoLocationError}</p>
          </div>
        )}
      </ContentListFilters>
      <ContentList>
        {branchesWithDistance.map(({ item: branch, distance }) => (
          <ContentListItem
            key={branch.url}
            url={branch.url}
            title={branch.title}
            image={branch.image}
            meta={distance !== null ? formatDistance(distance) : undefined}
          >
            {(branch.address || branch.city) && (
              <address>
                {branch.address}
                <br />
                {branch.city}
              </address>
            )}
          </ContentListItem>
        ))}
      </ContentList>
    </ContentListPage>
  );
};

export default BranchList;
