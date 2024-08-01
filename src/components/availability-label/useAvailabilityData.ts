import {
  Access,
  AccessTypeCode
} from "../../core/dbc-gateway/generated/graphql";
import { FaustId } from "../../core/utils/types/ids";
import { isOnline } from "./helper";
import useOnlineAvailabilityData from "./useOnlineAvailabilityData";
import usePhysicalAvailabilityData from "./usePhysicalAvailabilityData";

const useAvailabilityData = ({
  accessTypes,
  access,
  faustIds,
  manifestText,
  isbn
}: {
  accessTypes: AccessTypeCode[];
  access: Access["__typename"][];
  faustIds: FaustId[];
  manifestText: string;
  isbn: string | null;
}) => {
  const availabilityOnline = useOnlineAvailabilityData({
    enabled: isOnline(accessTypes),
    access,
    faustIds,
    isbn
  });

  const availabilityPhysical = usePhysicalAvailabilityData({
    enabled: !isOnline(accessTypes),
    faustIds,
    manifestText
  });

  if (isOnline(accessTypes)) {
    return availabilityOnline;
  }

  return availabilityPhysical;
};

export default useAvailabilityData;
