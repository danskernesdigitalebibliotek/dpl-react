import { Manifestation } from "./types/entities";
import { getManifestationIsbn } from "../../apps/material/helper";
import {
  getOrderIdByIdentifier,
  getReaderPlayerType,
  findReservedReservation
} from "../../components/reader-player/helper";
import { isAnonymous } from "./helpers/user";
import {
  useGetV1LoanstatusIdentifier,
  useGetV1UserLoans,
  useGetV1UserReservations
} from "../publizon/publizon";
import {
  mapPublizonLoanToLoanType,
  mapPublizonReservationToReservationType
} from "./helpers/list-mapper";
import { getLoanStatus } from "../../components/availability-label/types";

const useReaderPlayer = (manifestation: Manifestation | null) => {
  const isUserAnonymous = isAnonymous();

  const type = getReaderPlayerType(manifestation);
  const identifier = manifestation ? getManifestationIsbn(manifestation) : null;

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

  // Save to use identifier! because the hook is not enabled if there is no identifier
  const { data: dataLoanStatus } = useGetV1LoanstatusIdentifier(identifier!, {
    enabled: !!identifier
  });

  const orderId =
    loans && identifier ? getOrderIdByIdentifier({ loans, identifier }) : null;

  const reservation =
    identifier && reservations
      ? findReservedReservation(identifier, reservations)
      : null;

  const { loaned, reserved, redeemable, loanable, reservable } =
    getLoanStatus(dataLoanStatus);

  const isAlreadyReserved = reserved;
  const isAlreadyLoaned = loaned;
  const canBeLoaned = isUserAnonymous || redeemable || loanable;
  const canBeReserved = reservable;

  return {
    type,
    identifier,
    orderId,
    isAlreadyReserved,
    isAlreadyLoaned,
    canBeLoaned,
    canBeReserved,
    reservation
  };
};

export default useReaderPlayer;
