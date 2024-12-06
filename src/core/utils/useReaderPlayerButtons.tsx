import useLoans from "./useLoans";
import { Manifestation } from "./types/entities";
import { getManifestationIsbn } from "../../apps/material/helper";
import {
  getOrderIdByIdentifier,
  getReaderPlayerType
} from "../../components/reader-player/helper";

const useReaderPlayerButtons = (manifestations: Manifestation[]) => {
  const {
    publizon: { loans, isLoading }
  } = useLoans();

  const identifier = getManifestationIsbn(manifestations[0]);
  const type = getReaderPlayerType(manifestations);
  const orderId = getOrderIdByIdentifier({
    loans,
    identifier
  });

  return {
    type,
    identifier,
    orderId,
    isLoading
  };
};

export default useReaderPlayerButtons;
