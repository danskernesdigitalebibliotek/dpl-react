import * as React from "react";
import { FC } from "react";
import ExpandIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";

export interface MaterialMainfestationItemProps {
  item: any;
}

const MaterialMainfestationItem: FC<MaterialMainfestationItemProps> = ({
  item
}) => {
  console.log(
    "🚀 ~ file: MaterialMainfestationItem.tsx ~ line 12 ~ item",
    item
  );
  return (
    <div className="material-manifestation-item">
      <div className="material-manifestation-item__availability">
        <div className="pagefold-parent--xsmall availability-label text-label availability-label--unselected">
          <div className="pagefold-triangle--xsmall--success pagefold-triangle--xsmall" />
          <img
            className="availability-label--check available"
            src="icons/collection/Check.svg"
            alt="check-icon"
          />
          <p className="text-label-semibold ml-24">
            {item?.materialTypes[0]?.specific}
          </p>
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
          {item?.titles?.main[0]}
        </h2>
        <p className="text-small-caption">
          Af {item?.creators[0]?.display} ({item?.hostPublication?.year?.year})
        </p>
        <div className="material-manifestation-item__text__details">
          <p className="link-tag text-small-caption">Detaljer om materialet</p>
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
  );
};

export default MaterialMainfestationItem;
