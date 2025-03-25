import { useQueryClient } from "react-query";
import {
  getGetV1LoanstatusIdentifierQueryKey,
  getGetV1UserLoansQueryKey,
  getGetV1UserReservationsQueryKey,
  usePostV1UserLoansIdentifier,
  usePostV1UserReservationsIdentifier
} from "../../core/publizon/publizon";
import { usePatronData } from "../../core/utils/helpers/usePatronData";
import useReaderPlayer from "../../core/utils/useReaderPlayer";
import { useUrls } from "../../core/utils/url";
import { useModalButtonHandler } from "../../core/utils/modal";
import {
  getFirstManifestation,
  onlineInternalModalId
} from "../../apps/material/helper";
import {
  formatDanishPhoneNumber,
  getAllFaustIds
} from "../../core/utils/helpers/general";
import { Manifestation } from "../../core/utils/types/entities";
import { RequestStatus } from "../../core/utils/types/request";
import { ApiResult, CreateLoanResult } from "../publizon/model";
import PublizonServiceError from "../publizon/mutator/PublizonServiceError";
import { useTrackStatistics } from "../statistics/useStatistics";
import { statistics } from "../statistics/statistics";
import { WorkId } from "./types/ids";

type useOnlineInternalHandleLoanReservationType = {
  manifestations: Manifestation[];
  openModal: boolean;
  setReservationStatus?: (status: RequestStatus) => void;
  setLoanResponse?: (response: CreateLoanResult | null) => void;
  setLoanStatus?: (status: RequestStatus) => void;
  setReservationOrLoanErrorResponse?: (error: ApiResult) => void;
  workId: WorkId;
};

const useOnlineInternalHandleLoanReservation = ({
  manifestations,
  openModal,
  setReservationStatus,
  setLoanResponse,
  setLoanStatus,
  setReservationOrLoanErrorResponse,
  workId
}: useOnlineInternalHandleLoanReservationType) => {
  const queryClient = useQueryClient();
  const u = useUrls();
  const authUrl = u("authUrl");
  const { openGuarded } = useModalButtonHandler();
  const { track } = useTrackStatistics();
  const { mutate: mutateLoan } = usePostV1UserLoansIdentifier();
  const { mutate: mutateReservation } = usePostV1UserReservationsIdentifier();
  const { data: userData } = usePatronData();

  const { canBeLoaned, canBeReserved, identifier } = useReaderPlayer(
    getFirstManifestation(manifestations)
  );

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
          onSuccess: (res) => {
            track("click", {
              id: statistics.publizonLoan.id,
              name: statistics.publizonLoan.name,
              trackedData: workId
            });
            // Ensure that the button is updated after a successful loan
            queryClient.invalidateQueries(getGetV1UserLoansQueryKey());
            queryClient.invalidateQueries(
              getGetV1LoanstatusIdentifierQueryKey(identifier)
            );
            if (setLoanStatus) {
              setLoanStatus("success");
            }
            if (setLoanResponse) {
              setLoanResponse(res);
            }
          },
          onError: (err) => {
            if (err instanceof PublizonServiceError) {
              if (setReservationOrLoanErrorResponse) {
                setReservationOrLoanErrorResponse(err.responseBody);
              }
            }

            if (setLoanStatus) {
              setLoanStatus("error");
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
            ...(userData.patron.emailAddress && {
              email: userData.patron.emailAddress
            }),
            ...(userData.patron.phoneNumber && {
              phoneNumber: formatDanishPhoneNumber(userData.patron.phoneNumber)
            })
          }
        },
        {
          onSuccess: () => {
            track("click", {
              id: statistics.publizonReserve.id,
              name: statistics.publizonReserve.name,
              trackedData: workId
            });
            // Ensure that the button is updated after a successful reservation
            queryClient.invalidateQueries(getGetV1UserReservationsQueryKey());
            queryClient.invalidateQueries(
              getGetV1LoanstatusIdentifierQueryKey(identifier)
            );
            if (setReservationStatus) {
              setReservationStatus("success");
            }
          },
          onError: (err) => {
            if (err instanceof PublizonServiceError) {
              if (setReservationOrLoanErrorResponse) {
                setReservationOrLoanErrorResponse(err.responseBody);
              }
            }
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
