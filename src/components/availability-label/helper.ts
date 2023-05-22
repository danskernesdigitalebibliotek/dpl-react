import { useEffect, useState } from "react";
import clsx from "clsx";
import {
  useGetV1LoanstatusIdentifier,
  useGetV1ProductsIdentifier
} from "../../core/publizon/publizon";
import { useConfig } from "../../core/utils/config";
import {
  Access,
  AccessTypeCode
} from "../../core/dbc-gateway/generated/graphql";
import { FaustId } from "../../core/utils/types/ids";
import useGetAvailability from "../../core/utils/useGetAvailability";
import { publizonProductStatuses } from "./types";

export const useAvailabilityData = ({
  accessTypes,
  access,
  faustIds,
  isbn
}: {
  accessTypes: AccessTypeCode[];
  access: Access["__typename"][];
  faustIds: FaustId[] | null;
  isbn: string | null;
}) => {
  const [isAvailable, setIsAvailable] = useState(false);
  const config = useConfig();
  const isOnline = accessTypes?.includes(AccessTypeCode.Online) ?? false;
  const [isCostFree, setIsCostFree] = useState<null | boolean>(null);
  const [isLoading, setIsLoading] = useState<null | boolean>(null);

  useEffect(() => {
    // An online material is by default always available.
    if (isOnline && isCostFree !== false) {
      setIsAvailable(true);
    }
  }, [isOnline, isCostFree]);

  const { isLoading: isLoadingIdentifier } = useGetV1ProductsIdentifier(
    isbn ?? "",
    {
      query: {
        // Publizon / useGetV1ProductsIdentifier is responsible for online
        // materials. It requires an ISBN to do lookups.
        enabled: isOnline && isbn !== null,
        onSuccess: (res) => {
          // If an online material isn't cost-free we need to check whether there is a queue
          // to reserve it (via useGetV1LoanstatusIdentifier below in the code)
          if (res?.product?.costFree === false) {
            setIsCostFree(false);
          }
        }
      }
    }
  );

  const { isLoading: isLoadingProductInfo } = useGetV1LoanstatusIdentifier(
    isbn || "",
    {
      query: {
        // Publizon / useGetV1LoanstatusIdentifier shows loan status per material.
        // This status is only available for products found on Ereol. Other online
        // materials are always supposed to be shown as "available"
        enabled: isOnline && !!isbn && access.some((acc) => acc === "Ereol"),
        onSuccess: (res) => {
          if (res && res.loanStatus) {
            setIsAvailable(publizonProductStatuses[res.loanStatus].isAvailable);
            return;
          }
          // In case the load status data doesn't exist we assume it isn't available
          setIsAvailable(false);
        }
      }
    }
  );

  const { isLoading: isLoadingAvailability } = useGetAvailability({
    faustIds: faustIds ?? [],
    config,
    options: {
      query: {
        // FBS / useGetAvailabilityV3 is responsible for handling availability
        // for physical items. This will be the majority of all materials so we
        // use this for everything except materials that are explicitly online.
        enabled: !isOnline && faustIds !== null,
        onSuccess: (data) => {
          if (data?.some((item) => item.available)) {
            setIsAvailable(true);
          }
        }
      }
    }
  });

  useEffect(() => {
    setIsLoading(
      !!(isLoadingAvailability || isLoadingIdentifier || isLoadingProductInfo)
    );
  }, [isLoadingAvailability, isLoadingIdentifier, isLoadingProductInfo]);

  return { isLoading, isAvailable };
};

type GetParrentAvailabilityLabelClassProps = {
  selected?: boolean;
  cursorPointer?: boolean;
};

export const getParentAvailabilityLabelClass = ({
  selected,
  cursorPointer
}: GetParrentAvailabilityLabelClassProps) =>
  clsx(
    {
      "pagefold-parent--none availability-label--selected": selected
    },
    {
      "pagefold-parent--xsmall availability-label--unselected": !selected
    },
    { "cursor-pointer": cursorPointer },
    "text-label",
    "availability-label"
  );

export default {};
