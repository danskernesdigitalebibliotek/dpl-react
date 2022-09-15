import * as React from "react";
import { FC } from "react";
import { HoldingsV3 } from "../../core/fbs/model";
import { useText } from "../../core/utils/text";

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
          <li
            key={material.itemNumber}
            className="find-on-shelf__row text-body-medium-regular"
          >
            <span className="find-on-shelf__material-text">{title}, 2008</span>
            <span>
              {`${department?.title ? `${department.title}` : ""}
              ${
                (department?.title && sublocation?.title) ||
                (department?.title && location?.title)
                  ? " · "
                  : ""
              }
              ${sublocation ? `${sublocation}` : ""}
              ${
                (sublocation?.title && location?.title) ||
                (department?.title && location?.title)
                  ? " · "
                  : ""
              }
              ${location ? `${location}` : ""}`}
            </span>
            <span className="find-on-shelf__item-count-text">
              13
              <span className="hide-visually--on-desktop">hjemme</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default FindOnShelfManifestationList;
