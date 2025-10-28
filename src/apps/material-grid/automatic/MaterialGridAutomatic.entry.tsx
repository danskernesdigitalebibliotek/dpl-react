import React from "react";
import GuardedApp from "../../../components/guarded-app";
import { GlobalEntryTextProps } from "../../../core/storybook/globalTextArgs";
import { withConfig } from "../../../core/utils/config";
import { withText } from "../../../core/utils/text";
import { withUrls } from "../../../core/utils/url";
import MaterialGridAutomatic from "./MaterialGridAutomatic";
import { parseBoolean } from "../../../core/utils/helpers/general";

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
  branch?: string;
  department?: string;
  onshelf?: string;
  sort?: string;
  title?: string;
  description?: string;
  requestedAmount: number;
  buttonText: string;
  materialUrl: string;
  firstaccessiondateitem?: string;
}

const MaterialGridAutomaticEntry: React.FC<MaterialGridAutomaticEntryProps> = ({
  cql,
  location,
  sublocation,
  branch,
  department,
  onshelf,
  sort,
  title,
  description,
  requestedAmount,
  firstaccessiondateitem
}) => (
  <GuardedApp app="material-grid-automatic">
    <MaterialGridAutomatic
      cql={cql}
      location={location}
      sublocation={sublocation}
      branch={branch}
      department={department}
      onshelf={parseBoolean(onshelf)}
      sort={sort}
      title={title}
      description={description}
      requestedAmount={requestedAmount}
      firstaccessiondateitem={firstaccessiondateitem}
    />
  </GuardedApp>
);

export default withConfig(withUrls(withText(MaterialGridAutomaticEntry)));
