import React, { FC } from "react";
import ContentListPage from "../../components/content-list/ContentListPage";
import ContentList from "../../components/content-list/ContentList";
import ContentListFilters from "../../components/content-list/ContentListFilters";
import ContentListItem from "../../components/content-list/ContentListItem";
import BranchListItem from "../../components/content-list/BranchListItem";
import AddressSearchBar from "../../components/address-search-bar/AddressSearchBar";
import useAddressSearch from "../../core/address-lookup/useAddressSearch";
import sortByDistance from "../../core/address-lookup/sortByDistance";
import {
  formatDistance,
  parseCoordinates
} from "../../core/utils/helpers/distance";
import { useConfig } from "../../core/utils/config";
import { useText } from "../../core/utils/text";
import { isConfigValueOne } from "../../components/reservation/helper";

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

  const isAddressSearchEnabled = isConfigValueOne(
    config("branchAddressSearchEnabledConfig")
  );

  const {
    query,
    handleQueryChange,
    handleAddressSelect,
    handleGetUserLocation,
    geoLocationError,
    selectedAddress
  } = useAddressSearch();

  const branchesWithDistance = sortByDistance(
    branches,
    selectedAddress,
    (branch: Branch) => parseCoordinates(branch.lat, branch.lng)
  );

  return (
    <ContentListPage title={t("branchListTitleText")}>
      {isAddressSearchEnabled && (
        <ContentListFilters>
          <AddressSearchBar
            id="branch-list-address-input"
            label={t("addressSearchLabelText")}
            placeholder={t("addressSearchPlaceholderText")}
            buttonText={t("addressSearchGeoLocationButtonText")}
            query={query}
            onQueryChange={handleQueryChange}
            onAddressSelect={handleAddressSelect}
            onGetUserLocation={handleGetUserLocation}
            geoLocationError={geoLocationError}
          />
        </ContentListFilters>
      )}
      <ContentList>
        {branchesWithDistance.map(({ item: branch, distance }) => (
          <ContentListItem key={branch.url}>
            <BranchListItem
              url={branch.url}
              title={branch.title}
              image={branch.image}
              address={branch.address}
              city={branch.city}
              distance={
                distance !== null ? formatDistance(distance) : undefined
              }
            />
          </ContentListItem>
        ))}
      </ContentList>
    </ContentListPage>
  );
};

export default BranchList;
