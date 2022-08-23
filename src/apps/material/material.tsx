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
import { Pid, WorkId } from "../../core/utils/types/ids";
import MaterialDescription from "../../components/material/MaterialDescription";
import Disclosure from "../../components/material/disclosures/disclosure";
import { MaterialReviews } from "../../components/material/MaterialReviews";
import MaterialMainfestationItem from "../../components/material/MaterialMainfestationItem";

import { useText } from "../../core/utils/text";
import {
  creatorsToString,
  filterCreators,
  flattenCreators,
  getManifestationPid,
  getFirstPublishedManifestation,
  slugify
} from "../../core/utils/helpers/general";
import {
  getUrlQueryParam,
  setQueryParametersInUrl
} from "../../core/utils/helpers/url";
import MaterialDetailsList, {
  ListData
} from "../../components/material/MaterialDetailsList";

export interface MaterialProps {
  wid: WorkId;
}

const Material: React.FC<MaterialProps> = ({ wid }) => {
  const t = useText();
  const [typeState, setTypeState] = useState<null | string>(null);
  const { data, isLoading } = useGetMaterialQuery({
    wid
  });

  useEffect(() => {
    if (!data?.work) return;

    if (!typeState) {
      const type = getUrlQueryParam("type");
      if (type) {
        setTypeState(type);
      } else {
        // Takes the type of first Published Manifestation
        const firstPublishedManifestation = getFirstPublishedManifestation(
          data.work.manifestations
        ).materialTypes[0].specific;

        setQueryParametersInUrl({
          type: slugify(firstPublishedManifestation)
        });
        setTypeState(slugify(firstPublishedManifestation));
      }
    }
  }, [data?.work, typeState]);

  const handleSelectType = (type: string) => {
    setQueryParametersInUrl({ type: slugify(type) });
    setTypeState(slugify(type));
  };

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

  const listDescriptionData: ListData = [
    {
      label: t("typeText"),
      value: materialTypes?.[0]?.specific,
      type: "standard"
    },
    {
      label: t("languageText"),
      value: allLanguages,
      type: "standard"
    },
    { label: t("contributorsText"), value: creatorsText, type: "link" },
    {
      label: t("originalTitleText"),
      value: `${titles?.original} ${workYear}`,
      type: "standard"
    }
  ];

  return (
    <main className="material-page">
      <MaterialHeader
        wid={wid}
        work={data.work}
        selectedType={typeState}
        handleSelectType={handleSelectType}
      />
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
