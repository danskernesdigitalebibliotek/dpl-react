import React from "react";
import GuardedApp from "../../../components/guarded-app";
import { GlobalEntryTextProps } from "../../../core/storybook/globalTextArgs";
import { withConfig } from "../../../core/utils/config";
import { withText } from "../../../core/utils/text";
import { withUrls } from "../../../core/utils/url";
import MaterialGridAutomatic from "./MaterialGridAutomatic";
import { ValidSelectedIncrements } from "../materiel-grid-util";

interface MaterialGridAutomaticEntryConfigProps {
  blacklistedAvailabilityBranchesConfig: string;
  blacklistedPickupBranchesConfig?: string;
  blacklistedSearchBranchesConfig?: string;
  branchesConfig: string;
}

export interface MaterialGridAutomaticEntryProps
  extends GlobalEntryTextProps,
    MaterialGridAutomaticEntryConfigProps {
  cql: string;
  title?: string;
  description?: string;
  selectedAmountOfMaterialsForDisplay: ValidSelectedIncrements;
  buttonText: string;
}

const MaterialGridAutomaticEntry: React.FC<MaterialGridAutomaticEntryProps> = ({
  cql,
  title,
  description,
  selectedAmountOfMaterialsForDisplay,
  buttonText
}) => (
  <GuardedApp app="material-grid-automatic">
    <MaterialGridAutomatic
      cql={cql}
      title={title}
      description={description}
      selectedAmountOfMaterialsForDisplay={selectedAmountOfMaterialsForDisplay}
      buttonText={buttonText}
    />
  </GuardedApp>
);

export default withConfig(withUrls(withText(MaterialGridAutomaticEntry)));
