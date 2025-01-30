import { Manifestation } from "./types/entities";
import { getManifestationIsbn } from "../../apps/material/helper";
import {
  getOrderIdByIdentifier,
  getReaderPlayerType,
  getReservedReservation
} from "../../components/reader-player/helper";
import { isAnonymous } from "./helpers/user";
import useOnlineAvailabilityData from "../../components/availability-label/useOnlineAvailabilityData";
import { hasCorrectAccess } from "../../components/material/material-buttons/helper";
import {
  useGetV1UserLoans,
  useGetV1UserReservations
} from "../publizon/publizon";
import {
  mapPublizonLoanToLoanType,
  mapPublizonReservationToReservationType
} from "./helpers/list-mapper";

const useReaderPlayer = (manifestations: Manifestation[] | null) => {
  const isUserAnonymous = isAnonymous();
  const hasManifestations = !!manifestations?.length;

  const type =
    hasManifestations && hasCorrectAccess("Ereol", manifestations)
      ? getReaderPlayerType(manifestations)
      : null;
  const identifier = hasManifestations
    ? getManifestationIsbn(manifestations[0])
    : null;

  const { data: loansPublizon } = useGetV1UserLoans(
    {},
    { query: { enabled: !isUserAnonymous } }
  );
  const loans = loansPublizon?.loans
    ? mapPublizonLoanToLoanType(loansPublizon.loans)
    : null;
  const { data: reservationsPublizon } = useGetV1UserReservations({
    query: { enabled: !isUserAnonymous }
  });
  const reservations = reservationsPublizon?.reservations
    ? mapPublizonReservationToReservationType(reservationsPublizon.reservations)
    : null;

  const availabilityData = useOnlineAvailabilityData({
    enabled: !!identifier,
    isbn: identifier,
    access: [undefined],
    faustIds: null
  });

  const isAvailable = availabilityData?.isLoading
    ? false
    : availabilityData?.isAvailable;

  const orderId =
    loans && identifier ? getOrderIdByIdentifier({ loans, identifier }) : null;

  const resevation =
    identifier && reservations
      ? getReservedReservation(identifier, reservations)
      : null;

  const isAllReadyReservedButtonVisible = !!resevation;
  const isMaterialLoanedButtonVisible = !!orderId;
  const isLoanButtonVisible = isUserAnonymous || isAvailable;
  const isReserveButtonVisible = !isAvailable;

  return {
    type,
    identifier,
    orderId,
    isAllReadyReservedButtonVisible,
    isMaterialLoanedButtonVisible,
    isLoanButtonVisible,
    isReserveButtonVisible,
    resevation
  };
};

export default useReaderPlayer;
