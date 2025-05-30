import React from "react";
import GuardedApp from "../../../components/guarded-app";
import { GlobalEntryTextProps } from "../../../core/storybook/globalTextArgs";
import { withConfig } from "../../../core/utils/config";
import { withText } from "../../../core/utils/text";
import { withUrls } from "../../../core/utils/url";
import MaterialGridLinkAutomatic from "./MaterialGridLinkAutomatic";
import { ValidSelectedIncrements } from "../../../components/material-grid/materiel-grid-util";

interface MaterialGridLinkAutomaticEntryConfigProps {
  blacklistedAvailabilityBranchesConfig: string;
  blacklistedPickupBranchesConfig?: string;
  blacklistedSearchBranchesConfig?: string;
  branchesConfig: string;
}

export interface MaterialGridLinkAutomaticEntryProps
  extends GlobalEntryTextProps,
    MaterialGridLinkAutomaticEntryConfigProps {
  link: string;
  title?: string;
  description?: string;
  selectedAmountOfMaterialsForDisplay: ValidSelectedIncrements;
  materialUrl: string;
}

const MaterialGridLinkAutomaticEntry: React.FC<
  MaterialGridLinkAutomaticEntryProps
> = ({ link, title, description, selectedAmountOfMaterialsForDisplay }) => (
  <GuardedApp app="material-grid-automatic">
    <MaterialGridLinkAutomatic
      link={new URL(link)}
      title={title}
      description={description}
      selectedAmountOfMaterialsForDisplay={selectedAmountOfMaterialsForDisplay}
    />
  </GuardedApp>
);

export default withConfig(withUrls(withText(MaterialGridLinkAutomaticEntry)));
