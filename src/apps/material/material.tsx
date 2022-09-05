import React, { useEffect, useState } from "react";
import VariousIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Various.svg";
import CreateIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Create.svg";
import Receipt from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Receipt.svg";
import MaterialHeader from "../../components/material/MaterialHeader";
import {
  ExternalReview,
  InfomediaReview,
  LibrariansReview,
  useGetMaterialQuery,
  ManifestationsSimpleFieldsFragment
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

export interface MaterialProps {
  wid: WorkId;
}

const Material: React.FC<MaterialProps> = ({ wid }) => {
  const t = useText();

  const [currentManifestation, setCurrentManifestation] =
    useState<ManifestationsSimpleFieldsFragment | null>(null);

  // periodicalSelect must be used later to change the UI and reservation when you have chosen a specific periodical
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [periodicalSelect, setPeriodicalSelect] = useState<string | null>(null);

  const { data, isLoading } = useGetMaterialQuery({
    wid
  });

  // This useEffect selects the current manifestation
  useEffect(() => {
    if (!data?.work) return;
    const { work } = data;
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

  const { work } = data;
  const { manifestations } = work;

  // TODO: Temporary way to get a pid we can use for showing a cover for the material.
  // It should be replaced with some dynamic feature
  // that follows the current type of the material.
  const pid = getManifestationPid(manifestations);

  const listDescriptionData = getWorkDescriptionListData({
    manifestation: currentManifestation,
    work,
    t
  });

  return (
    <main className="material-page">
      <MaterialHeader
        wid={wid}
        work={data.work}
        manifestation={
          currentManifestation as ManifestationsSimpleFieldsFragment
        }
        selectManifestationHandler={setCurrentManifestation}
        selectPeriodicalSelect={setPeriodicalSelect}
      />
      <MaterialDescription pid={pid} work={data.work} />
      <Disclosure
        mainIconPath={VariousIcon}
        title={`${t("editionsText")} (${work?.manifestations?.all.length})`}
        disclosureIconExpandAltText=""
      >
        {manifestations.all.map((manifestation) => {
          return (
            <MaterialMainfestationItem
              key={manifestation.pid}
              manifestation={manifestation}
            />
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
      {data.work.reviews && data.work.reviews.length >= 1 && (
        <Disclosure title={t("reviewsText")} mainIconPath={CreateIcon}>
          <MaterialReviews
            listOfReviews={
              data.work.reviews as Array<
                LibrariansReview | ExternalReview | InfomediaReview
              >
            }
          />
        </Disclosure>
      )}
    </main>
  );
};

export default Material;
