import React from "react";
import { withText } from "../../core/utils/text";
import DemoModal from "./demo-modal";

export interface DemoModalEntryProps {
  ariaLabelModalOneText: string;
  ariaLabelModalTwoText: string;
  screenReaderModalDescriptionText: string;
}

const DemoModalEntry: React.FC<DemoModalEntryProps> = (
  props: DemoModalEntryProps
) => <DemoModal />;

export default withText(DemoModalEntry);
