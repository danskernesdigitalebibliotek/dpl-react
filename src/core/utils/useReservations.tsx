import { useGetV1UserReservations } from "../publizon/publizon";
import {
  mapFBSReservationGroupToReservationType,
  mapPublizonReservationToReservationType
} from "./helpers/list-mapper";
import {
  getReadyForPickup,
  sortByPickupNumber,
  sortByNumberInQueue,
  sortByOldestPickupDeadline
} from "../../apps/reservation-list/utils/helpers";
import { ReservationType } from "./types/reservation-type";
import { dashboardReservedApiValueText } from "../configuration/api-strings";
import useGetReservationGroups from "./useGetReservationGroups";

const getQueuedReservations = (list: ReservationType[]) => {
  return [...list].filter(
    ({ state }) => state === dashboardReservedApiValueText
  );
};

type Reservations = {
  reservations: ReservationType[];
  readyToLoan: ReservationType[];
  queued: ReservationType[];
  isLoading: boolean;
  isError: boolean;
};

type UseReservationsType = {
  all: Reservations;
  fbs: Reservations;
  publizon: Reservations;
};

type UseReservations = () => UseReservationsType;

const useReservations: UseReservations = () => {
  const {
    data: reservationsFbs,
    isLoading: isLoadingFbs,
    isError: isErrorFbs
  } = useGetReservationGroups();
  const {
    data: reservationsPublizon,
    isLoading: isLoadingPublizon,
    isError: isErrorPublizon
  } = useGetV1UserReservations();

  const reservationsIsLoading = isLoadingFbs || isLoadingPublizon;
  const reservationsIsError = isErrorFbs || isErrorPublizon;

  // map reservations to same type
  const mappedReservationsFbs = reservationsFbs
    ? mapFBSReservationGroupToReservationType(reservationsFbs)
    : [];
  const mappedReservationsPublizon = reservationsPublizon?.reservations
    ? mapPublizonReservationToReservationType(reservationsPublizon.reservations)
    : [];

  // Combine all reservations from both FBS and Publizon
  const reservations = [
    ...mappedReservationsFbs,
    ...mappedReservationsPublizon
  ];

  // Combine "ready to loan" reservations from both FBS and Publizon
  // Sort by pickup number (alphanumeric) with fallback to pickup deadline
  const reservationsReadyToLoanFBS = sortByPickupNumber(
    getReadyForPickup(mappedReservationsFbs)
  );
  const reservationsReadyToLoanPublizon = sortByPickupNumber(
    getReadyForPickup(mappedReservationsPublizon)
  );
  const reservationsReadyToLoan = sortByPickupNumber([
    ...reservationsReadyToLoanFBS,
    ...reservationsReadyToLoanPublizon
  ]);

  // Combine "still in queue" reservations from both FBS and Publizon
  // FBS: Sort by queue number, Publizon: Sort by expected redeem date (pickupDeadline)
  const reservationsQueuedFBS = sortByNumberInQueue(
    getQueuedReservations(mappedReservationsFbs)
  );
  const reservationsQueuedPublizon = sortByOldestPickupDeadline(
    getQueuedReservations(mappedReservationsPublizon)
  ) as ReservationType[];
  const reservationsQueued = [
    ...reservationsQueuedFBS,
    ...reservationsQueuedPublizon
  ];

  return {
    all: {
      reservations,
      readyToLoan: reservationsReadyToLoan,
      queued: reservationsQueued,
      isLoading: reservationsIsLoading,
      isError: reservationsIsError
    },
    fbs: {
      reservations: mappedReservationsFbs,
      readyToLoan: reservationsReadyToLoanFBS,
      queued: reservationsQueuedFBS,
      isLoading: isLoadingFbs,
      isError: isErrorFbs
    },
    publizon: {
      reservations: mappedReservationsPublizon,
      readyToLoan: reservationsReadyToLoanPublizon,
      queued: reservationsQueuedPublizon,
      isLoading: isLoadingPublizon,
      isError: isErrorPublizon
    }
  };
};

export default useReservations;
