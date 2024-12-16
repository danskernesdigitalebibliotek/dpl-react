import * as React from "react";
import { first } from "lodash";
import {
  useGetV1LibraryProfile,
  useGetV1ProductsIdentifier,
  useGetV1UserLoans
} from "../../../../core/publizon/publizon";
import { useText } from "../../../../core/utils/text";
import MaterialAvailabilityTextParagraph from "../generic/MaterialAvailabilityTextParagraph";
import { ManifestationMaterialType } from "../../../../core/utils/types/material-type";
import { AvailabilityTextMap, getAvailabilityText } from "./helper";

interface MaterialAvailabilityTextOnlineProps {
  isbns: string[];
  materialType: ManifestationMaterialType;
}

const MaterialAvailabilityTextOnline: React.FC<
  MaterialAvailabilityTextOnlineProps
> = ({ isbns, materialType }) => {
  const t = useText();
  const { data: productsData } = useGetV1ProductsIdentifier(
    first(isbns) || "",
    {
      query: {
        // We never want to pass an empty string to the API
        // So we only enable the query if we have an isbn
        enabled: !!first(isbns)
      }
    }
  );
  const { data: libraryProfileData } = useGetV1LibraryProfile();
  const { data: loansData } = useGetV1UserLoans();

  if (!libraryProfileData || !loansData || !productsData) return null;

  const totalEbookLoans = loansData?.userData?.totalEbookLoans;
  const totalAudioLoans = loansData?.userData?.totalAudioLoans;

  const {
    maxConcurrentEbookLoansPerBorrower,
    maxConcurrentAudioLoansPerBorrower
  } = libraryProfileData;

  const availabilityTextMap: AvailabilityTextMap = {
    [ManifestationMaterialType.ebook]: {
      text: "onlineLimitMonthEbookInfoText",
      count: totalEbookLoans,
      limit: maxConcurrentEbookLoansPerBorrower
    },
    [ManifestationMaterialType.audioBook]: {
      text: "onlineLimitMonthAudiobookInfoText",
      count: totalAudioLoans,
      limit: maxConcurrentAudioLoansPerBorrower
    },
    materialIsIncluded: {
      text: "materialIsIncludedText"
    }
  };

  const availabilityTextType = productsData.product?.costFree
    ? "materialIsIncluded"
    : materialType;

  const availabilityText = getAvailabilityText({
    type: availabilityTextType,
    map: availabilityTextMap,
    t
  });

  return (
    <MaterialAvailabilityTextParagraph>
      {availabilityText}
    </MaterialAvailabilityTextParagraph>
  );
};

export default MaterialAvailabilityTextOnline;
