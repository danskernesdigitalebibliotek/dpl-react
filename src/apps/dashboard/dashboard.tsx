import React, { FC, useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import DashboardFees from "./dashboard-fees/dashboard-fees";
import DashboardNotificationList from "./dashboard-notification-list/dashboard-notification-list";
import { useText } from "../../core/utils/text";
import StillInQueueModal from "./modal/still-in-queue-modal/still-in-queue-modal";
import { useModalButtonHandler } from "../../core/utils/modal";
import StillInQueueModalContent from "./modal/still-in-queue-modal/still-in-queue-modal-content";
import ReadyToLoanModalContent from "./modal/ready-for-loan-modal/ready-to-loan-modal-content";
import ReadyToLoanModal from "./modal/ready-for-loan-modal/ready-to-loan-modal";
import DueDateLoansModal from "../loan-list/modal/due-date-loans-modal";
import {
  filterLoansNotOverdue,
  filterLoansOverdue,
  filterLoansSoonOverdue,
  getModalIds,
  sortByLoanDate
} from "../../core/utils/helpers/general";
import MaterialDetailsModal from "../loan-list/modal/material-details-modal";
import MaterialDetails from "../loan-list/modal/material-details";
import { ListType } from "../../core/utils/types/list-type";
import { LoanType } from "../../core/utils/types/loan-type";
import { useGetLoansV2 } from "../../core/fbs/fbs";
import { mapFBSLoanToLoanType } from "../../core/utils/helpers/list-mapper";

interface DashboardProps {
  pageSize: number;
}
const DashBoard: FC<DashboardProps> = ({ pageSize }) => {
  const t = useText();
  const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");
  const soon = dayjs().add(7, "days").format("YYYY-MM-DD");
  const longer = dayjs().add(1, "year").format("YYYY-MM-DD");
  const { open } = useModalButtonHandler();
  const { isSuccess, data } = useGetLoansV2();
  const { loanDetails, dueDateModal } = getModalIds();
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [modalLoan, setModalLoan] = useState<ListType | null>(null);
  const [modalDetailsId, setModalDetailsId] = useState<string | null>(null);
  const [physicalLoans, setPhysicalLoans] = useState<LoanType[] | null>(null);
  const [physicalLoansFarFromOverdue, setPhysicalLoansFarFromOverdue] =
    useState<LoanType[] | undefined>(undefined);
  const [physicalLoansSoonOverdue, setPhysicalLoansSoonOverdue] = useState<
    LoanType[] | undefined
  >(undefined);
  const [physicalLoansOverdue, setPhysicalLoansOverdue] = useState<
    LoanType[] | undefined
  >(undefined);
  const [loansToDisplay, setLoansToDisplay] = useState<LoanType[] | undefined>(
    undefined
  );
  const [modalHeader, setModalHealer] = useState("");

  const OpenModalHandler = useCallback(
    (modalId: string) => {
      if (modalId) {
        open(modalId);
      }
    },
    [open]
  );
  const openDueDateModal = useCallback(
    (dueDateInput: string) => {
      setDueDate(dueDateInput);
      if (dueDateInput === yesterday) {
        setLoansToDisplay(physicalLoansOverdue);
        setModalHealer(t("loansOverdueText"));
      }
      if (dueDateInput === soon) {
        setLoansToDisplay(physicalLoansSoonOverdue);
        setModalHealer(t("loansSoonOverdueText"));
      }
      if (dueDateInput === longer) {
        setLoansToDisplay(physicalLoansFarFromOverdue);
        setModalHealer(t("loansNotOverdueText"));
      }
      open(`${dueDateModal}${dueDateInput}`);
    },
    [
      dueDateModal,
      longer,
      open,
      physicalLoansFarFromOverdue,
      physicalLoansOverdue,
      physicalLoansSoonOverdue,
      soon,
      yesterday
    ]
  );
  const openLoanDetailsModal = useCallback(
    (modalId: string) => {
      setModalDetailsId(modalId);
      open(`${loanDetails}${modalId}`);
    },
    [loanDetails, open]
  );

  useEffect(() => {
    if (isSuccess && data) {
      const mapToLoanType = mapFBSLoanToLoanType(data);

      // Loans are sorted by loan date
      const sortedByLoanDate = sortByLoanDate(mapToLoanType);
      setPhysicalLoansOverdue(filterLoansOverdue(mapToLoanType));
      setPhysicalLoansSoonOverdue(filterLoansSoonOverdue(mapToLoanType));
      setPhysicalLoansFarFromOverdue(filterLoansNotOverdue(mapToLoanType));
      setPhysicalLoans(sortedByLoanDate);
    } else {
      setPhysicalLoans([]);
    }
  }, [isSuccess, data, setPhysicalLoansSoonOverdue]);

  return (
    <>
      <h1>{t("yourProfileText")}</h1>
      <DashboardFees />
      <DashboardNotificationList
        OpenModalHandler={OpenModalHandler}
        openDueDateModal={openDueDateModal}
      />
      <StillInQueueModal modalId="still-in-queue-modal">
        <StillInQueueModalContent />
      </StillInQueueModal>
      <ReadyToLoanModal modalId="ready-to-loan-modal">
        <ReadyToLoanModalContent />
      </ReadyToLoanModal>
      <MaterialDetailsModal modalId={`${loanDetails}${modalDetailsId}`}>
        <MaterialDetails
          faust={modalLoan?.faust}
          identifier={modalLoan?.identifier}
          loan={modalLoan as LoanType}
        />
      </MaterialDetailsModal>
      {dueDate && physicalLoans && loansToDisplay && modalHeader && (
        <DueDateLoansModal
          pageSize={pageSize}
          openLoanDetailsModal={openLoanDetailsModal}
          dueDate={dueDate}
          loansModal={loansToDisplay}
          hideStatusCircle
          customHeader={modalHeader}
        />
      )}
    </>
  );
};

export default DashBoard;
