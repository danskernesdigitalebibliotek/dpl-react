import React, { ReactNode, useState, useEffect, FC, useCallback } from "react";
import { useQueryClient } from "react-query";
import Modal from "../../core/utils/modal";
import { useText } from "../../core/utils/text";
import GroupModalContent from "./GroupModalContent";
import {
  getAmountOfRenewableLoans,
  getRenewableMaterials
} from "../../core/utils/helpers/general";
import { LoanType } from "../../core/utils/types/loan-type";
import { useRenewLoansV2, getGetLoansV2QueryKey } from "../../core/fbs/fbs";
import GroupModalLoansList from "./GroupModalLoansList";
import LoansGroupModalButton from "./LoansGroupModalButton";
import { RenewedLoanV2 } from "../../core/fbs/model/renewedLoanV2";
import RenewalModalMessage from "../renewal/RenewalModalMessage";
import { succeededRenewalCount } from "../../core/utils/helpers/renewal";
import { useSingleRequestWithStatus } from "../../core/utils/useRequestsWithStatus";
import { ListType } from "../../core/utils/types/list-type";
import { getModalIds } from "../../core/utils/helpers/modal-helpers";

interface LoansGroupModalProps {
  dueDate?: string | null;
  loansModal: LoanType[];
  pageSize: number;
  openDetailsModal: (loan: LoanType) => void;
  children: ReactNode;
}

const LoansGroupModal: FC<LoansGroupModalProps> = ({
  dueDate,
  loansModal,
  openDetailsModal,
  pageSize,
  children
}) => {
  const t = useText();
  const { mutate } = useRenewLoansV2();
  const { dueDateModal, allLoansId } = getModalIds();
  const queryClient = useQueryClient();
  const modalIdUsed = dueDate ? `${dueDateModal}-${dueDate}` : allLoansId;
  const renewableMaterials = getAmountOfRenewableLoans(loansModal);
  const [materialsToRenew, setMaterialsToRenew] = useState<ListType[]>([]);
  const [renewingResponse, setRenewingResponse] = useState<
    RenewedLoanV2[] | null
  >(null);

  const {
    handler: renew,
    requestStatus: renewingStatus,
    setRequestStatus: setRenewingStatus
  } = useSingleRequestWithStatus<
    typeof mutate,
    {
      data: number[];
    },
    RenewedLoanV2[] | null
  >({
    request: {
      params: {
        data: materialsToRenew.map((material) => material.loanId ?? 0)
      },
      operation: mutate
    },
    onError: () => {
      setRenewingResponse(null);
    },
    onSuccess: (result) => {
      // Make sure the loans list is updated after renewal.
      queryClient.invalidateQueries(getGetLoansV2QueryKey());
      if (result) {
        setRenewingResponse(result);
      }
    }
  });

  const renewSelected = useCallback(() => {
    renew();
  }, [renew]);

  useEffect(() => {
    setMaterialsToRenew(getRenewableMaterials(loansModal));
  }, [loansModal]);

  const selectMaterials = (materialIds: ListType[]) => {
    setMaterialsToRenew(materialIds);
  };
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
