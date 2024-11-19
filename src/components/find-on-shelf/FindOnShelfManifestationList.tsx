import * as React from "react";
import { FC } from "react";
import { totalAvailableMaterials } from "../../apps/material/helper";
import { useText } from "../../core/utils/text";
import { ManifestationHoldings } from "./types";
import FindOnShelfManifestationListItem from "./FindOnShelfManifestationListItem";
import { getManifestationPublicationYear } from "../../core/utils/helpers/general";
import { getLocationArray } from "./helper";

export interface FindOnShelfManifestationListProps {
  libraryBranchHoldings: ManifestationHoldings;
  author: string;
}

const FindOnShelfManifestationList: FC<FindOnShelfManifestationListProps> = ({
  libraryBranchHoldings,
  author
}) => {
  const t = useText();

  return (
    <ul
      className="find-on-shelf"
      role="table"
      aria-label={t("findOnShelfTableDescriptionText", {
        placeholders: {
          "@work": libraryBranchHoldings[0].manifestation.titles.main[0],
          "@branch": libraryBranchHoldings[0].holding.branch.title
        }
      })}
    >
      <li className="find-on-shelf__header-row text-small-caption" role="row">
        <span className="find-on-shelf__material-header" role="columnheader">
          {t("findOnShelfModalListMaterialText")}
        </span>
        <span className="find-on-shelf__location-header" role="columnheader">
          {t("findOnShelfModalListFindOnShelfText")}
        </span>
        <span
          className="find-on-shelf__item-count-header capitalize-first"
          role="columnheader"
        >
          {t("findOnShelfModalListItemCountText")}
        </span>
      </li>
      {libraryBranchHoldings.map((branchHolding) => {
        return (
          <FindOnShelfManifestationListItem
            shelfmark={branchHolding.manifestation.shelfmark}
            locationArray={getLocationArray(branchHolding.holding)}
            title={branchHolding.manifestation.titles.main.join(", ")}
            publicationYear={getManifestationPublicationYear(
              branchHolding.manifestation
            )}
            numberAvailable={totalAvailableMaterials(
              branchHolding.holding.materials
            )}
            key={branchHolding.holding.branch.branchId}
            author={author}
          />
        );
      })}
    </ul>
  );
};

export default FindOnShelfManifestationList;
