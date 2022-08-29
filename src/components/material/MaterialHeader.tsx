import React from "react";
import {
  ManifestationsSimpleFieldsFragment,
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
import ButtonLargeOutline from "../Buttons/ButtonLargeOutline";
import { Cover } from "../cover/cover";
import MaterialHeaderText from "./MaterialHeaderText";
import MaterialPeriodikumSelect from "./MaterialPeriodikumSelect";
import MaterialButtons from "./material-buttons/MaterialButtons";

interface MaterialHeaderProps {
  wid: WorkId;
  work: WorkMediumFragment;
  manifestation?: ManifestationsSimpleFieldsFragment;
  selectManifestationHandler: (
    manifestation: ManifestationsSimpleFieldsFragment
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

  const author = creatorsText || t("creatorsAreMissingText");

  const containsDanish = mainLanguages.some((language) =>
    language?.isoCode.toLowerCase().includes("dan")
  );

  const allLanguages = mainLanguages
    .map((language) => language.display)
    .join(", ");

  const title = containsDanish ? fullTitle : `${fullTitle} (${allLanguages})`;
  const coverPid =
    (manifestation?.pid as Pid) || getManifestationPid(manifestations);

  return (
    <header className="material-header">
      <div className="material-header__cover">
        <Cover pid={coverPid} size="xlarge" animate />
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

        {/* Check and show if data has PeriodikumSelect. */}
        {false && <MaterialPeriodikumSelect />}
        <div className="material-header__button">
          {manifestation && <MaterialButtons manifestation={manifestation} />}
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
