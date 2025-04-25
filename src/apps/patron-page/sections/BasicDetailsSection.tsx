import React, { FC } from "react";
import { useText } from "../../../core/utils/text";
import { Patron } from "../../../core/utils/types/entities";

interface BasicDetailsSectionProps {
  patron: Patron;
}

const BasicDetailsSection: FC<BasicDetailsSectionProps> = ({ patron }) => {
  const t = useText();
  const {
    address: { coName, street, postalCode, city, country } = {
      coName: "",
      street: "",
      postalCode: "",
      city: "",
      country: ""
    },
    name
  } = patron || {};

  return (
    <section>
      <h2 className="text-header-h4 mt-32 mb-16">
        {t("patronPageBasicDetailsHeaderText")}
      </h2>
      <div className="dpl-patron-info">
        <h3 className="dpl-patron-info__label text-header-h4">
          {t("patronPageBasicDetailsNameLabelText")}
        </h3>
        <div className="dpl-patron-info__text">{name}</div>
        <h3 className="dpl-patron-info__label text-header-h4">
          {t("patronPageBasicDetailsAddressLabelText")}
        </h3>
        <div className="dpl-patron-info__text">
          <div>{coName}</div>
          <div>{street}</div>
          <div>{postalCode}</div>
          <div>{city}</div>
          <div>{country}</div>
        </div>
      </div>
    </section>
  );
};

export default BasicDetailsSection;
