import React from "react";
import { useDispatch } from "react-redux";
import { guardedRequest } from "../../core/guardedRequests.slice";
import { TypedDispatch } from "../../core/store";
import {
  convertPostIdToFaustId,
  creatorsToString,
  filterCreators,
  flattenCreators,
  getManifestationPid
} from "../../core/utils/helpers/general";
import { useText } from "../../core/utils/text";
import { WorkId } from "../../core/utils/types/ids";
import { AvailabiltityLabels } from "../availability-label/availability-labels";
import ButtonFavourite, {
  ButtonFavouriteId
} from "../button-favourite/button-favourite";
import { Cover } from "../cover/cover";
import MaterialAvailabilityText from "./MaterialAvailabilityText/MaterialAvailabilityText";
import MaterialHeaderText from "./MaterialHeaderText";
import MaterialButtons from "./material-buttons/MaterialButtons";
import MaterialPeriodical from "./MaterialPeriodical";
import { Manifestation, Work } from "../../core/utils/types/entities";
import { GroupListItem } from "./MaterialPeriodicalSelect";

interface MaterialHeaderProps {
  wid: WorkId;
  work: Work;
  manifestation: Manifestation;
  selectManifestationHandler: (manifestation: Manifestation) => void;
  selectPeriodicalSelect: (periodicalSelect: GroupListItem) => void;
}

const MaterialHeader: React.FC<MaterialHeaderProps> = ({
  work: {
    titles: { full: fullTitle },
    creators,
    manifestations: { all: manifestations },
    mainLanguages,
    workId: wid
  },
  manifestation: { pid },
  manifestation,
  selectManifestationHandler,
  selectPeriodicalSelect
}) => {
  const t = useText();
  const dispatch = useDispatch<TypedDispatch>();
  const addToListRequest = (id: ButtonFavouriteId) => {
    dispatch(
      guardedRequest({
        type: "addFavorite",
        args: { id },
        app: "material"
      })
    );
  };
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
  const coverPid = pid || getManifestationPid(manifestations);

  const isPeriocial = manifestation?.materialTypes
    ?.map((i) => i.specific.toLowerCase())
    .includes("periodikum");

  return (
    <header className="material-header">
      <div className="material-header__cover">
        <Cover pid={coverPid} size="xlarge" animate />
      </div>
      <div className="material-header__content">
        <ButtonFavourite id={wid} addToListRequest={addToListRequest} />
        <MaterialHeaderText title={String(title)} author={author} />
        <div className="material-header__availability-label">
          <AvailabiltityLabels
            cursorPointer
            workId={wid}
            manifestations={manifestations}
            selectedManifestation={manifestation}
            selectManifestationHandler={selectManifestationHandler}
          />
        </div>

        {isPeriocial && (
          <MaterialPeriodical
            faustId={convertPostIdToFaustId(pid)}
            selectPeriodicalSelect={selectPeriodicalSelect}
          />
        )}

        <div className="material-header__button">
          {manifestation && <MaterialButtons manifestation={manifestation} />}
        </div>
        {manifestation && (
          <MaterialAvailabilityText manifestation={manifestation} />
        )}
      </div>
    </header>
  );
};

export default MaterialHeader;
