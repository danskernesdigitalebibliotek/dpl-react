import React, { FC } from "react";
import Menu from "./menu";
import { withText } from "../../core/utils/text";
import { withConfig } from "../../core/utils/config";
import { withUrls } from "../../core/utils/url";
import GlobalUrlEntryPropsInterface from "../../core/utils/types/global-url-props";
import { GroupModalProps } from "../../core/storybook/groupModalArgs";
import { GroupModalLoansProps } from "../../core/storybook/loanGroupModalArgs";
import { GroupModalReservationsProps } from "../../core/storybook/reservationGroupModalArgs";
import { pageSizeGlobal } from "../../core/utils/helpers/general";
import { MaterialDetailsModalProps } from "../../core/storybook/materialDetailsModalArgs";
import { ReservationMaterialDetailsProps } from "../../core/storybook/reservationMaterialDetailsArgs";
import { DeleteReservationModalArgs } from "../../core/storybook/deleteReservationModalArgs";

export interface MenuProps {
  menuViewYourProfileText: string;
  menuViewYourProfileTextUrl: string;
  menuNavigationDataConfig: string;
  menuNotificationLoansExpiredText: string;
  menuNotificationLoansExpiredUrl: string;
  menuNotificationLoansExpiringSoonText: string;
  menuNotificationLoansExpiringSoonUrl: string;
  menuNotificationReadyForPickupText: string;
  menuNotificationReadyForPickupUrl: string;
  menuLogOutText: string;
  menuLogOutUrl: string;
  thresholdConfig: string;
  feeListDaysText: string;
  menuLoginText: string;
  menuLoginUrl: string;
  menuSignUpText: string;
  reservationsReadyText: string;
  menuSignUpUrl: string;
  menuProfileLinksAriaLabelText: string;
  menuUserIconAriaLabelText: string;
  menuNotAuthenticatedCloseButtonText: string;
  menuAuthenticatedCloseButtonText: string;
  menuAuthenticatedModalDescriptionText: string;
  menuNotAuthenticatedModalDescriptionText: string;
}

const MenuEntry: FC<
  MenuProps &
    GlobalUrlEntryPropsInterface &
    GroupModalProps &
    GroupModalLoansProps &
    DeleteReservationModalArgs &
    GroupModalReservationsProps &
    MaterialDetailsModalProps &
    ReservationMaterialDetailsProps
> = ({ pageSizeDesktop, pageSizeMobile }) => {
  const pageSize = pageSizeGlobal(
    {
      desktop: pageSizeDesktop,
      mobile: pageSizeMobile
    },
    "pageSizeLoanList"
  );

  return <Menu pageSize={pageSize} />;
};

export default withUrls(withConfig(withText(MenuEntry)));
