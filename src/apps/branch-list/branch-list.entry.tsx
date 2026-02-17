import React, { FC } from "react";
import { withText } from "../../core/utils/text";
import { withConfig } from "../../core/utils/config";
import BranchList from "./branch-list";

interface BranchListEntryTextProps {
  branchListTitleText: string;
}

interface BranchListEntryConfigProps {
  branchesConfig: string;
}

const BranchListEntry: FC<
  BranchListEntryTextProps & BranchListEntryConfigProps
> = () => {
  return <BranchList />;
};

export default withConfig(withText(BranchListEntry));
