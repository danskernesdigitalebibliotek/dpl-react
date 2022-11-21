import * as React from "react";
import {
  useGetV1ProductsIdentifier
  // useGetV1UserLoansIdentifier
} from "../../../../core/publizon/publizon";
import { useText } from "../../../../core/utils/text";
import MaterialAvailabilityTextParagraph from "../generic/MaterialAvailabilityTextParagraph";

interface MaterialAvailabilityTextOnlineProps {
  isbn: string;
}

const MaterialAvailabilityTextOnline: React.FC<
  MaterialAvailabilityTextOnlineProps
> = ({ isbn }) => {
  const t = useText();
  // TODO: Below there are 2 different isbn numbers that can be used in useGetV1ProductsIdentifier. with and without "blue title"
  // const costfreeID = "9788711321683";
  // const notCostfreeID = "9788740047905";

  //  TODO: get access to user details for checking number of reservations and loans
  // const {
  //   data: userLoansData,
  //   isLoading: userLoansIsLoading,
  //   isError: userLoansIsError
  // } = useGetV1UserLoansIdentifier("9788771076950");

  const {
    data: productsData,
    isLoading: productsIsLoading,
    isError: productsIsError
  } = useGetV1ProductsIdentifier(isbn);

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
