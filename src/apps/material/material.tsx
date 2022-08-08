import React from "react";
import VariousIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Various.svg";
import Receipt from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Receipt.svg";
import MaterialHeader from "../../components/material/MaterialHeader";
import { useGetMaterialQuery } from "../../core/dbc-gateway/generated/graphql";
import { Pid } from "../../core/utils/types/ids";
import MaterialDescription from "../../components/material/MaterialDescription";
import MaterialMainfestationItem from "../../components/material/MaterialMainfestationItem";
import Disclosure from "../../components/material/disclosures/disclosure";
import ListDescription, {
  ListData
} from "../../components/list-description/list-description";
import { useText } from "../../core/utils/text";
import {
  creatorsToString,
  filterCreators,
  flattenCreators
} from "../../core/utils/helpers";

export interface MaterialProps {
  pid: Pid;
  searchUrl: string;
}

const Material: React.FC<MaterialProps> = ({ pid, searchUrl }) => {
  const t = useText();
  const { data, isLoading } = useGetMaterialQuery({
    pid
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

  const creatorsText = creatorsToString(
    flattenCreators(filterCreators(creators, ["Person"])),
    t
  );

  const listDescriptionData = {
    Type: {
      value: materialTypes?.[0]?.specific,
      type: "standard"
    },
    Sprog: { value: mainLanguages?.[0].display, type: "standard" },
    Bidragsydere: { value: creatorsText, type: "link" },
    Originaltitel: {
      value: `${titles?.original} ${workYear}`,
      type: "standard"
    }
    // TODO: Logic must be created to select the manifestation to be presented for the rest of listDescriptionData

    // ISBN: { value: "ISBN", type: "standard" },
    // Udgave: { value: "Udgave, 2. oplag (2015)", type: "standard" },
    // Omfang: { value: "795 sider", type: "standard" },
    // Forlag: { value: "Rosinante", type: "standard" },
    // Målgruppe: { value: "Voksenmateriale", type: "standard" }
  };

  return (
    <main className="material-page">
      <MaterialHeader pid={pid} work={data.work} />
      <MaterialDescription pid={pid} work={data.work} searchUrl={searchUrl} />
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
        title="Detaljer"
        disclosureIconExpandAltText=""
      >
        <ListDescription
          className="pl-80 pb-48"
          data={listDescriptionData as ListData}
        />
      </Disclosure>
    </main>
  );
};

export default Material;
