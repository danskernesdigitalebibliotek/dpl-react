import React, { FC } from "react";

import DashBoard from "./dashboard";

export interface DashBoardProps {
  Test: string;
}

const MenuEntry: FC<DashBoardProps> = () => <DashBoard />;

export default MenuEntry;
