import React from "react";
import {
  ManifestationsSimpleFragment,
  WorkMediumFragment
} from "../../core/dbc-gateway/generated/graphql";
import {
  creatorsToString,
  filterCreators,
  flattenCreators,
  getManifestationPid
} from "../../core/utils/helpers/general";
import { useText } from "../../core/utils/text";
import { Pid, WorkId } from "../../core/utils/types/ids";
import { AvailabiltityLabels } from "../availability-label/availability-labels";
import ButtonFavourite from "../button-favourite/button-favourite";
import ButtonLargeFilled from "../Buttons/ButtonLargeFilled";
import ButtonLargeOutline from "../Buttons/ButtonLargeOutline";
import { Cover } from "../cover/cover";
import MaterialHeaderText from "./MaterialHeaderText";
import MaterialPeriodikumSelect from "./MaterialPeriodikumSelect";

interface MaterialHeaderProps {
  wid: WorkId;
  work: WorkMediumFragment;
  manifestation?: ManifestationsSimpleFragment["latest"];
  selectManifestationHandler: (
    manifestation: ManifestationsSimpleFragment["latest"]
  ) => void;
}

const MaterialHeader: React.FC<MaterialHeaderProps> = ({
  work: {
    titles: { full: fullTitle },
    creators,
    manifestations,
    mainLanguages,
    workId: wid
  },
  manifestation,
  selectManifestationHandler
}) => {
  const t = useText();

  const creatorsText = creatorsToString(
    flattenCreators(filterCreators(creators, ["Person"])),
    t
  );

  // TODO: Temporary way to get a pid we can use for showing a cover for the material.
  // It should be replaced with some dynamic feature
  // that follows the current type of the material.
  const pid = getManifestationPid(manifestations) as Pid;
  const author = creatorsText || "[Creators are missing]";

  const containsDanish = mainLanguages.some((language) =>
    language?.isoCode.toLowerCase().includes("dan")
  );

  const allLanguages = mainLanguages
    .map((language) => language.display)
    .join(", ");

  const title = containsDanish ? fullTitle : `${fullTitle} (${allLanguages})`;

  return (
    <header className="material-header">
      <div className="material-header__cover">
        <Cover pid={pid} size="xlarge" animate={false} />
      </div>
      <div className="material-header__content">
        <ButtonFavourite id={wid as WorkId} />
        <MaterialHeaderText title={String(title)} author={author} />
        <div className="material-header__availability-label">
          <AvailabiltityLabels
            workId={wid as WorkId}
            manifestations={manifestations}
            manifestation={manifestation}
            selectManifestationHandler={selectManifestationHandler}
          />
        </div>

        {/* Check and chow if data has PeriodikumSelect  */}
        {false && <MaterialPeriodikumSelect />}
        <div className="material-header__button">
          <ButtonLargeFilled label={t("reserveBookText")} disabled={false} />
          <ButtonLargeOutline
            label={t("findOnBookshelfText")}
            disabled={false}
          />
        </div>
      </div>
    </header>
  );
};

export default MaterialHeader;
