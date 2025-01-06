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

  if (!manifestations || !data?.loans) {
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

  const loans = mapPublizonLoanToLoanType(data.loans);
  const orderId = getOrderIdByIdentifier({ loans, identifier });

  return {
    type,
    identifier,
    orderId
  };
};

export default useReaderPlayer;