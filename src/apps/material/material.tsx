import React, { useEffect, useState } from "react";
import VariousIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Various.svg";
import CreateIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Create.svg";
import Receipt from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Receipt.svg";
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
  getWorkManifestation
} from "./helper";
import FindOnShelfModal from "../../components/find-on-shelf/FindOnShelfModal";
import { Manifestation, Work } from "../../core/utils/types/entities";
import {
  getManifestationPid,
  materialIsFiction
} from "../../core/utils/helpers/general";
import ReservationModal from "../../components/reservation/ReservationModal";
import { GroupListItem } from "../../components/material/MaterialPeriodicalSelect";

export interface MaterialProps {
  wid: WorkId;
}

const Material: React.FC<MaterialProps> = ({ wid }) => {
  const t = useText();

  const [currentManifestation, setCurrentManifestation] =
    useState<Manifestation | null>(null);

  const [selectedPeriodical, setSelectedPeriodical] =
    useState<GroupListItem | null>(null);

  const { data, isLoading } = useGetMaterialQuery({
    wid
  });

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
  if (!data?.work) {
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

  if (!currentManifestation) {
    return null;
  }

  const parallelManifestations = materialIsFiction(work) ? manifestations : [];

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
      >
        {manifestations.map((manifestation: Manifestation) => {
          return (
            <>
              <MaterialMainfestationItem
                key={manifestation.pid}
                manifestation={manifestation}
              />
              <FindOnShelfModal
                manifestations={[manifestation]}
                workTitles={manifestation.titles.main}
                authors={manifestation.creators}
                key={`find-on-shelf-modal-${manifestation.pid}`}
              />
              <ReservationModal
                mainManifestation={manifestation}
                parallelManifestations={parallelManifestations}
              />
            </>
          );
        })}
      </Disclosure>
      <Disclosure
        mainIconPath={Receipt}
        title={t("detailsText")}
        disclosureIconExpandAltText=""
      >
        <MaterialDetailsList
          className="pl-80 pb-48"
          data={listDescriptionData}
        />
      </Disclosure>
      {reviews && reviews.length >= 1 && (
        <Disclosure title={t("reviewsText")} mainIconPath={CreateIcon}>
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
          />
          <ReservationModal
            mainManifestation={currentManifestation}
            parallelManifestations={parallelManifestations}
            selectedPeriodical={selectedPeriodical}
          />
        </>
      )}
    </main>
  );
};

export default Material;
