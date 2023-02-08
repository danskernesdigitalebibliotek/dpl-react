import React, { useEffect, useState } from "react";
import VariousIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Various.svg";
import CreateIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Create.svg";
import Receipt from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Receipt.svg";
import { useDeepCompareEffect } from "react-use";
import {
  AccessTypeCode,
  ExternalReview,
  InfomediaReview,
  LibrariansReview,
  useGetMaterialQuery
} from "../../core/dbc-gateway/generated/graphql";
import { WorkId } from "../../core/utils/types/ids";
import MaterialDescription from "../../components/material/MaterialDescription";
import Disclosure from "../../components/Disclosures/disclosure";
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
  getManifestationsOrderByTypeAndYear
} from "./helper";
import FindOnShelfModal from "../../components/find-on-shelf/FindOnShelfModal";
import { Manifestation, Work } from "../../core/utils/types/entities";
import { getManifestationPid } from "../../core/utils/helpers/general";
import ReservationModal from "../../components/reservation/ReservationModal";
import { PeriodicalEdition } from "../../components/material/periodical/helper";
import InfomediaModal from "../../components/material/infomedia/InfomediaModal";
import { useStatistics } from "../../core/statistics/useStatistics";
import { statistics } from "../../core/statistics/statistics";
import DisclosureControllable from "../../components/Disclosures/DisclosureControllable";
import DigitalModal from "../../components/material/digital-modal/DigitalModal";
import {
  hasCorrectAccess,
  hasCorrectAccessType,
  isArticle
} from "../../components/material/material-buttons/helper";
import MaterialHeader from "../../components/material/MaterialHeader";
import MaterialSkeleton from "../../components/material/MaterialSkeleton";
import { CoverPreloadLink } from "../../components/cover/coverPreloadLink";

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

  const { track } = useStatistics();
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
      reviews
    }
  } = data as { work: Work };

  // TODO: Temporary way to get a pid we can use for showing a cover for the material.
  // It should be replaced with some dynamic feature
  // that follows the current type of the material.
  const pid = getManifestationPid(manifestations);

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
      <CoverPreloadLink id={pid} size="xlarge" />
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
            <>
              <ReservationModal
                key={`reservation-modal-${manifestation.pid}`}
                selectedManifestations={[manifestation]}
                selectedPeriodical={selectedPeriodical}
                work={work}
              />
              <FindOnShelfModal
                key={`find-on-shelf-modal-${manifestation.pid}`}
                manifestations={[manifestation]}
                workTitles={manifestation.titles.main}
                authors={manifestation.creators}
                selectedPeriodical={selectedPeriodical}
                setSelectedPeriodical={setSelectedPeriodical}
              />
            </>
          ))}

          {infomediaIds.length > 0 && (
            <InfomediaModal
              selectedManifestations={selectedManifestations}
              infoMediaId={infomediaIds[0]}
            />
          )}

          {hasCorrectAccess(
            "DigitalArticleService",
            selectedManifestations
          ) && (
            <DigitalModal pid={selectedManifestations[0].pid} workId={wid} />
          )}

          {/* Only create a main version of "reservation" & "find on shelf" modal for physical materials.
        Online materials lead to external links, or to same modals as are created for singular editions. */}
          {selectedManifestations &&
            hasCorrectAccessType(
              AccessTypeCode.Physical,
              selectedManifestations
            ) &&
            !isArticle(selectedManifestations) && (
              <>
                <ReservationModal
                  selectedManifestations={selectedManifestations}
                  selectedPeriodical={selectedPeriodical}
                  work={work}
                />
                <FindOnShelfModal
                  manifestations={selectedManifestations}
                  authors={work.creators}
                  workTitles={work.titles.full}
                  selectedPeriodical={selectedPeriodical}
                  setSelectedPeriodical={setSelectedPeriodical}
                />
              </>
            )}
        </MaterialHeader>
        <MaterialDescription pid={pid} work={work} />
        <Disclosure
          mainIconPath={VariousIcon}
          title={`${t("editionsText")} (${manifestations.length})`}
          disclosureIconExpandAltText=""
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
        </Disclosure>
        <Disclosure
          mainIconPath={Receipt}
          title={t("detailsText")}
          disclosureIconExpandAltText=""
          dataCy="material-details-disclosure"
        >
          <MaterialDetailsList className="pl-80 pb-48" data={detailsListData} />
        </Disclosure>
        {reviews && reviews.length >= 1 && (
          <DisclosureControllable
            id="reviews"
            title={t("reviewsText")}
            mainIconPath={CreateIcon}
            showContent={shouldOpenReviewDisclosure}
            cyData="material-reviews-disclosure"
          >
            <MaterialReviews
              listOfReviews={
                reviews as Array<
                  LibrariansReview | ExternalReview | InfomediaReview
                >
              }
            />
          </DisclosureControllable>
        )}
      </section>
    </>
  );
};

export default Material;
