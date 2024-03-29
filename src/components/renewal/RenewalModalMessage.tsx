import React, { FC } from "react";
import { RenewedLoanV2 } from "../../core/fbs/model";
import { filterRenewResponseData } from "../../core/utils/helpers/renewal";
import ModalMessage from "../message/modal-message/ModalMessage";
import { RequestStatus } from "../../core/utils/types/request";

interface RenewalModalMessageProps {
  messageType: "success" | "error";
  renewingResponse: RenewedLoanV2[] | null;
  modalId: string;
  setRenewingStatus: (status: RequestStatus) => void;
  texts: {
    successTitleText: string;
    successStatusText: string;
    noRenewalsPossibleErrorTitleText: string;
    noRenewalsPossibleErrorStatusText: string;
    errorTitleText: string;
    errorStatusText: string;
    buttonText: string;
  };
}

const RenewalModalMessage: FC<RenewalModalMessageProps> = ({
  messageType,
  renewingResponse,
  modalId,
  setRenewingStatus,
  texts: {
    successTitleText,
    successStatusText,
    noRenewalsPossibleErrorTitleText,
    noRenewalsPossibleErrorStatusText,
    errorTitleText,
    errorStatusText,
    buttonText
  }
}) => {
  const succeededRenewalCount = renewingResponse
    ? filterRenewResponseData(renewingResponse).length
    : 0;
  const showSuccessMessage =
    messageType === "success" && succeededRenewalCount > 0;
  const showNoRenewalsPossibleErrorMessage =
    messageType === "success" && succeededRenewalCount === 0;
  const showErrorMessage = messageType === "error";

  return (
    <>
      {showSuccessMessage && (
        <ModalMessage
          title={successTitleText}
          subTitle={successStatusText}
          ctaButton={{
            text: buttonText,
            modalId: modalId as string,
            callback: () => setRenewingStatus("idle")
          }}
        />
      )}
      {showNoRenewalsPossibleErrorMessage && (
        <ModalMessage
          title={noRenewalsPossibleErrorTitleText}
          subTitle={noRenewalsPossibleErrorStatusText}
          ctaButton={{
            text: buttonText,
            modalId: modalId as string,
            callback: () => setRenewingStatus("idle")
          }}
        />
      )}
      {showErrorMessage && (
        <ModalMessage
          title={errorTitleText}
          subTitle={errorStatusText}
          ctaButton={{
            text: buttonText,
            modalId: modalId as string,
            callback: () => setRenewingStatus("idle")
          }}
        />
      )}
    </>
  );
};

export default RenewalModalMessage;
