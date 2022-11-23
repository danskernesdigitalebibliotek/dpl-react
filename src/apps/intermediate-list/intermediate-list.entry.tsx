import React, { FC } from "react";

import Fees from "./fees";

export interface FeesProps {
  TestText: string;
}

const MenuEntry: FC<FeesProps> = () => <Fees />;

export default MenuEntry;
