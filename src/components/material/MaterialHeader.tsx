import React from "react";
import { WorkSimpleFragment } from "../../core/dbc-gateway/generated/graphql";
import {
  creatorsToString,
  filterCreators,
  flattenCreators
} from "../../core/utils/helpers";
import { useText } from "../../core/utils/text";
import { Pid } from "../../core/utils/types/ids";
import { AvailabiltityLabels } from "../availability-label/availability-labels";
import ButtonFavourite from "../button-favourite/button-favourite";
import ButtonLargeFilled from "../Buttons/ButtonLargeFilled";
import ButtonLargeOutline from "../Buttons/ButtonLargeOutline";
import { Cover } from "../cover/cover";
import MaterialHeaderText from "./MaterialHeaderText";
import MaterialPeriodikumSelect from "./MaterialPeriodikumSelect";

interface MaterialHeaderProps {
  pid: Pid;
  work: WorkSimpleFragment;
}

const MaterialHeader: React.FC<MaterialHeaderProps> = ({
  pid,
  work: {
    titles: { full: fullTitle },
    creators,
    manifestations
  }
}) => {
  const t = useText();

  const creatorsText = creatorsToString(
    flattenCreators(filterCreators(creators, ["Person"])),
    t
  );

  const author = creatorsText || "[Creators are missing]";

  return (
    <header className="material-header">
      <div className="material-header__cover">
        <Cover materialId={pid} size="large" animate={false} />
      </div>
      <div className="material-header__content">
        <ButtonFavourite materialId={pid} />
        <MaterialHeaderText title={String(fullTitle)} author={author} />
        <div className="material-header__availability-label">
          <AvailabiltityLabels manifestations={manifestations} />
        </div>

        {/* Check and chow if data has PeriodikumSelect  */}
        {false && <MaterialPeriodikumSelect />}
        <div className="material-header__button">
          <ButtonLargeFilled label={t("reserveBookText")} disabled={false} />
          <ButtonLargeOutline
            label={t("fineOnBookshelfText")}
            disabled={false}
          />
        </div>
      </div>
    </header>
  );
};

export default MaterialHeader;
