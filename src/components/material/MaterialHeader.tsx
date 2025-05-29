import React, { useId } from "react";
import { useDispatch } from "react-redux";
import { useDeepCompareEffect } from "react-use";
import { guardedRequest } from "../../core/guardedRequests.slice";
import { TypedDispatch } from "../../core/store";
import {
  convertPostIdToFaustId,
  creatorsToString,
  flattenCreators,
  getAllFaustIds,
  getManifestationsPids,
  getMaterialTypes,
  getWorkPid
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
import { useCollectPageStatistics } from "../../core/statistics/useStatistics";
import { statistics } from "../../core/statistics/statistics";
import { useItemHasBeenVisible } from "../../core/utils/helpers/lazy-load";
import {
  getManifestationLanguageIsoCode,
  getWorkTitle
} from "../../apps/material/helper";
import { isPeriodical, shouldShowMaterialAvailabilityText } from "./helper";
import useAvailabilityData from "../availability-label/useAvailabilityData";
import { AccessTypeCodeEnum } from "../../core/dbc-gateway/generated/graphql";
import { first } from "lodash";
import { hasCorrectMaterialType } from "./material-buttons/helper";
import { ManifestationMaterialType } from "../../core/utils/types/material-type";

interface MaterialHeaderProps {
  wid: WorkId;
  work: Work;
  selectedManifestations: Manifestation[];
  setSelectedManifestations: (manifestations: Manifestation[]) => void;
  selectedPeriodical: PeriodicalEdition | null;
  selectPeriodicalHandler: (selectedPeriodical: PeriodicalEdition) => void;
  children: React.ReactNode;
  isGlobalMaterial: boolean;
}

const MaterialHeader: React.FC<MaterialHeaderProps> = ({
  work: {
    creators,
    manifestations: { all: manifestations, bestRepresentation },
    workId: wid
  },
  work,
  selectedManifestations,
  setSelectedManifestations,
  selectedPeriodical,
  selectPeriodicalHandler,
  children,
  isGlobalMaterial = false
}) => {
  const materialTitleId = useId();
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
  const author = creatorsToString(flattenCreators(creators), t);
  const title = getWorkTitle(work);
  const pid = getWorkPid(work);
  const coverPids = getManifestationsPids(selectedManifestations);
  const { collectPageStatistics } = useCollectPageStatistics();
  // This is used to track whether the user is changing between material types or just clicking the same button over
  const manifestationMaterialTypes = getMaterialTypes(selectedManifestations);

  const languageIsoCode = getManifestationLanguageIsoCode(
    selectedManifestations
  );
  // We need availability in order to show availability text under action buttons
  const { isAvailable } = useAvailabilityData({
    accessTypes: [AccessTypeCodeEnum.Physical, AccessTypeCodeEnum.Online],
    access: [undefined],
    faustIds: getAllFaustIds(selectedManifestations),
    isbn: null, // Not needed.
    // "manifestText" is used inside the availability hook to check whether the material is an article
    // which we check inside shouldShowMaterialAvailabilityText() helper here.
    manifestText: "NOT AN ARTICLE"
  });
  const isYearbook =
    hasCorrectMaterialType(
      ManifestationMaterialType.yearBook,
      manifestations
    ) ||
    hasCorrectMaterialType(
      ManifestationMaterialType.yearBookOnline,
      manifestations
    );

  useDeepCompareEffect(() => {
    collectPageStatistics({
      ...statistics.materialType,
      trackedData: manifestationMaterialTypes.join(", ")
    });
    collectPageStatistics({
      ...statistics.materialSource,
      trackedData: first(first(selectedManifestations)?.source) ?? "No source"
    });
    // We just want to track if the currently selected manifestation changes (which should be once - on initial render)
    // and when the currently selected manifestation's material type changes - on availability button click.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manifestationMaterialTypes]);

  return (
    <header className="material-header">
      <div className="material-header__cover">
        <Cover
          ids={coverPids}
          bestRepresentation={bestRepresentation}
          size="xlarge"
          animate
          shadow="small"
        />
      </div>
      <div
        data-cy="material-header-content"
        className="material-header__content"
      >
        <ButtonFavourite
          title={String(title)}
          id={wid}
          addToListRequest={addToListRequest}
        />
        <MaterialHeaderText
          title={String(title)}
          author={author}
          languageIsoCode={languageIsoCode}
          materialTitleId={materialTitleId}
        />
        <div ref={itemRef} className="material-header__availability-label">
          {!isGlobalMaterial && showItem && (
            <AvailabilityLabels
              cursorPointer
              workId={wid}
              manifestations={manifestations}
              selectedManifestations={selectedManifestations}
              setSelectedManifestations={setSelectedManifestations}
            />
          )}
        </div>
        {/* The CTA buttons apparently only make sense on a global work */}
        {!isGlobalMaterial && showItem && (
          <>
            {isPeriodical(selectedManifestations) && (
              <MaterialPeriodical
                faustId={convertPostIdToFaustId(pid)}
                selectedPeriodical={selectedPeriodical}
                selectPeriodicalHandler={selectPeriodicalHandler}
                isYearbook={isYearbook}
              />
            )}
            {selectedManifestations && (
              <>
                <div className="material-header__button">
                  <MaterialButtons
                    manifestations={selectedManifestations}
                    workId={wid}
                    dataCy="material-header-buttons"
                    materialTitleId={materialTitleId}
                  />
                </div>
                {/* MaterialAvailabilityText is only shown for:
                    - Online manifestations if the user is logged in
                    - physical manifestations
                    - that are not periodical or articles
                    - that are available in at least one local library branch
                */}
                {shouldShowMaterialAvailabilityText(selectedManifestations) &&
                  isAvailable && (
                    <MaterialAvailabilityText
                      manifestations={selectedManifestations}
                    />
                  )}
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
