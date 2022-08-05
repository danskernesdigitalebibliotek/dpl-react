import React from "react";
import VariousIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Various.svg";
import MaterialHeader from "../../components/material/MaterialHeader";
import { useGetMaterialQuery } from "../../core/dbc-gateway/generated/graphql";
import { Pid } from "../../core/utils/types/ids";
import MaterialDescription from "../../components/material/MaterialDescription";
import MaterialMainfestationItem from "../../components/material/MaterialMainfestationItem";
import Disclosure from "../../components/material/disclosures/disclosure";

export interface MaterialProps {
  pid: Pid;
  searchUrl: string;
}

const Material: React.FC<MaterialProps> = ({ pid, searchUrl }) => {
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

  return (
    <main className="material-page">
      <MaterialHeader pid={pid} work={data.work} />
      <MaterialDescription pid={pid} work={data.work} searchUrl={searchUrl} />
      <Disclosure
        mainIconPath={VariousIcon}
        title={`Udgaver (${data?.work?.manifestations?.all.length})`}
        disclosureIconExpandAltText=""
      >
        {data.work.manifestations.all.map((manifestation) => {
          return (
            <MaterialMainfestationItem
              key={manifestation.pid}
              manifestation={manifestation}
            />
          );
        })}
      </Disclosure>
    </main>
  );
};

export default Material;
