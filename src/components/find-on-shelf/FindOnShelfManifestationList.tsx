import * as React from "react";
import { FC } from "react";
import { totalAvailableMaterials } from "../../apps/material/helper";
import { useText } from "../../core/utils/text";
import { ManifestationHoldings } from "../../core/utils/types/find-on-shelf";
import FindOnShelfManifestationListItem from "./FindOnShelfManifestationListItem";

export interface FindOnShelfManifestationListProps {
  libraryBranchHoldings: ManifestationHoldings;
}

const FindOnShelfManifestationList: FC<FindOnShelfManifestationListProps> = ({
  libraryBranchHoldings
}) => {
  const t = useText();

  return (
    <ul className="find-on-shelf">
      <li className="find-on-shelf__header-row text-small-caption">
        <span className="find-on-shelf__material-header">
          {t("findOnShelfModalListMaterialText")}
        </span>
        <span>{t("findOnShelfModalListFindOnShelfText")}</span>
        <span className="find-on-shelf__item-count-header capitalize-first">
          {t("findOnShelfModalListItemCountText")}
        </span>
      </li>
      {libraryBranchHoldings.map((branchHolding) => {
        return (
          <FindOnShelfManifestationListItem
            department={branchHolding.holding.department?.title}
            location={branchHolding.holding.location?.title}
            sublocation={branchHolding.holding.sublocation?.title}
            title={branchHolding.manifestation.titles.main.join(", ")}
            publicationYear={
              branchHolding.manifestation.publicationYear.display
            }
            numberAvailable={totalAvailableMaterials(
              branchHolding.holding.materials
            )}
            key={branchHolding.holding.branch.branchId}
          />
        );
      })}
    </ul>
  );
};

export default FindOnShelfManifestationList;
