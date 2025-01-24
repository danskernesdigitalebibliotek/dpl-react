import useLoans from "./useLoans";
import useReservations from "./useReservations";
import { Manifestation } from "./types/entities";
import { getManifestationIsbn } from "../../apps/material/helper";
import {
  getOrderIdByIdentifier,
  getReaderPlayerType,
  isIdentifierReserved
} from "../../components/reader-player/helper";
import { isAnonymous } from "./helpers/user";
import useOnlineAvailabilityData from "../../components/availability-label/useOnlineAvailabilityData";
import { hasCorrectAccess } from "../../components/material/material-buttons/helper";

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

  const {
    publizon: { loans }
  } = useLoans();

  const {
    publizon: { reservations }
  } = useReservations();

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

  const isAllReadyReservedButtonVisible =
    identifier && isIdentifierReserved(identifier, reservations);
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
    isReserveButtonVisible
  };
};

export default useReaderPlayer;
