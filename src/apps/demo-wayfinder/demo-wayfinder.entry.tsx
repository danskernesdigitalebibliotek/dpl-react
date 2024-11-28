import React from "react";
import { withText } from "../../core/utils/text";
import DemoWayfinder from "./demo-wayfinder";

export interface DemoWayfinderLinkProps {
  branchId: string;
  departmentId: string;
  locationId: string;
  subLocationId: string;
  shelfmark: string;
}

const DemoWayfinderEntry: React.FC<DemoWayfinderLinkProps> = (props: DemoWayfinderLinkProps) => {
  return <DemoWayfinder />;
};

export default withText(DemoWayfinderEntry);
