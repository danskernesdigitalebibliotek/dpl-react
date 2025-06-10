import React from "react";
import GuardedApp from "../../../components/guarded-app";
import { GlobalEntryTextProps } from "../../../core/storybook/globalTextArgs";
import { withConfig } from "../../../core/utils/config";
import { withText } from "../../../core/utils/text";
import { withUrls } from "../../../core/utils/url";
import MaterialGridAutomatic from "./MaterialGridAutomatic";
import { ValidSelectedIncrements } from "../../../components/material-grid/materiel-grid-util";

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
  location?: string;
  sublocation?: string;
  onshelf?: boolean;
  sort?: string;
  title?: string;
  description?: string;
  selectedAmountOfMaterialsForDisplay: ValidSelectedIncrements;
  buttonText: string;
  materialUrl: string;
}

const MaterialGridAutomaticEntry: React.FC<MaterialGridAutomaticEntryProps> = ({
  cql,
  location,
  sublocation,
  onshelf,
  sort,
  title,
  description,
  selectedAmountOfMaterialsForDisplay
}) => (
  <GuardedApp app="material-grid-automatic">
    <MaterialGridAutomatic
      cql={cql}
      location={location}
      sublocation={sublocation}
      onshelf={onshelf}
      sort={sort}
      title={title}
      description={description}
      selectedAmountOfMaterialsForDisplay={selectedAmountOfMaterialsForDisplay}
    />
  </GuardedApp>
);

export default withConfig(withUrls(withText(MaterialGridAutomaticEntry)));
