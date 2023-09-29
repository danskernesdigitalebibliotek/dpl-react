import React, { FC } from "react";
import { RenewedLoanV2 } from "../../core/fbs/model";
import { useText } from "../../core/utils/text";
import { filterRenewResponseData } from "./helper";
import ModalMessage from "../message/modal-message/ModalMessage";
import { RequestStatus } from "../../core/utils/types/request";

interface LoansGroupModalMessageProps {
  messageType: "success" | "error";
  renewingResponse: RenewedLoanV2[] | null;
  modalId: string;
  setRenewingStatus: (status: RequestStatus) => void;
}

const LoansGroupModalMessage: FC<LoansGroupModalMessageProps> = ({
  messageType,
  renewingResponse,
  modalId,
  setRenewingStatus
}) => {
  const t = useText();

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
          title={t("groupModalLoansSuccessTitleText")}
          subTitle={t("groupModalLoansSuccessStatusText", {
            count: succeededRenewalCount
          })}
          ctaButton={{
            text: t("groupModalLoansSuccessButtonText"),
            modalId: modalId as string,
            callback: () => setRenewingStatus("idle")
          }}
        />
      )}
      {showNoRenewalsPossibleErrorMessage && (
        <ModalMessage
          title={t("groupModalLoansNoRenewalsPossibleErrorTitleText")}
          subTitle={t("groupModalLoansNoRenewalsPossibleErrorStatusText")}
          ctaButton={{
            text: t("groupModalLoansErrorButtonText"),
            modalId: modalId as string,
            callback: () => setRenewingStatus("idle")
          }}
        />
      )}
      {showErrorMessage && (
        <ModalMessage
          title={t("groupModalLoansErrorTitleText")}
          subTitle={t("groupModalLoansErrorStatusText")}
          ctaButton={{
            text: t("groupModalLoansErrorButtonText"),
            modalId: modalId as string,
            callback: () => setRenewingStatus("idle")
          }}
        />
      )}
    </>
  );
};

export default LoansGroupModalMessage;
