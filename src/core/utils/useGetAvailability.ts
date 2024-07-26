import { UseQueryOptions } from "react-query";
import { getAvailabilityV3, useGetAvailabilityV3 } from "../fbs/fbs";
import { UseConfigFunction } from "./config";
import { FaustId } from "./types/ids";
import { getBlacklistedQueryArgs } from "../../apps/material/helper";

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
  const response = useGetAvailabilityV3(
    getBlacklistedQueryArgs(faustIds, config, "availability"),
    options
  );
  return response;
};

export default useGetAvailability;
