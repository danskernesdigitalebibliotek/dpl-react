import React from "react";
import GuardedApp from "../../../components/guarded-app";
import { GlobalEntryTextProps } from "../../../core/storybook/globalTextArgs";
import { withConfig } from "../../../core/utils/config";
import { withText } from "../../../core/utils/text";
import { withUrls } from "../../../core/utils/url";
import { MaterialGridItemProps } from "../MaterialGrid";
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
  materials: string;
  title?: string;
}

const MaterialGridManualEntry: React.FC<MaterialGridManualEntryProps> = ({
  materials,
  title
}) => {
  const parsedMaterialsString: MaterialGridItemProps[] = JSON.parse(materials);
  const parsedMaterials = parsedMaterialsString.map((work) => ({
    wid: work.wid,
    materialType: work.materialType
  }));

  return (
    <GuardedApp app="material-grid-manual">
      <MaterialGridManual materials={parsedMaterials} title={title} />
    </GuardedApp>
  );
};

export default withConfig(withUrls(withText(MaterialGridManualEntry)));
