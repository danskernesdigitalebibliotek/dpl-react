import * as React from "react";
import { FC } from "react";
import { totalAvailableMaterialsInBranch } from "../../apps/material/helper";
import { HoldingsV3 } from "../../core/fbs/model";
import { useText } from "../../core/utils/text";
import FindOnShelfManifestationListItem from "./FindOnShelfManifestationListItem";

export interface FindOnShelfManifestationListProps {
  holding: HoldingsV3;
  title: string;
}

const FindOnShelfManifestationList: FC<FindOnShelfManifestationListProps> = ({
  holding,
  title
}) => {
  const t = useText();
  const { materials, department, location, sublocation } = holding;
  const numberAvailable = totalAvailableMaterialsInBranch(materials);

  return (
    <ul className="find-on-shelf">
      <li className="find-on-shelf__header-row text-small-caption">
        <span className="find-on-shelf__material-header">
          {t("findOnShelfModalListMaterialText")}
        </span>
        <span>{t("findOnShelfModalListFindOnShelfText")}</span>
        <span className="find-on-shelf__item-count-header">
          {t("findOnShelfModalListItemCountText")}
        </span>
      </li>
      {materials.map((material) => {
        return (
          <FindOnShelfManifestationListItem
            department={department?.title}
            location={location?.title}
            sublocation={sublocation?.title}
            title={title}
            numberAvailable={numberAvailable}
          />
        );
      })}
    </ul>
  );
};

export default FindOnShelfManifestationList;
