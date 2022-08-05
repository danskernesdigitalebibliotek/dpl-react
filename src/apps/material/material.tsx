import React from "react";
import VariousIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Various.svg";
import ReceiptIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Receipt.svg";
import CreateIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Create.svg";
import ExpandIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import MaterialHeader from "../../components/material/MaterialHeader";
import { useGetMaterialQuery } from "../../core/dbc-gateway/generated/graphql";
import { Pid } from "../../core/utils/types/ids";
import MaterialDescription from "../../components/material/MaterialDescription";

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
        <div className="material-manifestation-item">
          <div className="material-manifestation-item__availability">
            <div className="pagefold-parent--xsmall availability-label text-label availability-label--unselected">
              <div className="pagefold-triangle--xsmall--success pagefold-triangle--xsmall" />
              <img
                className="availability-label--check available"
                src="icons/collection/Check.svg"
                alt="check-icon"
              />
              <p className="text-label-semibold ml-24">BOG</p>
              <div className="availability-label--divider ml-4" />
              <p className="text-label-normal ml-4 mr-8">Hjemme</p>
            </div>
          </div>
          <div className="material-manifestation-item__cover">
            <div className="material-container">
              <span className="material material--small bg-identity-tint-120">
                <img src="images/book_cover_3.jpg" alt="I will be replaced" />
              </span>
            </div>
          </div>
          <div className="material-manifestation-item__text">
            <h2 className="material-manifestation-item__text__title text-header-h4">
              Title
            </h2>
            <p className="text-small-caption">Af Author (2022)</p>
            <div className="material-manifestation-item__text__details">
              <p className="link-tag text-small-caption">
                Detaljer om materialet
              </p>
              <img src={ExpandIcon} alt="ExpandMore-icon" />
            </div>
          </div>
          <div className="material-manifestation-item__reserve">
            <button
              type="button"
              className="btn-primary btn-filled btn-small arrow__hover--right-small"
            >
              RESERVER
            </button>
            <span className="link-tag text-small-caption material-manifestation-item__reserve__find">
              Find på hylden
            </span>
          </div>
        </div>
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
