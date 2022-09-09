import React from "react";
import { useDispatch } from "react-redux";
import {
  ManifestationsSimpleFieldsFragment,
  WorkMediumFragment
} from "../../core/dbc-gateway/generated/graphql";
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
import { Pid, WorkId } from "../../core/utils/types/ids";
import { AvailabiltityLabels } from "../availability-label/availability-labels";
import ButtonFavourite, {
  ButtonFavouriteId
} from "../button-favourite/button-favourite";
import { Cover } from "../cover/cover";
import MaterialHeaderText from "./MaterialHeaderText";
import MaterialButtons from "./material-buttons/MaterialButtons";
import MaterialPeriodical from "./MaterialPeriodical";

interface MaterialHeaderProps {
  wid: WorkId;
  work: WorkMediumFragment;
  manifestation?: ManifestationsSimpleFieldsFragment;
  selectManifestationHandler: (
    manifestation: ManifestationsSimpleFieldsFragment
  ) => void;
  selectPeriodicalSelect: (periodicalSelect: string | null) => void;
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
  const coverPid =
    (manifestation?.pid as Pid) || getManifestationPid(manifestations);

  const faustId = manifestation
    ? convertPostIdToFaustId(manifestation?.pid as Pid)
    : "";

  return (
    <header className="material-header">
      <div className="material-header__cover">
        <Cover pid={coverPid} size="xlarge" animate />
      </div>
      <div className="material-header__content">
        <ButtonFavourite
          id={wid as WorkId}
          addToListRequest={addToListRequest}
        />
        <MaterialHeaderText title={String(title)} author={author} />
        <div className="material-header__availability-label">
          <AvailabiltityLabels
            workId={wid as WorkId}
            manifestations={manifestations}
            manifestation={manifestation}
            selectManifestationHandler={selectManifestationHandler}
          />
        </div>

        {manifestation?.source?.includes("bibliotekskatalog") && faustId && (
          <MaterialPeriodical
            faustId={faustId}
            selectPeriodicalSelect={selectPeriodicalSelect}
          />
        )}

        <div className="material-header__button">
          {manifestation && <MaterialButtons manifestation={manifestation} />}
        </div>
      </div>
    </header>
  );
};

export default MaterialHeader;
