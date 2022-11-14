import React, { FC } from "react";
import Menu from "./menu";
import { withText } from "../../core/utils/text";
import { withConfig } from "../../core/utils/config";

export interface MenuProps {
  menuViewYourProfileText: string;
  menuNavigationDataConfig: string;
  menuLogOutText: string;
  menuNotificationDataConfig: string;
  menuNotificationLoansExpiredText: string;
  menuNotificationLoansExpiringSoonText: string;
  menuNotificationReadyForPickupText: string;
}

const MenuEntry: FC<MenuProps> = () => <Menu />;

export default withConfig(withText(MenuEntry));
