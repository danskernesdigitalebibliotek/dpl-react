import { useGetReservationsV2 } from "../fbs/fbs";
import { useGetV1UserReservations } from "../publizon/publizon";
import {
  mapFBSReservationToReservationType,
  mapPublizonReservationToReservationType
} from "./helpers/list-mapper";
import { getReadyForPickup } from "../../apps/reservation-list/utils/helpers";
import { ReservationType } from "./types/reservation-type";
import { dashboardReservedApiValueText } from "../configuration/api-strings.json";

const getQueuedReservations = (list: ReservationType[]) => {
  return [...list].filter(
    ({ state }) => state === dashboardReservedApiValueText
  );
};

type Reservations = {
  readyToLoan: ReservationType[];
  queued: ReservationType[];
  isLoading: boolean;
  isError: boolean;
};

type UseReservationsType = {
  all: Reservations & {
    reservations: ReservationType[];
  };
  fbs: Reservations;
  publizon: Reservations;
};

type UseReservations = () => UseReservationsType;

const useReservations: UseReservations = () => {
  const {
    data: reservationsFbs,
    isLoading: isLoadingFbs,
    isError: isErrorFbs
  } = useGetReservationsV2();
  const {
    data: reservationsPublizon,
    isLoading: isLoadingPublizon,
    isError: isErrorPublizon
  } = useGetV1UserReservations();

  const reservationsIsLoading = isLoadingFbs || isLoadingPublizon;
  const reservationsIsError = isErrorFbs || isErrorPublizon;

  // map reservations to same type
  const mappedReservationsFbs = reservationsFbs
    ? mapFBSReservationToReservationType(reservationsFbs)
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
  const reservationsReadyToLoanFBS = getReadyForPickup(mappedReservationsFbs);
  const reservationsReadyToLoanPublizon = getReadyForPickup(
    mappedReservationsPublizon
  );
  const reservationsReadyToLoan = [
    ...reservationsReadyToLoanFBS,
    ...reservationsReadyToLoanPublizon
  ];

  // Combine "still in queue" reservations from both FBS and Publizon
  const reservationsQueuedFBS = getQueuedReservations(mappedReservationsFbs);
  const reservationsQueuedPublizon = getQueuedReservations(
    mappedReservationsPublizon
  );
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
      readyToLoan: reservationsReadyToLoanFBS,
      queued: reservationsQueuedFBS,
      isLoading: isLoadingFbs,
      isError: isErrorFbs
    },
    publizon: {
      readyToLoan: reservationsReadyToLoanPublizon,
      queued: reservationsQueuedPublizon,
      isLoading: isLoadingPublizon,
      isError: isErrorPublizon
    }
  };
};

export default useReservations;
