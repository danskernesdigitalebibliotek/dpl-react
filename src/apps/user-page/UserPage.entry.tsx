import React, { FC } from "react";
import { withConfig } from "../../core/utils/config";
import { withText } from "../../core/utils/text";
import UserPage from "./UserPage";

interface UserPageProps {
  blacklistedPickupBranchesConfig?: string;
  branchesConfig: string;
  pincodeLengthConfig: number;
}

const LoanListEntry: FC<UserPageProps> = () => <UserPage />;

export default withConfig(withText(LoanListEntry));
