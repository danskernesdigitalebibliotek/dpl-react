import React from "react";
import VariousIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Various.svg";
import ReceiptIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Receipt.svg";
import CreateIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Create.svg";
import ExpandIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import MaterialHeader from "../../components/material/MaterialHeader";
import { useGetMaterialQuery } from "../../core/dbc-gateway/generated/graphql";
import { Pid } from "../../core/utils/types/ids";
import MaterialDescription from "../../components/material/MaterialDescription";
import MaterialMainfestationItem from "../../components/material/MaterialMainfestationItem";

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
      <details className="disclosure text-body-large">
        <summary className="disclosure__headline text-body-large">
          <div className="disclosure__icon bg-identity-tint-120 m-24">
            <img
              className="disclosure__icon"
              src={VariousIcon}
              alt="various-icon"
            />
          </div>
          Udgaver (2)
          <img
            className="disclosure__expand mr-24 noselect"
            src={ExpandIcon}
            alt="expand-icon"
          />
        </summary>

        {data?.work?.manifestations?.all.map((item) => {
          return <MaterialMainfestationItem key={item.pid} item={item} />;
        })}
      </details>
      <details className="disclosure text-body-large">
        <summary className="disclosure__headline text-body-large">
          <div className="disclosure__icon bg-identity-tint-120 m-24">
            <img
              className="disclosure__icon"
              src={ReceiptIcon}
              alt="receipt-icon"
            />
          </div>
          Detaljer
          <img
            className="disclosure__expand mr-24 noselect"
            src={ExpandIcon}
            alt="expand-icon"
          />
        </summary>
        <dl className="list-description pl-80 pb-48">
          <div>
            <dt>Type:</dt>
            <dd>Bog</dd>
          </div>
          <div>
            <dt>Sprog:</dt>
            <dd>Dansk</dd>
          </div>
          <div>
            <dt>Bidragsydere:</dt>
            <dd>
              <span className="link-tag">Karsten Sand Iversen</span>
            </dd>
          </div>
          <div>
            <dt>Originaltitel:</dt>
            <dd>Ulysses (1922)</dd>
          </div>
          <div>
            <dt>ISBN:</dt>
            <dd>9788763814584</dd>
          </div>
          <div>
            <dt>Udgave:</dt>
            <dd>Udgave, 2. oplag (2015)</dd>
          </div>
          <div>
            <dt>Omfang:</dt>
            <dd>795 sider</dd>
          </div>
          <div>
            <dt>Forlag:</dt>
            <dd>Rosinante</dd>
          </div>
          <div>
            <dt>Målgruppe:</dt>
            <dd>Voksenmateriale</dd>
          </div>
        </dl>
      </details>
      <details className="disclosure text-body-large">
        <summary className="disclosure__headline text-body-large">
          <div className="disclosure__icon bg-identity-tint-120 m-24">
            <img
              className="disclosure__icon"
              src={CreateIcon}
              alt="create-icon"
            />
          </div>
          Anmeldelser
          <img
            className="disclosure__expand mr-24 noselect"
            src={ExpandIcon}
            alt="expand-icon"
          />
        </summary>
        Content
      </details>
    </main>
  );
};

export default Material;
