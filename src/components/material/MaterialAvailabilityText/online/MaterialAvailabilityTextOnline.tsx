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
import { playerTypes, readerTypes } from "../../../reader-player/helper";
import { isAnonymous } from "../../../../core/utils/helpers/user";

interface MaterialAvailabilityTextOnlineProps {
  isbns: string[];
  materialType: ManifestationMaterialType;
}

const MaterialAvailabilityTextOnline: React.FC<
  MaterialAvailabilityTextOnlineProps
> = ({ isbns, materialType }) => {
  const isUserAnonymous = isAnonymous();
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

  const { data: libraryProfileData } = useGetV1LibraryProfile({
    query: {
      enabled: !isUserAnonymous
    }
  });
  const { data: loansData } = useGetV1UserLoans(
    {},
    {
      query: {
        enabled: !isUserAnonymous
      }
    }
  );

  if (!productsData) return null;

  const availabilityTextMap: AvailabilityTextMap = {
    ...readerTypes.reduce((acc, type) => {
      if (isUserAnonymous) return acc;

      const totalEbookLoans = loansData?.userData?.totalEbookLoans;
      const maxConcurrentEbookLoansPerBorrower =
        libraryProfileData?.maxConcurrentEbookLoansPerBorrower;

      return {
        ...acc,
        [type]: {
          text: "onlineLimitMonthEbookInfoText",
          count: totalEbookLoans,
          limit: maxConcurrentEbookLoansPerBorrower
        }
      };
    }, {}),
    ...playerTypes.reduce((acc, type) => {
      if (isUserAnonymous) return acc;

      const totalAudioLoans = loansData?.userData?.totalAudioLoans;
      const maxConcurrentAudioLoansPerBorrower =
        libraryProfileData?.maxConcurrentAudioLoansPerBorrower;

      return {
        ...acc,
        [type]: {
          text: "onlineLimitMonthAudiobookInfoText",
          count: totalAudioLoans,
          limit: maxConcurrentAudioLoansPerBorrower
        }
      };
    }, {}),
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
