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
import { getManifestationPid } from "../../core/utils/helpers/general";
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
import ReservationModal from "../../components/reservation/reservation-modal";
import FindOnShelfModal from "../../components/find-on-shelf/FindOnShelfModal";
import { Manifestation, Work } from "../../core/utils/types/entities";

export interface MaterialProps {
  wid: WorkId;
}

const Material: React.FC<MaterialProps> = ({ wid }) => {
  const t = useText();

  const [currentManifestation, setCurrentManifestation] =
    useState<Manifestation | null>(null);

  // periodicalSelect must be used later to change the UI and reservation when you have chosen a specific periodical
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [periodicalSelect, setPeriodicalSelect] = useState<string | null>(null);

  const { data, isLoading } = useGetMaterialQuery({
    wid
  });

  // This useEffect selects the current manifestation
  useEffect(() => {
    if (!data?.work) return;
    const { work } = data as { work: Work };
    const type = getUrlQueryParam("type");
    // if there is no type in the url, <getWorkManif></getWorkManif>estation is used to set the state and url type parameters
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

  return (
    <main className="material-page">
      <MaterialHeader
        wid={wid}
        work={work}
        manifestation={currentManifestation}
        selectManifestationHandler={setCurrentManifestation}
        selectPeriodicalSelect={setPeriodicalSelect}
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
                manifestation={manifestation}
                key={`find-on-shelf-modal-${manifestation.pid}`}
              />
              <ReservationModal manifestation={manifestation} />
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
          <FindOnShelfModal manifestation={currentManifestation} />
          <ReservationModal manifestation={currentManifestation} />
        </>
      )}
    </main>
  );
};

export default Material;
