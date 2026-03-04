export const argTypes = {
  branchAddressSearchEnabledConfig: {
    description: "Enable address search",
    control: { type: "text" }
  },
  addressSearchLabelText: {
    description: "Address search label",
    control: { type: "text" }
  },
  addressSearchPlaceholderText: {
    description: "Address search placeholder",
    control: { type: "text" }
  },
  addressSearchGeoLocationButtonText: {
    description: "Geolocation button text",
    control: { type: "text" }
  }
};

export default {
  branchAddressSearchEnabledConfig: "1",
  addressSearchLabelText: "See libraries near an address",
  addressSearchPlaceholderText:
    "Enter an address e.g. Torvegade 1, 1401 København K",
  addressSearchGeoLocationButtonText: "See libraries close to you"
};

export interface BranchAddressSearchArgs {
  branchAddressSearchEnabledConfig: string;
  addressSearchLabelText: string;
  addressSearchPlaceholderText: string;
  addressSearchGeoLocationButtonText: string;
}
