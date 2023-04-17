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
  getMaterialTypes,
  getManifestationPid
} from "../../core/utils/helpers/general";
import { useText } from "../../core/utils/text";
import { WorkId } from "../../core/utils/types/ids";
import { AvailabilityLabels } from "../availability-label/availability-labels";
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
import { hasCorrectMaterialType } from "./material-buttons/helper";
import MaterialType from "../../core/utils/types/material-type";
import { useItemHasBeenVisible } from "../../core/utils/helpers/lazy-load";
import { getManifestationLanguageIsoCode } from "../../apps/material/helper";

interface MaterialHeaderProps {
  wid: WorkId;
  work: Work;
  selectedManifestations: Manifestation[];
  setSelectedManifestations: (manifestations: Manifestation[]) => void;
  selectedPeriodical: PeriodicalEdition | null;
  selectPeriodicalHandler: (selectedPeriodical: PeriodicalEdition) => void;
  children: React.ReactNode;
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
  selectPeriodicalHandler,
  children
}) => {
  const { itemRef, hasBeenVisible: showItem } = useItemHasBeenVisible();
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
  const isPeriodical = hasCorrectMaterialType(
    MaterialType.magazine,
    selectedManifestations
  );
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
  const manifestationMaterialTypes = getMaterialTypes(selectedManifestations);

  const languageIsoCode = getManifestationLanguageIsoCode(
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
        <Cover id={pid} size="xlarge" animate shadow />
      </div>
      <div
        data-cy="material-header-content"
        className="material-header__content"
      >
        <ButtonFavourite id={wid} addToListRequest={addToListRequest} />
        <MaterialHeaderText
          title={String(title)}
          author={author}
          languageIsoCode={languageIsoCode}
        />
        <div ref={itemRef} className="material-header__availability-label">
          {showItem && (
            <AvailabilityLabels
              cursorPointer
              workId={wid}
              manifestations={manifestations}
              selectedManifestations={selectedManifestations}
              setSelectedManifestations={setSelectedManifestations}
            />
          )}
        </div>

        {showItem && (
          <>
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
                    manifestations={selectedManifestations}
                    workId={wid}
                    dataCy="material-header-buttons"
                  />
                </div>
                <MaterialAvailabilityText
                  manifestations={selectedManifestations}
                />
              </>
            )}
            {children}
          </>
        )}
      </div>
    </header>
  );
};

export default MaterialHeader;
