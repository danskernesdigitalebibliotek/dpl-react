import * as React from "react";
import { FC } from "react";
import LinkButton from "../../components/Buttons/LinkButton";
import { useUrls } from "../../core/utils/url";
import { useConfig } from "../../core/utils/config";

export interface FeePaymentButtonProps {
  dataCy?: string;
}

const FeePaymentButton: FC<FeePaymentButtonProps> = ({
  dataCy = "fee-payment-button"
}) => {
  const config = useConfig();
  const u = useUrls();

  const { feeListPaymentSiteUrlText } = config<{
    feeListPaymentSiteUrlText: string;
  }>("feeListConfig", {
    transformer: "jsonParse"
  });
  const url = u("feeListPaymentSiteUrl", true);

  if (!url) return null;

  return (
    <LinkButton
      dataCy={dataCy}
      url={url}
      buttonType="external-link"
      size="small"
      variant="outline"
    >
      {feeListPaymentSiteUrlText}
    </LinkButton>
  );
};

export default FeePaymentButton;
