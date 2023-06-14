import React, { ReactNode, useState, useEffect, FC, useCallback } from "react";
import { useQueryClient } from "react-query";
import Modal, { useModalButtonHandler } from "../../core/utils/modal";
import { useText } from "../../core/utils/text";
import GroupModalContent from "./GroupModalContent";
import {
  getModalIds,
  getAmountOfRenewableLoans,
  getRenewableMaterials
} from "../../core/utils/helpers/general";
import { LoanType } from "../../core/utils/types/loan-type";
import { useRenewLoansV2, getGetLoansV2QueryKey } from "../../core/fbs/fbs";
import { Button } from "../Buttons/Button";
import GroupModalLoansList from "./GroupModalLoansList";

interface LoansGroupModalProps {
  dueDate?: string | null;
  loansModal: LoanType[];
  pageSize: number;
  openDetailsModal: (modalId: string) => void;
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
  const { close } = useModalButtonHandler();
  const { dueDateModal, allLoansId } = getModalIds();
  const queryClient = useQueryClient();
  const modalIdUsed = dueDate ? `${dueDateModal}${dueDate}` : allLoansId;
  const renewableMaterials = getAmountOfRenewableLoans(loansModal);
  const [materialsToRenew, setMaterialsToRenew] = useState<string[]>([]);

  const renewSelected = useCallback(() => {
    const ids = materialsToRenew.map((id) => Number(id));
    mutate(
      {
        data: ids
      },
      {
        onSuccess: (result) => {
          if (result) {
            queryClient.invalidateQueries(getGetLoansV2QueryKey());
            close(modalIdUsed as string);
          }
        }
      }
    );
  }, [close, materialsToRenew, modalIdUsed, mutate, queryClient]);

  useEffect(() => {
    setMaterialsToRenew(getRenewableMaterials(loansModal));
  }, [loansModal]);

  const selectMaterials = (materialIds: string[]) => {
    setMaterialsToRenew(materialIds);
  };

  return (
    <Modal
      modalId={modalIdUsed as string}
      classNames="modal-loan"
      closeModalAriaLabelText={t("groupModalLoansCloseModalAriaLabelText")}
      screenReaderModalDescriptionText={t("groupModalLoansAriaDescriptionText")}
    >
      <div className="modal-loan">
        {children}
        <GroupModalContent
          selectMaterials={selectMaterials}
          selectedMaterials={materialsToRenew}
          amountOfSelectableMaterials={renewableMaterials}
          selectableMaterials={getRenewableMaterials(loansModal)}
          buttonComponent={
            <Button
              label={t("groupModalButtonText", {
                count: materialsToRenew.length,
                placeholders: { "@count": materialsToRenew.length }
              })}
              buttonType="none"
              id="renew-several"
              variant="filled"
              disabled={renewableMaterials === 0}
              collapsible={false}
              onClick={renewSelected}
              size="small"
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
    </Modal>
  );
};

export default LoansGroupModal;
