import React from "react";
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
import { Pid, WorkId } from "../../core/utils/types/ids";
import MaterialDescription from "../../components/material/MaterialDescription";
import Disclosure from "../../components/material/disclosures/disclosure";
import { MaterialReviews } from "../../components/material/MaterialReviews";
import MaterialMainfestationItem from "../../components/material/MaterialMainfestationItem";
import ListDescription, {
  ListData
} from "../../components/list-description/list-description";
import { useText } from "../../core/utils/text";
import {
  creatorsToString,
  filterCreators,
  flattenCreators,
  getManifestationPid
} from "../../core/utils/helpers/general";

export interface MaterialProps {
  wid: WorkId;
}

const Material: React.FC<MaterialProps> = ({ wid }) => {
  const t = useText();
  const { data, isLoading } = useGetMaterialQuery({
    wid
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // TODO: handle error if data is empty array
  if (!data?.work) {
    return <div>No work data</div>;
  }

  const {
    manifestations,
    titles,
    materialTypes,
    mainLanguages,
    creators,
    workYear
  } = data.work;

  // TODO: Temporary way to get a pid we can use for showing a cover for the material.
  // It should be replaced with some dynamic feature
  // that follows the current type of the material.
  const pid = getManifestationPid(manifestations) as Pid;
  const creatorsText = creatorsToString(
    flattenCreators(filterCreators(creators, ["Person"])),
    t
  );

  const allLanguages = mainLanguages
    .map((language) => language.display)
    .join(", ");

  const listDescriptionData = {
    [t("typeText")]: {
      value: materialTypes?.[0]?.specific,
      type: "standard"
    },
    [t("languageText")]: {
      value: allLanguages,
      type: "standard"
    },
    [t("contributorsText")]: { value: creatorsText, type: "link" },
    [t("originalTitleText")]: {
      value: `${titles?.original} ${workYear}`,
      type: "standard"
    }
    // TODO: Logic must be created to select the manifestation to be presented for the rest of listDescriptionData

    // [t("isbnText")]: { value: "ISBN", type: "standard" },
    // [t("editionText")]: { value: "Udgave, 2. oplag (2015)", type: "standard" },
    // [t("scopeText")]: { value: "795 sider", type: "standard" },
    // [t("publisherText")]: { value: "Rosinante", type: "standard" },
    // [t("audienceText")]: { value: "Voksenmateriale", type: "standard" }
  };

  return (
    <main className="material-page">
      <MaterialHeader wid={wid} work={data.work} />
      <MaterialDescription pid={pid} work={data.work} />
      <Disclosure
        mainIconPath={VariousIcon}
        title={`${t("editionsText")} (${
          data?.work?.manifestations?.all.length
        })`}
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
        <ListDescription
          className="pl-80 pb-48"
          data={listDescriptionData as ListData}
        />
      </Disclosure>
      {data.work.reviews && data.work.reviews.length >= 1 && (
        <Disclosure title="Anmeldelser" mainIconPath={CreateIcon}>
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
