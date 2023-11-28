import { useDeleteReservations } from "../../../../core/fbs/fbs";
import { DeleteReservationsParams } from "../../../../core/fbs/model/deleteReservationsParams";
import { useDeleteV1UserReservationsIdentifier } from "../../../../core/publizon/publizon";
import { UseTextFunction } from "../../../../core/utils/text";
import { RequestStatus } from "../../../../core/utils/types/request";
import {
  ReservationType,
  isDigitalReservation,
  isPhysicalReservation
} from "../../../../core/utils/types/reservation-type";

export type OperationPhysical = ReturnType<
  typeof useDeleteReservations
>["mutate"];
export type OperationDigital = ReturnType<
  typeof useDeleteV1UserReservationsIdentifier
>["mutate"];

export type ParamsPhysical = { params: DeleteReservationsParams };
export type ParamsDigital = Parameters<OperationDigital>;

type Request =
  | {
      params: ParamsPhysical;
      operation: OperationPhysical;
    }
  | {
      params: ParamsDigital;
      operation: OperationDigital;
    };

export const getReservationsToDelete = (reservations: ReservationType[]) => {
  if (!reservations.length) {
    return { physical: [], digital: [] };
  }
  const physical = reservations
    .filter(isPhysicalReservation)
    .map(({ reservationIds }) => reservationIds)
    .flat();

  const digital = reservations
    .filter(isDigitalReservation)
    .map(({ identifier }) => identifier);

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

export const requestsAndReservations = ({
  reservations,
  operations
}: {
  reservations: ReservationType[];
  operations: { physical: OperationPhysical; digital: OperationDigital };
}): {
  requests: Request[];
  reservationsPhysical: ReturnType<typeof getReservationsToDelete>["physical"];
  reservationsDigital: ReturnType<typeof getReservationsToDelete>["digital"];
} => {
  const { physical: reservationsPhysical, digital: reservationsDigital } =
    getReservationsToDelete(reservations);

  const requests = [];
  if (reservationsPhysical.length) {
    requests.push({
      params: { params: { reservationid: reservationsPhysical } },
      operation: operations.physical
    });
  }
  if (reservationsDigital.length) {
    reservationsDigital.forEach((id) => {
      requests.push({
        params: { identifier: String(id) },
        operation: operations.digital
      });
    });
  }

  return { requests, reservationsPhysical, reservationsDigital };
};

export default {};
