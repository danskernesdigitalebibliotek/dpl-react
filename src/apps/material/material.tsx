import React, { useEffect, useState } from "react";
import VariousIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Various.svg";
import CreateIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Create.svg";
import Receipt from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Receipt.svg";
import { useDeepCompareEffect } from "react-use";
import { useGetMaterialQuery } from "../../core/dbc-gateway/generated/graphql";
import { WorkId } from "../../core/utils/types/ids";
import MaterialDescription from "../../components/material/MaterialDescription";
import { MaterialReviews } from "../../components/material/MaterialReviews";
import MaterialMainfestationItem from "../../components/material/MaterialMainfestationItem";
import { useText } from "../../core/utils/text";
import MaterialDetailsList from "../../components/material/MaterialDetailsList";
import {
  getUrlQueryParam,
  setQueryParametersInUrl
} from "../../core/utils/helpers/url";
import {
  getDetailsListData,
  getInfomediaIds,
  divideManifestationsByMaterialType,
  getBestMaterialTypeForWork,
  getManifestationsOrderByTypeAndYear,
  isParallelReservation
} from "./helper";
import { Manifestation, Work } from "../../core/utils/types/entities";
import { getManifestationPid } from "../../core/utils/helpers/general";
import { PeriodicalEdition } from "../../components/material/periodical/helper";
import InfomediaModal from "../../components/material/infomedia/InfomediaModal";
import { useStatistics } from "../../core/statistics/useStatistics";
import { statistics } from "../../core/statistics/statistics";
import DisclosureControllable from "../../components/Disclosures/DisclosureControllable";
import DigitalModal from "../../components/material/digital-modal/DigitalModal";
import { hasCorrectAccess } from "../../components/material/material-buttons/helper";
import MaterialHeader from "../../components/material/MaterialHeader";
import MaterialSkeleton from "../../components/material/MaterialSkeleton";
import DisclosureSummary from "../../components/Disclosures/DisclosureSummary";
import MaterialDisclosure from "./MaterialDisclosure";
import { isAnonymous, isBlocked } from "../../core/utils/helpers/user";
import ReservationFindOnShelfModals from "./ReservationFindOnShelfModals";
import { usePatronData } from "../../components/material/helper";

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
  const { data, isLoading } = useGetMaterialQuery({
    wid
  });
  const { data: userData } = usePatronData();
  const [isUserBlocked, setIsUserBlocked] = useState<boolean | null>(null);
  const { track } = useStatistics();

  useEffect(() => {
    setIsUserBlocked(!!(userData?.patron && isBlocked(userData.patron)));
  }, [userData]);

  useDeepCompareEffect(() => {
    if (data?.work?.genreAndForm) {
      track("click", {
        id: statistics.materialGenre.id,
        name: statistics.materialGenre.name,
        trackedData: data.work.genreAndForm.join(", ")
      });
    }
    if (data?.work?.mainLanguages) {
      track("click", {
        id: statistics.materialLanguage.id,
        name: statistics.materialLanguage.name,
        trackedData: data.work.mainLanguages
          .map((language) => language.display)
          .join(", ")
      });
    }
    if (data?.work?.dk5MainEntry) {
      track("click", {
        id: statistics.materialTopicNumber.id,
        name: statistics.materialTopicNumber.name,
        trackedData: data.work.dk5MainEntry.display
      });
    }
    // We can afford to only check the latest manifestation because audience doesn't
    // vary between a specific work's manifestations (information provided by DDF).
    if (data?.work?.manifestations.latest.audience?.generalAudience) {
      track("click", {
        id: statistics.materialTopicNumber.id,
        name: statistics.materialTopicNumber.name,
        trackedData:
          data.work.manifestations.latest.audience.generalAudience.join(", ")
      });
    }
    if (data?.work?.fictionNonfiction) {
      track("click", {
        id: statistics.materialFictionNonFiction.id,
        name: statistics.materialFictionNonFiction.name,
        trackedData: data.work.fictionNonfiction.display
      });
    }
    // In this case we only want to track once - on work data load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // This useEffect selects the current manifestation.
  useEffect(() => {
    if (!data?.work) return;
    const { work } = data as { work: Work };
    const type = getUrlQueryParam("type");
    const manifestationsByMaterialType = divideManifestationsByMaterialType(
      work.manifestations.all
    );
    // If there is no type in the url, we select one.
    if (!type) {
      const bestMaterialType = getBestMaterialTypeForWork(work);
      setSelectedManifestations(manifestationsByMaterialType[bestMaterialType]);
      setQueryParametersInUrl({
        type: bestMaterialType
      });
      return;
    }
    // If there is a type, use it to select a group of manifestations.
    setSelectedManifestations(manifestationsByMaterialType[type]);
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

  const pid = getManifestationPid(manifestations);
  const detailsListData = getDetailsListData({
    manifestation: selectedManifestations[0],
    work,
    t
  });
  const infomediaIds = getInfomediaIds(selectedManifestations);

  // Get disclosure URL parameter from the current URL to see if it should be open.
  const shouldOpenReviewDisclosure = !!getUrlQueryParam("disclosure");

  console.log("🚀 ~ file: material.tsx ~ isAnonymous:", isAnonymous);

  return (
    <section className="material-page">
      <MaterialHeader
        wid={wid}
        work={work}
        selectedManifestations={selectedManifestations}
        setSelectedManifestations={setSelectedManifestations}
        selectedPeriodical={selectedPeriodical}
        selectPeriodicalHandler={setSelectedPeriodical}
      >
        {manifestations.map((manifestation) => (
          <ReservationFindOnShelfModals
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
      </MaterialHeader>
      <MaterialDescription pid={pid} work={work} />
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
  );
};

export default Material;
