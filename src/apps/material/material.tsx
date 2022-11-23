import React, { useEffect, useState } from "react";
import VariousIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Various.svg";
import CreateIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Create.svg";
import Receipt from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Receipt.svg";
import { useDeepCompareEffect } from "react-use";
import MaterialHeader from "../../components/material/MaterialHeader";
import {
  ExternalReview,
  InfomediaReview,
  LibrariansReview,
  useGetMaterialQuery
} from "../../core/dbc-gateway/generated/graphql";
import { WorkId } from "../../core/utils/types/ids";
import MaterialDescription from "../../components/material/MaterialDescription";
import Disclosure from "../../components/material/disclosures/disclosure";
import { MaterialReviews } from "../../components/material/MaterialReviews";
import MaterialMainfestationItem from "../../components/material/MaterialMainfestationItem";
import { useText } from "../../core/utils/text";
import MaterialDetailsList from "../../components/material/MaterialDetailsList";
import {
  getUrlQueryParam,
  setQueryParametersInUrl
} from "../../core/utils/helpers/url";
import {
  getWorkDescriptionListData,
  getManifestationFromType,
  getManifestationType,
  getWorkManifestation,
  getInfomediaId
} from "./helper";
import FindOnShelfModal from "../../components/find-on-shelf/FindOnShelfModal";
import { Manifestation, Work } from "../../core/utils/types/entities";
import {
  getManifestationPid,
  materialIsFiction
} from "../../core/utils/helpers/general";
import ReservationModal from "../../components/reservation/ReservationModal";
import { PeriodicalEdition } from "../../components/material/periodical/helper";
import InfomediaModal from "../../components/material/infomedia/InfomediaModal";
import { useStatistics } from "../../core/statistics/useStatistics";
import { statistics } from "../../core/statistics/statistics";

export interface MaterialProps {
  wid: WorkId;
}

const Material: React.FC<MaterialProps> = ({ wid }) => {
  const t = useText();
  const [currentManifestation, setCurrentManifestation] =
    useState<Manifestation | null>(null);
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
    // vary between a specific work's manifestations (information provided by DDF)
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

  // This useEffect selects the current manifestation
  useEffect(() => {
    if (!data?.work) return;
    const { work } = data as { work: Work };
    const type = getUrlQueryParam("type");
    // if there is no type in the url, getWorkManifestation is used to set the state and url type parameters
    if (!type) {
      const workManifestation = getWorkManifestation(work);
      setCurrentManifestation(workManifestation);
      setQueryParametersInUrl({
        type: getManifestationType(workManifestation)
      });
      return;
    }

    // if there is a type, getManifestationFromType will sort and filter all manifestation and choose the first one
    const manifestationFromType = getManifestationFromType(type, work);
    if (manifestationFromType) {
      setCurrentManifestation(manifestationFromType);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // TODO: handle error if data is empty array
  if (!data?.work || !currentManifestation) {
    return <div>No work data</div>;
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

  const listDescriptionData = getWorkDescriptionListData({
    manifestation: currentManifestation,
    work,
    t
  });
  const parallelManifestations = materialIsFiction(work) ? manifestations : [];
  const infomediaId = getInfomediaId(currentManifestation);

  return (
    <main className="material-page">
      <MaterialHeader
        wid={wid}
        work={work}
        manifestation={currentManifestation}
        selectManifestationHandler={setCurrentManifestation}
        selectedPeriodical={selectedPeriodical}
        selectPeriodicalHandler={setSelectedPeriodical}
      />
      <MaterialDescription pid={pid} work={work} />
      <Disclosure
        mainIconPath={VariousIcon}
        title={`${t("editionsText")} (${manifestations.length})`}
        disclosureIconExpandAltText=""
        dataCy="material-editions-disclosure"
      >
        {manifestations.map((manifestation: Manifestation) => {
          return (
            <>
              <MaterialMainfestationItem
                key={manifestation.pid}
                manifestation={manifestation}
                workId={wid}
              />
              <FindOnShelfModal
                manifestations={[manifestation]}
                workTitles={manifestation.titles.main}
                authors={manifestation.creators}
                key={`find-on-shelf-modal-${manifestation.pid}`}
                selectedPeriodical={selectedPeriodical}
                setSelectedPeriodical={setSelectedPeriodical}
              />
              <ReservationModal
                mainManifestation={manifestation}
                parallelManifestations={parallelManifestations}
                workId={wid}
              />
            </>
          );
        })}
      </Disclosure>
      <Disclosure
        mainIconPath={Receipt}
        title={t("detailsText")}
        disclosureIconExpandAltText=""
        dataCy="material-details-disclosure"
      >
        <MaterialDetailsList
          className="pl-80 pb-48"
          data={listDescriptionData}
        />
      </Disclosure>
      {reviews && reviews.length >= 1 && (
        <Disclosure
          title={t("reviewsText")}
          mainIconPath={CreateIcon}
          dataCy="material-reviews-disclosure"
        >
          <MaterialReviews
            listOfReviews={
              reviews as Array<
                LibrariansReview | ExternalReview | InfomediaReview
              >
            }
          />
        </Disclosure>
      )}
      {currentManifestation && (
        <>
          <FindOnShelfModal
            // TODO: when we have a selected manifestations group, pass it
            // down here as manifestations prop
            manifestations={[currentManifestation]}
            workTitles={work.titles.full}
            authors={work.creators}
            selectedPeriodical={selectedPeriodical}
            setSelectedPeriodical={setSelectedPeriodical}
          />
          <ReservationModal
            mainManifestation={currentManifestation}
            parallelManifestations={parallelManifestations}
            selectedPeriodical={selectedPeriodical}
            workId={wid}
          />
          {infomediaId && (
            <InfomediaModal
              mainManifestation={currentManifestation}
              infoMediaId={infomediaId}
            />
          )}
        </>
      )}
    </main>
  );
};

export default Material;
