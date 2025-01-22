import { useGetV1UserLoans } from "../publizon/publizon";
import { Manifestation } from "./types/entities";
import { getManifestationIsbn } from "../../apps/material/helper";
import {
  getOrderIdByIdentifier,
  getReaderPlayerType
} from "../../components/reader-player/helper";
import { mapPublizonLoanToLoanType } from "./helpers/list-mapper";
import { isAnonymous } from "./helpers/user";

const useReaderPlayer = (manifestations: Manifestation[] | null) => {
  const isUserAnonymous = isAnonymous();
  const { data } = useGetV1UserLoans(
    {},
    {
      query: { enabled: !isUserAnonymous }
    }
  );

  if (!manifestations || manifestations.length === 0) {
    return {
      type: null,
      identifier: null,
      orderId: null
    };
  }

  const identifier = getManifestationIsbn(manifestations[0]);
  const type = getReaderPlayerType(manifestations);

  if (isUserAnonymous) {
    return {
      type,
      identifier,
      orderId: null
    };
  }

  // No need to check for data.userData here since the "useGetV1UserLoans" query
  // is disabled for anonymous users. Additionally, we still want to return
  // the identifier even if the user is anonymous.
  const loans = data?.loans ? mapPublizonLoanToLoanType(data.loans) : null;
  const orderId = loans ? getOrderIdByIdentifier({ loans, identifier }) : null;

  return {
    type,
    identifier,
    orderId
  };
};

export default useReaderPlayer;
