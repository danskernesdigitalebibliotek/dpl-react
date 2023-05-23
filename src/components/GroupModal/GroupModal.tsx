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

interface GroupModalProps {
  dueDate?: string | null;
  loansModal: LoanType[];
  pageSize: number;
  openLoanDetailsModal: (modalId: string) => void;
  modalClosed: () => void;
  children: ReactNode;
}

const GroupModal: FC<GroupModalProps> = ({
  dueDate,
  loansModal,
  openLoanDetailsModal,
  pageSize,
  modalClosed,
  children
}) => {
  const t = useText();
  const { mutate } = useRenewLoansV2();
  const { dueDateModal, allLoansId } = getModalIds();
  const queryClient = useQueryClient();

  const modalIdUsed = dueDate ? `${dueDateModal}-${dueDate}` : allLoansId;

  const renewableMaterials = getAmountOfRenewableLoans(loansModal);
  const [materialsToRenew, setMaterialsToRenew] = useState<number[]>([]);
  const { close } = useModalButtonHandler();

  const renewSelected = useCallback(() => {
    mutate(
      {
        data: materialsToRenew
      },
      {
        onSuccess: (result) => {
          if (result) {
            queryClient.invalidateQueries(getGetLoansV2QueryKey());
            close(modalIdUsed as string);
            modalClosed();
          }
        }
      }
    );
  }, [close, materialsToRenew, modalClosed, modalIdUsed, mutate, queryClient]);

  useEffect(() => {
    setMaterialsToRenew(getRenewableMaterials(loansModal));
  }, [loansModal]);

  const selectAll = () => {
    if (materialsToRenew.length > 0) {
      setMaterialsToRenew([]);
    } else {
      setMaterialsToRenew(getRenewableMaterials(loansModal));
    }
  };

  const onMaterialChecked = (id: number) => {
    const materialsToRenewCopy = [...materialsToRenew];

    const indexOfItemToRemove = materialsToRenew.indexOf(id);
    if (indexOfItemToRemove > -1) {
      materialsToRenewCopy.splice(indexOfItemToRemove, 1);
    } else {
      materialsToRenewCopy.push(id);
    }
    setMaterialsToRenew(materialsToRenewCopy);
  };

  return (
    <Modal
      modalId={modalIdUsed as string}
      classNames="modal-loan"
      closeModalAriaLabelText={t("groupModalCloseModalAriaLabelText")}
      screenReaderModalDescriptionText={t("groupModalAriaDescriptionText")}
    >
      <div className="modal-loan">
        {children}
        <GroupModalContent
          openLoanDetailsModal={openLoanDetailsModal}
          pageSize={pageSize}
          loansModal={loansModal}
          onMaterialChecked={onMaterialChecked}
          amountOfSelectableMaterials={renewableMaterials}
          selectableMaterials={materialsToRenew}
          selectAll={selectAll}
        >
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
        </GroupModalContent>
      </div>
    </Modal>
  );
};

export default GroupModal;
