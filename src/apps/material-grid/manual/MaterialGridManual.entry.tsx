import React from "react";
import GuardedApp from "../../../components/guarded-app";
import { GlobalEntryTextProps } from "../../../core/storybook/globalTextArgs";
import { withConfig } from "../../../core/utils/config";
import { withText } from "../../../core/utils/text";
import { WorkId } from "../../../core/utils/types/ids";
import { withUrls } from "../../../core/utils/url";
import MaterialGridManual from "./MaterialGridManual";

interface MaterialGridManualEntryConfigProps {
  blacklistedAvailabilityBranchesConfig: string;
  blacklistedPickupBranchesConfig?: string;
  blacklistedSearchBranchesConfig?: string;
  branchesConfig: string;
}

export interface MaterialGridManualEntryProps
  extends GlobalEntryTextProps,
    MaterialGridManualEntryConfigProps {
  materialIds: string;
  title?: string;
}

const MaterialGridManualEntry: React.FC<MaterialGridManualEntryProps> = ({
  materialIds,
  title
}) => {
  const parsedMaterialIdString: WorkId[] = JSON.parse(materialIds);
  const parsedMaterialIds = parsedMaterialIdString.map((id) => id);

  return (
    <GuardedApp app="material-grid-manual">
      <MaterialGridManual materialIds={parsedMaterialIds} title={title} />
    </GuardedApp>
  );
};

export default withConfig(withUrls(withText(MaterialGridManualEntry)));
