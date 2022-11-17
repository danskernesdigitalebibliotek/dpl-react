import React, { FC } from "react";
import { PatronV5 } from "../../../core/fbs/model";
import { useText } from "../../../core/utils/text";

interface BasicDetailsSectionProps {
  patron: PatronV5;
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
      <h2 className="text-body-small-regular mt-32 mb-16">
        {t("patronPageBasicDetailsHeaderText")}
      </h2>
      <div className="dpl-patron-info">
        <div className="dpl-patron-info__label">
          {t("patronPageBasicDetailsNameLabelText")}
        </div>
        <div className="dpl-patron-info__text">{name}</div>
        <div className="dpl-patron-info__label">
          {t("patronPageBasicDetailsAddressLabelText")}
        </div>
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
