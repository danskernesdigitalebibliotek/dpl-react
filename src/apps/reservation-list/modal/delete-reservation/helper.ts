import { UseMutateFunction } from "react-query";
import { DeleteReservationsParams } from "../../../../core/fbs/model";
import { UseTextFunction } from "../../../../core/utils/text";
import { RequestStatus } from "../../../../core/utils/types/request";
import {
  ReservationType,
  isDigitalReservation,
  isPhysicalReservation
} from "../../../../core/utils/types/reservation-type";
import { ApiResult } from "../../../../core/publizon/model";

export type ParamsDigital = {
  identifier: string;
};
export type ParamsPhysical = {
  params?: DeleteReservationsParams;
};
export type OperationDigital = UseMutateFunction<
  ApiResult | null,
  unknown,
  ParamsDigital,
  unknown
>;
export type OperationPhysical = UseMutateFunction<
  void | null,
  unknown,
  ParamsPhysical,
  unknown
>;
type Request = {
  params: { params: { reservationid: number[] } } | { identifier: string };
  operation: OperationPhysical | OperationDigital;
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
  reservationsPhysical: number[];
  reservationsDigital: string[];
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
