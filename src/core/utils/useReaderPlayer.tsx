import { useGetV1UserLoans } from "../publizon/publizon";
import { Manifestation } from "./types/entities";
import { getManifestationIsbn } from "../../apps/material/helper";
import {
  getOrderIdByIdentifier,
  getReaderPlayerType
} from "../../components/reader-player/helper";
import { mapPublizonLoanToLoanType } from "./helpers/list-mapper";
import { isAnonymous } from "./helpers/user";
import useOnlineAvailabilityData from "../../components/availability-label/useOnlineAvailabilityData";

const useReaderPlayer = (manifestations: Manifestation[] | null) => {
  const isUserAnonymous = isAnonymous();
  const hasManifestations = !!manifestations?.length;

  const type = hasManifestations ? getReaderPlayerType(manifestations) : null;
  const identifier = hasManifestations
    ? getManifestationIsbn(manifestations[0])
    : null;

  const { data } = useGetV1UserLoans(
    {},
    {
      query: { enabled: !isUserAnonymous && !!identifier }
    }
  );

  const availabilityData = useOnlineAvailabilityData({
    enabled: !isUserAnonymous && !!identifier,
    isbn: identifier,
    access: [undefined],
    faustIds: null
  });
  const isAvailable = availabilityData?.isLoading
    ? false
    : availabilityData?.isAvailable;

  // No need to check for data.userData here since the "useGetV1UserLoans" query
  // is disabled for anonymous users. Additionally, we still want to return
  // the identifier even if the user is anonymous.
  const loans = data?.loans ? mapPublizonLoanToLoanType(data.loans) : null;
  const orderId =
    loans && identifier ? getOrderIdByIdentifier({ loans, identifier }) : null;

  const showMaterialButton = !!orderId;
  const showLoanButton = isUserAnonymous || isAvailable;
  const showReserveButton = !isUserAnonymous && !isAvailable;

  return {
    type,
    identifier,
    orderId,
    showMaterialButton,
    showLoanButton,
    showReserveButton
  };
};

export default useReaderPlayer;
