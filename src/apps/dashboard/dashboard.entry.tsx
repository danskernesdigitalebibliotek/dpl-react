import React, { FC } from "react";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";

import DashBoard from "./dashboard";

export interface DashBoardProps {
  yourProfileText: string;
  intermediateText: string;
  totalOwedText: string;
  payOwedText: string;
  physicalLoansText: string;
  reservationsText: string;
  loansOverdueText: string;
  loansSoonOverdueText: string;
  loansNotOverdueText: string;
  reservationsReadyText: string;
  noPhysicalLoansText: string;
  noReservationsText: string;
  intermediateUrl: string;
  payOwedUrl: string;
  physicalLoansUrl: string;
  loansOverdueUrl: string;
  loansSoonOverdueUrl: string;
  loansNotOverdueUrl: string;
  reservationsUrl: string;
}

const MenuEntry: FC<DashBoardProps> = () => <DashBoard />;

export default withUrls(withText(MenuEntry));
