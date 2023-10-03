import React, { FC } from "react";
import { RenewedLoanV2 } from "../../core/fbs/model";
import { useText } from "../../core/utils/text";
import { succeededRenewalCount } from "../../core/utils/helpers/renewal";
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

  const countRenewed = succeededRenewalCount(renewingResponse);
  const showSuccessMessage = messageType === "success" && countRenewed > 0;
  const showNoRenewalsPossibleErrorMessage =
    messageType === "success" && countRenewed === 0;
  const showErrorMessage = messageType === "error";

  return (
    <>
      {showSuccessMessage && (
        <ModalMessage
          title={t("renewGroupModalLoansSuccessTitleText")}
          subTitle={t("renewGroupModalLoansSuccessStatusText", {
            count: countRenewed
          })}
          ctaButton={{
            text: t("renewGroupModalLoansSuccessButtonText"),
            modalId: modalId as string,
            callback: () => setRenewingStatus("idle")
          }}
        />
      )}
      {showNoRenewalsPossibleErrorMessage && (
        <ModalMessage
          title={t("renewGroupModalLoansNoRenewalsPossibleErrorTitleText")}
          subTitle={t("renewGroupModalLoansNoRenewalsPossibleErrorStatusText")}
          ctaButton={{
            text: t("renewGroupModalLoansButtonText"),
            modalId: modalId as string,
            callback: () => setRenewingStatus("idle")
          }}
        />
      )}
      {showErrorMessage && (
        <ModalMessage
          title={t("renewGroupModalLoansErrorTitleText")}
          subTitle={t("renewGroupModalLoansErrorStatusText")}
          ctaButton={{
            text: t("renewGroupModalLoansButtonText"),
            modalId: modalId as string,
            callback: () => setRenewingStatus("idle")
          }}
        />
      )}
    </>
  );
};

export default LoansGroupModalMessage;
