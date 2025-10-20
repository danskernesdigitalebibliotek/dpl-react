import { AccessTypeCodeEnum } from "../../core/dbc-gateway/generated/graphql";
import { AccessTypes } from "../../core/utils/types/entities";
import { FaustId } from "../../core/utils/types/ids";
import { isOnline } from "./helper";
import useOnlineAvailabilityData from "./useOnlineAvailabilityData";
import usePhysicalAvailabilityData from "./usePhysicalAvailabilityData";

const useAvailabilityData = ({
  accessTypes,
  access,
  faustIds,
  manifestText,
  isbn,
  enabled = true
}: {
  accessTypes: AccessTypeCodeEnum[];
  access: AccessTypes[];
  faustIds: FaustId[];
  manifestText: string;
  isbn: string | null;
  enabled?: boolean;
}) => {
  const availabilityOnline = useOnlineAvailabilityData({
    enabled: isOnline(accessTypes) && enabled,
    access,
    faustIds,
    isbn
  });

  const availabilityPhysical = usePhysicalAvailabilityData({
    enabled: !isOnline(accessTypes) && enabled,
    faustIds,
    manifestText
  });

  if (isOnline(accessTypes)) {
    return availabilityOnline;
  }

  return availabilityPhysical;
};

export default useAvailabilityData;
