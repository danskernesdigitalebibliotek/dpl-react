import React, { FC } from "react";
import { withText } from "../../core/utils/text";
import { withConfig } from "../../core/utils/config";
import BranchList from "./branch-list";

interface BranchListEntryTextProps {
  branchListTitleText: string;
  branchListAddressSearchLabelText: string;
  branchListAddressSearchPlaceholderText: string;
  branchListGeoLocationButtonText: string;
  geoLocationErrorNotSupportedText: string;
  geoLocationErrorPermissionDeniedText: string;
  geoLocationErrorPositionUnavailableText: string;
  geoLocationErrorTimeoutText: string;
  geoLocationErrorDefaultText: string;
  reverseGeocodeErrorDefaultText: string;
}

interface BranchListEntryConfigProps {
  branchesConfig: string;
  dataforsyningenTokenConfig: string;
}

const BranchListEntry: FC<
  BranchListEntryTextProps & BranchListEntryConfigProps
> = () => {
  return <BranchList />;
};

export default withConfig(withText(BranchListEntry));
