import * as React from "react";
import { FC } from "react";
import { totalAvailableMaterials } from "../../apps/material/helper";
import { HoldingsV3 } from "../../core/fbs/model";
import { useText } from "../../core/utils/text";
import { Manifestation } from "../../core/utils/types/entities";
import FindOnShelfManifestationListItem from "./FindOnShelfManifestationListItem";

export interface FindOnShelfManifestationListProps {
  holding: HoldingsV3;
  title: string;
  manifestations: Manifestation[];
}

const FindOnShelfManifestationList: FC<FindOnShelfManifestationListProps> = ({
  holding,
  title,
  manifestations
}) => {
  const t = useText();
  const { materials, department, location, sublocation } = holding;
  const numberAvailable = totalAvailableMaterials(materials);

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
      {manifestations.map((manifestation) => {
        return (
          <FindOnShelfManifestationListItem
            department={department?.title}
            location={location?.title}
            sublocation={sublocation?.title}
            title={title}
            publicationYear={manifestation.publicationYear.display}
            numberAvailable={numberAvailable}
            key={manifestation.pid}
          />
        );
      })}
    </ul>
  );
};

export default FindOnShelfManifestationList;
