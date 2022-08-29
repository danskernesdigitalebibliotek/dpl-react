import * as React from "react";
import {
  useGetV1ProductsIdentifier,
  useGetV1UserLoansIdentifier
} from "../../../../core/publizon/publizon";
import MaterialAvailabilityTextParagraph from "../generic/MaterialAvailabilityTextParagraph";

interface MaterialAvailabilityTextOnlineProps {
  isbn: string;
}

const MaterialAvailabilityTextOnline: React.FC<
  MaterialAvailabilityTextOnlineProps
> = ({ isbn }) => {
  const t = useText();
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

  const costFree = productsData.product?.costFree;

  if (costFree) {
    return (
      <MaterialAvailabilityTextParagraph>
        Materialet tæller ikke med i din lånerkvote
      </MaterialAvailabilityTextParagraph>
    );
  }

  if (!costFree) {
    return (
      <MaterialAvailabilityTextParagraph>
        Du har lånt X ud af Y mulige [materialte-type] denne måned
      </MaterialAvailabilityTextParagraph>
    );
  }

  return (
    <MaterialAvailabilityTextParagraph>
      MaterialAvailabilityTextOnline
    </MaterialAvailabilityTextParagraph>
  );
};

export default MaterialAvailabilityTextOnline;
