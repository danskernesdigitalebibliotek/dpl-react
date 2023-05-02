import * as React from "react";
import {
  useGetV1LibraryProfile,
  useGetV1ProductsIdentifier,
  useGetV1UserLoans
} from "../../../../core/publizon/publizon";
import { useText } from "../../../../core/utils/text";
import MaterialAvailabilityTextParagraph from "../generic/MaterialAvailabilityTextParagraph";
import { ManifestationMaterialType } from "../../../../core/utils/types/material-type";

interface MaterialAvailabilityTextOnlineProps {
  isbns: string[];
  materialType: string;
}

const MaterialAvailabilityTextOnline: React.FC<
  MaterialAvailabilityTextOnlineProps
> = ({ isbns, materialType }) => {
  const t = useText();
  const { data: productsData } = useGetV1ProductsIdentifier(isbns[0]);
  const { data: libraryProfileData } = useGetV1LibraryProfile();
  const { data: loansData } = useGetV1UserLoans();

  if (!libraryProfileData || !loansData || !productsData) return null;

  const totalEbookLoans = loansData?.userData?.totalEbookLoans;
  const totalAudioLoans = loansData?.userData?.totalAudioLoans;

  const {
    maxConcurrentEbookLoansPerBorrower,
    maxConcurrentAudioLoansPerBorrower
  } = libraryProfileData;

  let availabilityText = "";

  if (
    materialType === ManifestationMaterialType.ebook &&
    totalEbookLoans &&
    maxConcurrentEbookLoansPerBorrower
  ) {
    availabilityText = t("onlineLimitMonthEbookInfoText", {
      placeholders: {
        "@count": totalEbookLoans,
        "@limit": maxConcurrentEbookLoansPerBorrower
      }
    });
  }

  if (
    materialType === ManifestationMaterialType.audioBook &&
    totalAudioLoans &&
    maxConcurrentAudioLoansPerBorrower
  ) {
    availabilityText = t("onlineLimitMonthAudiobookInfoText", {
      placeholders: {
        "@count": totalAudioLoans,
        "@limit": maxConcurrentAudioLoansPerBorrower
      }
    });
  }

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
