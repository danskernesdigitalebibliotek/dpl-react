import { useGetReservationsV2 } from "../fbs/fbs";
import { useGetV1UserReservations } from "../publizon/publizon";
import { getQueuedReservations } from "./helpers/general";
import {
  mapFBSReservationToReservationType,
  mapPublizonReservationToReservationType
} from "./helpers/list-mapper";
import { getReadyForPickup } from "../../apps/reservation-list/utils/helpers";

const useReservations = () => {
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
    reservations,
    reservationsReadyToLoanFBS,
    reservationsReadyToLoanPublizon,
    reservationsReadyToLoan,
    reservationsQueued,
    reservationsQueuedFBS,
    reservationsQueuedPublizon,
    reservationsIsLoading,
    reservationsIsError
  };
};

export default useReservations;
