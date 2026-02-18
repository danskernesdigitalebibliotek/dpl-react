import LocationIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Location.svg";
import WarningIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-warning.svg";
import React from "react";
import GSearchInput from "../gsearch-input/GSearchInput";
import { AddressWithCoordinates } from "../../core/address-lookup/gsearch-requests";

type AddressSearchBarProps = {
  id: string;
  label: string;
  placeholder: string;
  buttonText: string;
  query: string;
  onQueryChange: (query: string) => void;
  onAddressSelect: (address: AddressWithCoordinates) => void;
  onGetUserLocation: () => void;
  geoLocationError: string | null;
};

const AddressSearchBar = ({
  id,
  label,
  placeholder,
  buttonText,
  query,
  onQueryChange,
  onAddressSelect,
  onGetUserLocation,
  geoLocationError
}: AddressSearchBarProps) => (
  <div className="address-search-bar">
    <GSearchInput
      id={id}
      label={label}
      placeholder={placeholder}
      query={query}
      onQueryChange={onQueryChange}
      onAddressSelect={onAddressSelect}
    />
    <button
      type="button"
      onClick={onGetUserLocation}
      className="address-search-bar__location-button"
    >
      <img src={LocationIcon} alt="" />
      <p>{buttonText}</p>
    </button>
    {geoLocationError && (
      <div className="address-search-bar__error-message" role="alert">
        <img src={WarningIcon} alt="" />
        <p>{geoLocationError}</p>
      </div>
    )}
  </div>
);

export default AddressSearchBar;
