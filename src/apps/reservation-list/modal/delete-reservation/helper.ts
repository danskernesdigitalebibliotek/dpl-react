import { UseTextFunction } from "../../../../core/utils/text";
import { RequestStatus } from "../../../../core/utils/types/request";
import { isFaust, isIdentifier } from "../../../dashboard/util/helpers";

export const getReservationsToDelete = (reservations: string[]) => {
  if (!reservations) {
    return { physical: [], digital: [] };
  }

  const physical = reservations
    .map((id) => Number(isFaust(id)))
    .filter((id) => id !== 0);

  const digital = reservations
    .map((id) => isIdentifier(id))
    .filter((id) => id !== null);

  return { physical, digital };
};

export const getDeleteReservationStatus = ({
  physical,
  digital
}: {
  physical: RequestStatus;
  digital: RequestStatus;
}) => {
  if (physical === "pending" || digital === "pending") {
    return "pending";
  }

  if (physical === "error" || digital === "error") {
    return "error";
  }

  if (physical === "success" || digital === "success") {
    return "success";
  }

  return "idle";
};

export const getDeleteButtonLabel = ({
  reservationsCount,
  deletionStatus,
  t
}: {
  reservationsCount: number;
  deletionStatus: RequestStatus;
  t: UseTextFunction;
}) => {
  if (deletionStatus === "pending") {
    return t("deleteReservationModalDeleteProcessingText");
  }

  return t("deleteReservationModalDeleteButtonText", {
    count: reservationsCount
  });
};

export default {};
