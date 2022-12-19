import { useEffect, useState } from "react";
import { useGetAvailabilityV3 } from "../../core/fbs/fbs";
import { useGetV1ProductsIdentifier } from "../../core/publizon/publizon";
import { useConfig } from "../../core/utils/config";

export const onlineMaterialAllowList = [
  "lydbog (cd-mp3)",
  "lydbog",
  "lydbog (net)",
  "ebog"
];

export const isMaterialTypeOnline = (materialType: string) =>
  onlineMaterialAllowList.includes(materialType);

export const useAvailabilityData = ({
  materialType,
  faustIds,
  isbn,
  isTrue
}: {
  materialType: string;
  faustIds: string[];
  isbn: string;
  isTrue: boolean;
}) => {
  const [isAvailable, setIsAvailable] = useState(false);
  const config = useConfig();
  const blacklistBranches = config("blacklistedAvailabilityBranchesConfig", {
    transformer: "stringToArray"
  });

  // Forcing isAvailable to true if isTrue is true
  useEffect(() => {
    if (isTrue) setIsAvailable(true);
  }, [isTrue]);

  const hasIsbn = Boolean(isbn);
  const isOnline = isMaterialTypeOnline(materialType);

  useGetAvailabilityV3(
    {
      recordid: faustIds,
      ...(blacklistBranches ? { exclude: blacklistBranches } : {})
    },
    {
      query: {
        // This should only be enabled if the material is NOT an online material type
        enabled: isOnline === false && isTrue === false,
        onSuccess: (data) => {
          if (data?.some((item) => item.available)) {
            setIsAvailable(true);
          }
        }
      }
    }
  );

  useGetV1ProductsIdentifier(isbn, {
    query: {
      // This should only be enabled if the material is an online material type and the isbn is not empty
      enabled: isOnline && isTrue === false && hasIsbn,
      onSuccess: () =>
        // res
        {
          setIsAvailable(true);
          // TODO:
          // Set isAvailable to true if the material is costFree (blue title) ind Publizon
          // if (res?.product?.costFree) {
          //   setIsAvailable(true);
          // }
          // Check if the material quota is available if the material is not costFree
        },
      onError: (error: unknown) => {
        if (error instanceof Error) {
          // 128 is the error code for "Bogen er ikke tilgængelig for udlån"
          if (error.cause && Number(error.cause) === 128) {
            setIsAvailable(false);
          }
        }
      }
    }
  });

  return { isAvailable };
};

export default {};
