import * as React from "react";
import { useGetV1ProductsIdentifier } from "../../../../core/publizon/publizon";
import { useText } from "../../../../core/utils/text";
import MaterialAvailabilityTextParagraph from "../generic/MaterialAvailabilityTextParagraph";

interface MaterialAvailabilityTextOnlineProps {
  isbns: string[];
}

const MaterialAvailabilityTextOnline: React.FC<
  MaterialAvailabilityTextOnlineProps
> = ({ isbns }) => {
  const t = useText();
  const {
    data: productsData,
    isLoading: productsIsLoading,
    isError: productsIsError
  } = useGetV1ProductsIdentifier(isbns[0]);

  if (productsIsLoading || productsIsError || !productsData) return null;

  let availabilityText = t("onlineLimitMonthInfoText", {
    placeholders: { "@count": "X", "@limit": "Y" }
  });

  if (productsData.product?.costFree) {
    availabilityText = t("materialIsIncludedText");
  }

  return (
    <MaterialAvailabilityTextParagraph>
      {availabilityText}
    </MaterialAvailabilityTextParagraph>
  );
};

export default MaterialAvailabilityTextOnline;
