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

  const { paymentSiteUrlText } = config<{
    paymentSiteUrlText: string;
  }>("feeListConfig", {
    transformer: "jsonParse"
  });
  const url = u("paymentSiteUrl", true);

  if (!url) return null;

  return (
    <LinkButton
      dataCy={dataCy}
      url={url}
      buttonType="external-link"
      size="small"
      variant="outline"
    >
      {paymentSiteUrlText}
    </LinkButton>
  );
};

export default FeePaymentButton;
