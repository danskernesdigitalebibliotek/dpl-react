import React from "react";
import { withText } from "../../core/utils/text";
import DemoWayfinder from "./demo-wayfinder";
import { GlobalEntryTextProps } from "../../core/storybook/globalTextArgs";

export interface DemoWayfinderLinkProps {
  branchId: string;
  departmentId: string;
  locationId: string;
  subLocationId: string;
  shelfmark: string;
}

const DemoWayfinderEntry: React.FC<
  DemoWayfinderLinkProps & GlobalEntryTextProps
> = (props: DemoWayfinderLinkProps) => <DemoWayfinder />;

export default withText(DemoWayfinderEntry);
