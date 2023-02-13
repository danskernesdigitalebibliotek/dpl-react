import React, { FC, useCallback, useEffect, useState } from "react";
import DashboardFees from "./dashboard-fees/dashboard-fees";
import DashboardNotificationList from "./dashboard-notification-list/dashboard-notification-list";
import { useText } from "../../core/utils/text";
import StillInQueueModal from "./modal/still-in-queue-modal/still-in-queue-modal";
import { useModalButtonHandler } from "../../core/utils/modal";
import ReadyToLoanModal from "./modal/ready-for-loan-modal/ready-to-loan-modal";
import DueDateLoansModal from "../loan-list/modal/due-date-loans-modal";
import {
  filterLoansNotOverdue,
  filterLoansOverdue,
  filterLoansSoonOverdue,
  getModalIds,
  constructSimpleModalId,
  sortByLoanDate
} from "../../core/utils/helpers/general";
import MaterialDetailsModal from "../loan-list/modal/material-details-modal";
import MaterialDetails from "../loan-list/modal/material-details";
import { ListType } from "../../core/utils/types/list-type";
import { LoanType } from "../../core/utils/types/loan-type";
import { useGetLoansV2 } from "../../core/fbs/fbs";
import { mapFBSLoanToLoanType } from "../../core/utils/helpers/list-mapper";
import { ThresholdType } from "../../core/utils/types/threshold-type";
import { useConfig } from "../../core/utils/config";
import { yesterday, soon, longer } from "./util/helpers";

interface DashboardProps {
  pageSize: number;
}
const DashBoard: FC<DashboardProps> = ({ pageSize }) => {
  const t = useText();
  const config = useConfig();
  const {
    colorThresholds: { warning }
  } = config<ThresholdType>("thresholdConfig", {
    transformer: "jsonParse"
  });
  const { open } = useModalButtonHandler();
  const { isSuccess, data } = useGetLoansV2();
  const { loanDetails, dueDateModal } = getModalIds();
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [modalLoan, setModalLoan] = useState<ListType | null>(null);
  const [modalDetailsId, setModalDetailsId] = useState<string | null>(null);
  const [physicalLoans, setPhysicalLoans] = useState<LoanType[] | null>(null);
  const [physicalLoansFarFromOverdue, setPhysicalLoansFarFromOverdue] =
    useState<LoanType[] | null>(null);
  const [physicalLoansSoonOverdue, setPhysicalLoansSoonOverdue] = useState<
    LoanType[] | null
  >(null);
  const [physicalLoansOverdue, setPhysicalLoansOverdue] = useState<
    LoanType[] | null
  >(null);
  const [loansToDisplay, setLoansToDisplay] = useState<LoanType[] | null>(null);
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

      switch (dueDateInput) {
        case yesterday:
          setLoansToDisplay(physicalLoansOverdue);
          setModalHealer(t("loansOverdueText"));
          break;

        case soon:
          setLoansToDisplay(physicalLoansSoonOverdue);
          setModalHealer(t("loansSoonOverdueText"));
          break;

        case longer:
          setLoansToDisplay(physicalLoansFarFromOverdue);
          setModalHealer(t("loansNotOverdueText"));
          break;

        default:
          throw new Error("Invalid due date input");
      }
      open(constructSimpleModalId(dueDateModal as string, dueDateInput));
    },
    [
      dueDateModal,
      open,
      physicalLoansFarFromOverdue,
      physicalLoansOverdue,
      physicalLoansSoonOverdue,
      t
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
    const loanForModal = physicalLoans?.find(
      (loan) => loan.faust === modalDetailsId
    );
    if (loanForModal) {
      setModalLoan(loanForModal);
    }
  }, [modalDetailsId, physicalLoans]);

  useEffect(() => {
    if (isSuccess && data && warning) {
      const mapToLoanType = mapFBSLoanToLoanType(data);

      // Loans are sorted by loan date
      const sortedByLoanDate = sortByLoanDate(mapToLoanType);

      setPhysicalLoansOverdue(filterLoansOverdue(mapToLoanType));
      setPhysicalLoansSoonOverdue(
        filterLoansSoonOverdue(mapToLoanType, warning)
      );
      setPhysicalLoansFarFromOverdue(
        filterLoansNotOverdue(mapToLoanType, warning)
      );
      setPhysicalLoans(sortedByLoanDate);
    } else {
      setPhysicalLoans([]);
    }
  }, [isSuccess, data, warning]);

  return (
    <>
      <h1>{t("yourProfileText")}</h1>
      <DashboardFees />
      <DashboardNotificationList
        OpenModalHandler={OpenModalHandler}
        openDueDateModal={openDueDateModal}
      />
      <StillInQueueModal modalId="still-in-queue-modal" />
      <ReadyToLoanModal modalId="ready-to-loan-modal" />
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
