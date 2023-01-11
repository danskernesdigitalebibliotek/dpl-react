import React from "react";
import { useDispatch } from "react-redux";
import { useDeepCompareEffect } from "react-use";
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
import MaterialPeriodical from "./periodical/MaterialPeriodical";
import { Manifestation, Work } from "../../core/utils/types/entities";
import { PeriodicalEdition } from "./periodical/helper";
import { useStatistics } from "../../core/statistics/useStatistics";
import { statistics } from "../../core/statistics/statistics";
import { getAllUniqueMaterialTypes } from "../../apps/material/helper";

interface MaterialHeaderProps {
  wid: WorkId;
  work: Work;
  selectedManifestations: Manifestation[];
  setSelectedManifestations: (manifestations: Manifestation[]) => void;
  selectedPeriodical: PeriodicalEdition | null;
  selectPeriodicalHandler: (selectedPeriodical: PeriodicalEdition) => void;
}

const MaterialHeader: React.FC<MaterialHeaderProps> = ({
  work: {
    titles: { full: fullTitle },
    creators,
    manifestations: { all: manifestations },
    mainLanguages,
    workId: wid
  },
  selectedManifestations,
  setSelectedManifestations,
  selectedPeriodical,
  selectPeriodicalHandler
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
  const author = creatorsToString(
    flattenCreators(filterCreators(creators, ["Person"])),
    t
  );
  const isPeriodical = selectedManifestations.some((manifestation) => {
    return manifestation.materialTypes.some(
      (materialType: Manifestation["materialTypes"][0]) => {
        return materialType.specific === "tidsskrift";
      }
    );
  });

  const containsDanish = mainLanguages.some((language) =>
    language?.isoCode.toLowerCase().includes("dan")
  );

  const allLanguages = mainLanguages
    .map((language) => language.display)
    .join(", ");

  const title = containsDanish ? fullTitle : `${fullTitle} (${allLanguages})`;
  const pid = getManifestationPid(manifestations);
  const { track } = useStatistics();
  // This is used to track whether the user is changing between material types or just clicking the same button over
  const manifestationMaterialTypes = getAllUniqueMaterialTypes(
    selectedManifestations
  );

  useDeepCompareEffect(() => {
    track("click", {
      id: statistics.materialType.id,
      name: statistics.materialType.name,
      trackedData: manifestationMaterialTypes.join(", ")
    });
    track("click", {
      id: statistics.materialSource.id,
      name: statistics.materialSource.name,
      trackedData: selectedManifestations
        .map((manifestation) => manifestation.source.join(", "))
        .join(", ")
    });
    // We just want to track if the currently selected manifestation changes (which should be once - on initial render)
    // and when the currently selected manifestation's material type changes - on availability button click.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manifestationMaterialTypes]);

  return (
    <header className="material-header">
      <div className="material-header__cover">
        <Cover id={pid} size="xlarge" animate />
      </div>
      <div className="material-header__content">
        <ButtonFavourite id={wid} addToListRequest={addToListRequest} />
        <MaterialHeaderText title={String(title)} author={author} />
        <div className="material-header__availability-label">
          <AvailabiltityLabels
            cursorPointer
            workId={wid}
            manifestations={manifestations}
            selectedManifestations={selectedManifestations}
            setSelectedManifestations={setSelectedManifestations}
          />
        </div>

        {isPeriodical && (
          <MaterialPeriodical
            faustId={convertPostIdToFaustId(pid)}
            selectedPeriodical={selectedPeriodical}
            selectPeriodicalHandler={selectPeriodicalHandler}
          />
        )}
        {selectedManifestations && (
          <>
            <div className="material-header__button">
              <MaterialButtons
                selectedManifestations={selectedManifestations}
                workId={wid}
                dataCy="material-header-buttons"
                isMain
              />
            </div>
            <MaterialAvailabilityText
              selectedManifestations={selectedManifestations}
            />
          </>
        )}
      </div>
    </header>
  );
};

export default MaterialHeader;
