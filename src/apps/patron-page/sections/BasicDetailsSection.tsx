import React, { FC } from "react";
import { PatronV5 } from "../../../core/fbs/model";
import { useText } from "../../../core/utils/text";
import { FriendlyCardResult } from "../../../core/publizon/model";

interface BasicDetailsSectionProps {
  patron: PatronV5;
  patronCardNumber?: FriendlyCardResult | null;
}

const BasicDetailsSection: FC<BasicDetailsSectionProps> = ({
  patron,
  patronCardNumber
}) => {
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
        {patronCardNumber?.friendlyCardNumber && (
          <>
            <h3 className="dpl-patron-info__label text-header-h4">
              {t("patronPageBasicFriendlyCardNumberLabelText")}
            </h3>
            <div className="dpl-patron-info__text">
              {patronCardNumber.friendlyCardNumber}
            </div>
          </>
        )}
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
