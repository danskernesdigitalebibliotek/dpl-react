import React, { ReactNode, useState, useEffect, FC, useCallback } from "react";
import { useQueryClient } from "react-query";
import Modal from "../../core/utils/modal";
import { useText } from "../../core/utils/text";
import GroupModalContent from "./GroupModalContent";
import {
  getModalIds,
  getAmountOfRenewableLoans,
  getRenewableMaterials,
  loansOverdue,
  sameLoanDate
} from "../../core/utils/helpers/general";
import { LoanType } from "../../core/utils/types/loan-type";
import { useRenewLoansV2, getGetLoansV2QueryKey } from "../../core/fbs/fbs";
import GroupModalLoansList from "./GroupModalLoansList";
import LoansGroupModalButton from "./LoansGroupModalButton";
import { RenewedLoanV2 } from "../../core/fbs/model/renewedLoanV2";
import RenewalModalMessage from "../renewal/RenewalModalMessage";
import { succeededRenewalCount } from "../../core/utils/helpers/renewal";
import { useSingleRequestWithStatus } from "../../core/utils/useRequestsWithStatus";

interface LoansGroupModalProps {
  dueDate?: string | null;
  loansModal: LoanType[];
  pageSize: number;
  accepted: boolean;
  openDetailsModal: (modalId: string) => void;
  openAcceptModal: () => void;
  children: ReactNode;
  resetAccepted: () => void;
}

const LoansGroupModal: FC<LoansGroupModalProps> = ({
  dueDate,
  loansModal,
  openDetailsModal,
  openAcceptModal,
  pageSize,
  accepted,
  resetAccepted,
  children
}) => {
  const t = useText();
  const { mutate } = useRenewLoansV2();
  const [acceptedButtonPressed, setAcceptedButtonPressed] =
    useState<boolean>(accepted);
  const { dueDateModal, allLoansId } = getModalIds();
  const queryClient = useQueryClient();
  const modalIdUsed = dueDate ? `${dueDateModal}-${dueDate}` : allLoansId;
  const renewableMaterials = getAmountOfRenewableLoans(loansModal);
  const [materialsToRenew, setMaterialsToRenew] = useState<string[]>([]);
  const [renewingResponse, setRenewingResponse] = useState<
    RenewedLoanV2[] | null
  >(null);

  const {
    handler: renew,
    requestStatus: renewingStatus,
    setRequestStatus: setRenewingStatus
  } = useSingleRequestWithStatus<typeof mutate, RenewedLoanV2[] | null>({
    request: {
      data: materialsToRenew.map((id) => Number(id))
    },
    operation: mutate,
    onError: () => {
      setRenewingResponse(null);
    },
    onSuccess: (result: typeof renewingResponse) => {
      // Make sure the loans list is updated after renewal.
      queryClient.invalidateQueries(getGetLoansV2QueryKey());
      if (result) {
        setRenewingResponse(result);
      }
    }
  });

  const renewSelected = useCallback(() => {
    const selectedLoansLoanDate = loansModal
      .filter(({ loanId }) => materialsToRenew.includes(String(loanId) || ""))
      .map(({ loanDate: localLoanDate }) => localLoanDate)
      .filter((item) => item !== undefined && item !== null);
    const acceptModal =
      loansOverdue(loansModal) &&
      sameLoanDate(selectedLoansLoanDate as string[]);

    if (acceptModal) {
      openAcceptModal();
    } else if (!acceptModal) {
      renew();
    }
  }, [loansModal, materialsToRenew, openAcceptModal, renew]);

  useEffect(() => {
    setMaterialsToRenew(getRenewableMaterials(loansModal));
  }, [loansModal]);

  useEffect(() => {
    if (accepted) {
      setAcceptedButtonPressed(accepted);
      resetAccepted();
    }
  }, [accepted, resetAccepted]);

  const selectMaterials = (materialIds: string[]) => {
    setMaterialsToRenew(materialIds);
  };

  useEffect(() => {
    if (acceptedButtonPressed) {
      renew();
      setAcceptedButtonPressed(false);
    }
  }, [acceptedButtonPressed, renew]);

  const showSuccessMessage = renewingStatus === "success";
  const countRenewed = succeededRenewalCount(renewingResponse);

  return (
    <Modal
      modalId={modalIdUsed as string}
      closeModalAriaLabelText={t("groupModalLoansCloseModalAriaLabelText")}
      screenReaderModalDescriptionText={t("groupModalLoansAriaDescriptionText")}
      eventCallbacks={{
        close: () => setRenewingStatus("idle")
      }}
      classNames={showSuccessMessage ? "modal-cta modal-padding" : ""}
    >
      {["idle", "pending"].includes(renewingStatus) && (
        <div className="modal-loan">
          {children}
          <GroupModalContent
            selectMaterials={selectMaterials}
            selectedMaterials={materialsToRenew}
            amountOfSelectableMaterials={renewableMaterials}
            selectableMaterials={getRenewableMaterials(loansModal)}
            buttonComponent={
              <LoansGroupModalButton
                materialsToRenew={materialsToRenew}
                renewableMaterials={renewableMaterials}
                renewSelected={renewSelected}
                renewingStatus={renewingStatus}
              />
            }
          >
            <GroupModalLoansList
              materials={loansModal}
              selectedMaterials={materialsToRenew}
              openDetailsModal={openDetailsModal}
              selectMaterials={selectMaterials}
              pageSize={pageSize}
            />
          </GroupModalContent>
        </div>
      )}
      {!["idle", "pending"].includes(renewingStatus) && (
        <RenewalModalMessage
          messageType={renewingStatus === "success" ? "success" : "error"}
          renewingResponse={renewingResponse}
          modalId={modalIdUsed as string}
          setRenewingStatus={setRenewingStatus}
          texts={{
            successTitleText: t("renewGroupModalLoansSuccessTitleText"),
            successStatusText: t("renewGroupModalLoansSuccessStatusText", {
              count: countRenewed
            }),
            noRenewalsPossibleErrorTitleText: t(
              "renewGroupModalLoansNoRenewalsPossibleErrorTitleText"
            ),
            noRenewalsPossibleErrorStatusText: t(
              "renewGroupModalLoansNoRenewalsPossibleErrorStatusText"
            ),
            errorTitleText: t("renewGroupModalLoansErrorTitleText"),
            errorStatusText: t("renewGroupModalLoansErrorStatusText"),
            buttonText: t("renewGroupModalLoansButtonText")
          }}
        />
      )}
    </Modal>
  );
};

export default LoansGroupModal;
