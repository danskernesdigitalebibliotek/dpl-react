import React, { FC } from "react";
import Menu from "./menu";
import { withText } from "../../core/utils/text";
import { withConfig } from "../../core/utils/config";
import { withUrls } from "../../core/utils/url";

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
  fbsBaseUrl: string;
  publizonBaseUrl: string;
  dplCmsBaseUrl: string;
  coverBaseUrl: string;
  materialBaseUrl: string;
  fbiBaseUrl: string;
  warningThresholdConfig: string;
}

const MenuEntry: FC<MenuProps> = () => <Menu />;

export default withUrls(withConfig(withText(MenuEntry)));
