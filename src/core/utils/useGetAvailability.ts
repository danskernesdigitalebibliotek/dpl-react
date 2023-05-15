import { UseQueryOptions } from "react-query";
import { getAvailabilityV3, useGetAvailabilityV3 } from "../fbs/fbs";
import { UseConfigFunction } from "./config";
import { FaustId } from "./types/ids";
import { getBlacklistedArgs } from "../../apps/material/helper";

const useGetAvailability = ({
  faustIds,
  config,
  options
}: {
  faustIds: FaustId[];
  config: UseConfigFunction;
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAvailabilityV3>>>;
  };
}) => {
  const { data, isLoading, isError } = useGetAvailabilityV3(
    getBlacklistedArgs(
      faustIds,
      config,
      "blacklistedAvailabilityBranchesConfig"
    ),
    options
  );
  return { data, isLoading, isError };
};

export default useGetAvailability;
