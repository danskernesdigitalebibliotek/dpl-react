import React, { FC } from "react";

import IntermedateList from "./intermediate-list";

export interface IntermedateListProps {
  TestText: string;
}

const IntermedateListEntry: FC<IntermedateListProps> = () => (
  <IntermedateList />
);

export default IntermedateListEntry;
