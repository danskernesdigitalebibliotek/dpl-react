import { useState } from "react";
import { useGetAvailabilityV3 } from "../../core/fbs/fbs";
import { useGetV1ProductsIdentifier } from "../../core/publizon/publizon";
import { useConfig } from "../../core/utils/config";
import { AccessTypeCode } from "../../core/dbc-gateway/generated/graphql";
import { ErrorType } from "../../core/publizon/mutator/fetcher";

export const useAvailabilityData = ({
  accessTypes,
  faustIds,
  isbn
}: {
  accessTypes: AccessTypeCode[];
  faustIds: string[] | null;
  isbn: string | null;
}) => {
  const [isAvailable, setIsAvailable] = useState(false);
  const config = useConfig();
  const blacklistBranches = config("blacklistedAvailabilityBranchesConfig", {
    transformer: "stringToArray"
  });

  const isOnline = accessTypes?.includes(AccessTypeCode.Online) ?? false;

  useGetAvailabilityV3(
    {
      recordid: faustIds ?? [],
      ...(blacklistBranches ? { exclude: blacklistBranches } : {})
    },
    {
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
  );

  useGetV1ProductsIdentifier(isbn ?? "", {
    query: {
      // Publizon / useGetV1ProductsIdentifier is responsible for online
      // materials. It requires an ISBN to do lookups.
      enabled: isOnline && isbn !== null,
      onSuccess: () => {
        // For now we always consider online materials available at publizon
        // as available. In the future this can be improved by checking
        // 1. Whether the material has a quota (res?.product?.costFree)
        // 2. If the product has a quota:
        //    1. If the user has any quota loans available for the material type
        //    2. If the library has a queue on the material
        setIsAvailable(true);
      },
      onError: (error: ErrorType<unknown>) => {
        // 128 is the error code for "Bogen er ikke tilgængelig for udlån"
        if (error.status === 128) {
          setIsAvailable(false);
        }
      }
    }
  });

  return { isAvailable };
};

export default {};
