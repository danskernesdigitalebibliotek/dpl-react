import CreateIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Create.svg";
import Receipt from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Receipt.svg";
import VariousIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Various.svg";
import React, { useEffect, useState } from "react";
import { useDeepCompareEffect, useUpdateEffect } from "react-use";
import DisclosureControllable from "../../components/Disclosures/DisclosureControllable";
import DisclosureSummary from "../../components/Disclosures/DisclosureSummary";
import DigitalModal from "../../components/material/digital-modal/DigitalModal";
import InfomediaModal from "../../components/material/infomedia/InfomediaModal";
import { hasCorrectAccess } from "../../components/material/material-buttons/helper";
import MaterialDescription from "../../components/material/MaterialDescription";
import MaterialDetailsList from "../../components/material/MaterialDetailsList";
import MaterialHeader from "../../components/material/MaterialHeader";
import MaterialMainfestationItem from "../../components/material/MaterialMainfestationItem";
import { MaterialReviews } from "../../components/material/MaterialReviews";
import MaterialSkeleton from "../../components/material/MaterialSkeleton";
import { PeriodicalEdition } from "../../components/material/periodical/helper";
import { statistics } from "../../core/statistics/statistics";
import {
  useCollectPageStatistics,
  usePageStatistics
} from "../../core/statistics/useStatistics";
import { getWorkPid } from "../../core/utils/helpers/general";
import {
  getUrlQueryParam,
  setQueryParametersInUrl
} from "../../core/utils/helpers/url";
import { usePatronData } from "../../core/utils/helpers/usePatronData";
import { isAnonymous, isBlocked } from "../../core/utils/helpers/user";
import { useText } from "../../core/utils/text";
import { Manifestation, Work } from "../../core/utils/types/entities";
import { WorkId } from "../../core/utils/types/ids";
import { useGetWork } from "../../core/utils/useGetWork";
import {
  divideManifestationsByMaterialType,
  getBestMaterialTypeForWork,
  getDetailsListData,
  getFirstManifestation,
  getInfomediaIds,
  getManifestationAudience,
  getManifestationsOrderByTypeAndYear,
  isParallelReservation
} from "./helper";
import MaterialDisclosure from "./MaterialDisclosure";
import ReservationFindOnShelfModals from "./ReservationFindOnShelfModals";
import PlayerModal from "../../components/material/player-modal/PlayerModal";
import useReaderPlayer from "../../core/utils/useReaderPlayer";
import OnlineInternalModal from "../../components/reservation/OnlineInternalModal";
import MaterialGridRelated from "../../components/material-grid-related/MaterialGridRelated";
import { first } from "lodash";

export interface MaterialProps {
  wid: WorkId;
}

const Material: React.FC<MaterialProps> = ({ wid }) => {
  const t = useText();
  const [selectedManifestations, setSelectedManifestations] = useState<
    Manifestation[] | null
  >(null);
  const [selectedPeriodical, setSelectedPeriodical] =
    useState<PeriodicalEdition | null>(null);
  const { data, isLoading, workType } = useGetWork(wid);
  const { data: userData } = usePatronData();
  const [isUserBlocked, setIsUserBlocked] = useState<boolean | null>(null);
  const { updatePageStatistics } = usePageStatistics();
  const { collectPageStatistics } = useCollectPageStatistics();
  const {
    type: readerPlayerType,
    identifier,
    orderId
  } = useReaderPlayer(getFirstManifestation(selectedManifestations || []));

  useUpdateEffect(() => {
    updatePageStatistics({ waitTime: 2500 });
  }, [selectedManifestations, selectedPeriodical]);

  useEffect(() => {
    setIsUserBlocked(!!(userData?.patron && isBlocked(userData.patron)));
  }, [userData]);

  useDeepCompareEffect(() => {
    if (data?.work?.genreAndForm) {
      collectPageStatistics({
        ...statistics.materialGenre,
        trackedData: data.work.genreAndForm.join(", ")
      });
    }
    if (data?.work?.mainLanguages) {
      collectPageStatistics({
        ...statistics.materialLanguage,
        trackedData: data.work.mainLanguages
          .map((language) => language.display)
          .join(", ")
      });
    }
    if (data?.work?.dk5MainEntry) {
      collectPageStatistics({
        ...statistics.materialTopicNumber,
        trackedData: data.work.dk5MainEntry.display
      });
    }
    if (data?.work?.manifestations.bestRepresentation.audience) {
      collectPageStatistics({
        ...statistics.materialAudience,
        trackedData: getManifestationAudience(
          data.work.manifestations.bestRepresentation as Manifestation,
          t
        )
      });
    }
    if (data?.work?.fictionNonfiction) {
      collectPageStatistics({
        ...statistics.materialFictionNonFiction,
        trackedData: data.work.fictionNonfiction.display
      });
    }
    // In this case we only want to track once - on work data load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // Track the audience whenever the selected manifestation changes
  useUpdateEffect(() => {
    if (first(selectedManifestations)) {
      collectPageStatistics({
        ...statistics.materialAudience,
        trackedData: getManifestationAudience(
          first(selectedManifestations) as Manifestation,
          t
        )
      });
    }
  }, [selectedManifestations]);

  useEffect(() => {
    if (!data?.work) return;
    const { work } = data as { work: Work };

    const urlType = getUrlQueryParam("type");
    const manifestationsByMaterialType = divideManifestationsByMaterialType(
      work.manifestations.all
    );

    const urlTypeIsPresentInManifestations =
      urlType && manifestationsByMaterialType[urlType]?.length > 0;

    if (urlTypeIsPresentInManifestations) {
      // Use the type from the URL if it's present in the manifestations
      setSelectedManifestations(manifestationsByMaterialType[urlType]);
    } else {
      // Otherwise, fallback to the best material type for the work
      const bestMaterialType = getBestMaterialTypeForWork(work);
      setSelectedManifestations(manifestationsByMaterialType[bestMaterialType]);
      setQueryParametersInUrl({ type: bestMaterialType });
    }
  }, [data]);

  if (isLoading || !data?.work || !selectedManifestations) {
    return <MaterialSkeleton />;
  }

  const {
    work,
    work: {
      manifestations: { all: manifestations },
      relations: { hasReview }
    }
  } = data as { work: Work };

  const pid = getWorkPid(work);
  const detailsListData = getDetailsListData({
    manifestation: selectedManifestations[0],
    work,
    t
  });
  const infomediaIds = getInfomediaIds(selectedManifestations);

  // Get disclosure URL parameter from the current URL to see if it should be open.
  const shouldOpenReviewDisclosure = !!getUrlQueryParam("disclosure");

  return (
    <>
      <section className="material-page">
        <MaterialHeader
          wid={wid}
          work={work}
          selectedManifestations={selectedManifestations}
          setSelectedManifestations={setSelectedManifestations}
          selectedPeriodical={selectedPeriodical}
          selectPeriodicalHandler={setSelectedPeriodical}
          isGlobalMaterial={workType === "global"}
        >
          {manifestations.map((manifestation) => (
            <ReservationFindOnShelfModals
              key={manifestation.pid}
              patron={userData?.patron}
              manifestations={[manifestation]}
              selectedPeriodical={selectedPeriodical}
              work={work}
              setSelectedPeriodical={setSelectedPeriodical}
            />
          ))}
          {infomediaIds.length > 0 && !isAnonymous() && !isUserBlocked && (
            <InfomediaModal
              selectedManifestations={selectedManifestations}
              infoMediaId={infomediaIds[0]}
            />
          )}
          {hasCorrectAccess("DigitalArticleService", selectedManifestations) &&
            !isAnonymous() &&
            !isUserBlocked && (
              <DigitalModal pid={selectedManifestations[0].pid} workId={wid} />
            )}
          {/* Only create a main version of "reservation" & "find on shelf" modal for physical materials with multiple editions.
        Online materials lead to external links, or to same modals as are created for singular editions. */}
          {isParallelReservation(selectedManifestations) && (
            <ReservationFindOnShelfModals
              patron={userData?.patron}
              manifestations={selectedManifestations}
              selectedPeriodical={selectedPeriodical}
              work={work}
              setSelectedPeriodical={setSelectedPeriodical}
            />
          )}
          {readerPlayerType === "player" && (
            <>
              {identifier && <PlayerModal identifier={identifier} />}
              {orderId && <PlayerModal orderId={orderId} />}
            </>
          )}
          {(readerPlayerType === "reader" || readerPlayerType === "player") && (
            <OnlineInternalModal
              workId={wid}
              selectedManifestations={selectedManifestations}
            />
          )}
        </MaterialHeader>
        <MaterialDescription pid={pid} work={work} />
        {/* Since we cannot trust the editions for global manifestations */}
        {/* we limit them to only occur if the loaded work is global */}
        {workType === "local" && (
          <MaterialDisclosure
            title={`${t("editionsText")} (${manifestations.length})`}
            icon={VariousIcon}
            dataCy="material-editions-disclosure"
          >
            <>
              {getManifestationsOrderByTypeAndYear(manifestations).map(
                (manifestation: Manifestation) => {
                  return (
                    <MaterialMainfestationItem
                      key={manifestation.pid}
                      manifestation={manifestation}
                      workId={wid}
                    />
                  );
                }
              )}
            </>
          </MaterialDisclosure>
        )}
        <MaterialDisclosure
          dataCy="material-details-disclosure"
          title={t("detailsText")}
          icon={Receipt}
        >
          <MaterialDetailsList
            id={`material-details-${wid}`}
            className="pl-80 pb-48"
            data={detailsListData}
          />
        </MaterialDisclosure>
        {hasReview && hasReview.length > 0 && (
          <DisclosureControllable
            detailsClassName="disclosure text-body-large"
            id="reviews"
            showContent={shouldOpenReviewDisclosure}
            cyData="material-reviews-disclosure"
            summary={
              <DisclosureSummary
                title={t("reviewsText")}
                mainIconPath={CreateIcon}
              />
            }
          >
            <MaterialReviews pids={hasReview.map((review) => review.pid)} />
          </DisclosureControllable>
        )}
      </section>
      {work && (
        <section>
          <MaterialGridRelated work={work} />
        </section>
      )}
    </>
  );
};

export default Material;
