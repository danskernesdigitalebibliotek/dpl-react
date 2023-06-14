import * as React from "react";
import { FC } from "react";
import { useUrls } from "../../../core/utils/url";
import CheckBox from "../../../components/checkbox/Checkbox";
import Link from "../../../components/atoms/links/Link";
import { useText } from "../../../core/utils/text";

export interface AcceptTermsCheckboxProps {
  handleAcceptedTerms: () => void;
}

const AcceptTermsCheckbox: FC<AcceptTermsCheckboxProps> = ({
  handleAcceptedTerms
}) => {
  const t = useText();
  const { termsOfTradeUrl } = useUrls();

  return (
    <CheckBox
      id="checkbox_id__fee_details"
      onChecked={() => handleAcceptedTerms()}
      label={
        <>
          {t("iAcceptText")}{" "}
          <Link href={termsOfTradeUrl}>
            {t("termsOfTradeText")}
            <sup>*</sup>
          </Link>
        </>
      }
    />
  );
};

export default AcceptTermsCheckbox;
