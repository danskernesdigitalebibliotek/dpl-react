import useLoans from "./useLoans";
import { Manifestation } from "./types/entities";
import { getManifestationIsbn } from "../../apps/material/helper";
import {
  getOrderIdByIdentifier,
  getReaderPlayerType
} from "../../components/reader-player/helper";

const useReaderPlayerButtons = (manifestations: Manifestation[] | null) => {
  const {
    publizon: { loans }
  } = useLoans();

  if (!manifestations)
    return {
      type: null,
      identifier: null,
      orderId: null
    };

  const identifier = getManifestationIsbn(manifestations[0]);
  const type = getReaderPlayerType(manifestations);
  const orderId = getOrderIdByIdentifier({
    loans,
    identifier
  });

  return {
    type,
    identifier,
    orderId
  };
};

export default useReaderPlayerButtons;
