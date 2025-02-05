import { useQueryClient } from "react-query";
import {
  getGetV1UserLoansQueryKey,
  getGetV1UserReservationsQueryKey,
  usePostV1UserLoansIdentifier,
  usePostV1UserReservationsIdentifier
} from "../../core/publizon/publizon";
import { usePatronData } from "../../core/utils/helpers/usePatronData";
import useReaderPlayer from "../../core/utils/useReaderPlayer";
import { useUrls } from "../../core/utils/url";
import { useModalButtonHandler } from "../../core/utils/modal";
import { onlineInternalModalId } from "../../apps/material/helper";
import { getAllFaustIds } from "../../core/utils/helpers/general";
import { Manifestation } from "../../core/utils/types/entities";
import { OnlineInternalRequestStatus } from "../../core/utils/types/request";

type useOnlineInternalHandleLoanReservationType = {
  manifestations: Manifestation[];
  openModal: boolean;
  setReservationStatus?: (status: OnlineInternalRequestStatus) => void;
};

const useOnlineInternalHandleLoanReservation = ({
  manifestations,
  openModal,
  setReservationStatus
}: useOnlineInternalHandleLoanReservationType) => {
  const queryClient = useQueryClient();
  const u = useUrls();
  const authUrl = u("authUrl");
  const { openGuarded } = useModalButtonHandler();

  const { mutate: mutateLoan } = usePostV1UserLoansIdentifier();
  const { mutate: mutateReservation } = usePostV1UserReservationsIdentifier();
  const { data: userData } = usePatronData();

  const { canBeLoaned, canBeReserved, identifier } =
    useReaderPlayer(manifestations);

  const handleModalLoanReservation = () => {
    if (openModal) {
      openGuarded({
        authUrl,
        modalId: onlineInternalModalId(getAllFaustIds(manifestations))
      });
      return;
    }

    if (canBeLoaned && identifier) {
      mutateLoan(
        { identifier },
        {
          onSuccess: () => {
            // Ensure that the button is updated after a successful loan
            queryClient.invalidateQueries(getGetV1UserLoansQueryKey());
            if (setReservationStatus) {
              setReservationStatus("loaned");
            }
          },
          onError: () => {
            if (setReservationStatus) {
              setReservationStatus("error");
            }
          }
        }
      );
      return;
    }

    if (canBeReserved && identifier && userData?.patron) {
      mutateReservation(
        {
          identifier,
          data: {
            email: userData.patron.emailAddress,
            // Only add phone number if it exists
            // Still waiting for the API to support optional phoneNumber
            ...(userData.patron.phoneNumber && {
              phoneNumber: userData.patron.phoneNumber.match(/^\+\d{2}/)
                ? userData.patron.phoneNumber // Keep the number unchanged if it already starts with +XX
                : `+45${userData.patron.phoneNumber}` // Prepend +45 if no country code is present
            })
          }
        },
        {
          onSuccess: () => {
            // Ensure that the button is updated after a successful reservation
            queryClient.invalidateQueries(getGetV1UserReservationsQueryKey());
            if (setReservationStatus) {
              setReservationStatus("reserved");
            }
          },
          onError: () => {
            if (setReservationStatus) {
              setReservationStatus("error");
            }
          }
        }
      );
    }
  };

  return handleModalLoanReservation;
};

export default useOnlineInternalHandleLoanReservation;
