import { useEffect, useState } from "react";
import {
  useGetV1LoanstatusIdentifier,
  useGetV1ProductsIdentifier
} from "../../core/publizon/publizon";
import { FaustId } from "../../core/utils/types/ids";
import { publizonProductStatuses } from "./types";
import { AccessTypes } from "../../core/utils/types/entities";

const useOnlineAvailabilityData = ({
  enabled,
  access,
  faustIds,
  isbn
}: {
  enabled: boolean;
  access: AccessTypes[];
  faustIds: FaustId[] | null;
  isbn: string | null;
}) => {
  const [isAvailable, setIsAvailable] = useState<null | boolean>(null);

  // Find out if the material is cost free.
  const { isLoading: isLoadingIdentifier, data: dataIdentifier } =
    // We never want to pass an empty string to the API
    // So we only enable the query if we have an isbn
    useGetV1ProductsIdentifier(isbn ?? "", {
      query: {
        // Publizon / useGetV1ProductsIdentifier is responsible for online
        // materials. It requires an ISBN to do lookups.
        enabled: enabled && isAvailable === null && !!isbn
      }
    });

  // Ereol request.
  const { isLoading: isLoadingEreolData, data: dataEreol } =
    useGetV1LoanstatusIdentifier(isbn || "", {
      // Publizon / useGetV1LoanstatusIdentifier shows loan status per material.
      // This status is only available for products found on Ereol. Other online
      // materials are always supposed to be shown as "available"
      enabled:
        enabled &&
        isAvailable === null &&
        !!isbn &&
        // If the material is free (I think it is called blue material btw.)
        // we should not load the loan status because then we know that it is available.
        // So If the material is not free and we know it is an "Ereol" material we should load the loan status.
        dataIdentifier?.product?.costFree === false &&
        access.some((acc) => acc === "Ereol")
    });

  useEffect(() => {
    if (
      !enabled ||
      isAvailable !== null ||
      isLoadingIdentifier !== false ||
      isLoadingEreolData !== false
    ) {
      return;
    }

    // If we have ereol data, we can use that to determine the availability.
    if (dataEreol && dataEreol.loanStatus) {
      setIsAvailable(publizonProductStatuses[dataEreol.loanStatus].isAvailable);
    }
  }, [
    isLoadingIdentifier,
    isAvailable,
    faustIds,
    enabled,
    dataEreol,
    isLoadingEreolData
  ]);

  // If hook is not enabled make it clear that the loading and availability status is unknown.
  if (!enabled) {
    return {
      isLoading: null,
      isAvailable: null
    };
  }

  // An online material is by default always available if the availability status has not been set yet.
  if (isAvailable === null) {
    return {
      isLoading: false,
      isAvailable: true
    };
  }

  // Return the availability status.
  return {
    isLoading: isLoadingIdentifier && isLoadingEreolData,
    isAvailable
  };
};

export default useOnlineAvailabilityData;
