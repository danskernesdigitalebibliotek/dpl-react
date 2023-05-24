import React, { FC, useCallback, useEffect, useState } from "react";
import DashboardFees from "./dashboard-fees/dashboard-fees";
import DashboardNotificationList from "./dashboard-notification-list/dashboard-notification-list";
import { useText } from "../../core/utils/text";
import { useModalButtonHandler } from "../../core/utils/modal";
import GroupModal from "../../components/GroupModal/GroupModal";
import {
  filterLoansNotOverdue,
  filterLoansOverdue,
  filterLoansSoonOverdue,
  getModalIds,
  sortByDueDate,
  constructModalId
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
import SimpleModalHeader from "../../components/GroupModal/SimpleModalHeader";
import ReservationGroupModal from "./modal/ReservationsGroupModal";

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
  const [reservationModalId, setReservationModalId] = useState<string>("");
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

  const openModalHandler = useCallback(
    (modalId: string) => {
      setReservationModalId(modalId);
      open(modalId);
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
      open(constructModalId(dueDateModal as string, [dueDateInput]));
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
    if (isSuccess && data) {
      const mapToLoanType = mapFBSLoanToLoanType(data);

      // Loans are sorted by loan date
      const sortedByLoanDate = sortByDueDate(mapToLoanType);

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
    <div className="dashboard-page">
      <h1 className="text-header-h1 my-32">{t("yourProfileText")}</h1>
      <DashboardFees />
      <DashboardNotificationList
        openModalHandler={openModalHandler}
        openDueDateModal={openDueDateModal}
      />

      <MaterialDetailsModal modalId={`${loanDetails}${modalDetailsId}`}>
        <MaterialDetails
          faust={modalLoan?.faust}
          identifier={modalLoan?.identifier}
          loan={modalLoan as LoanType}
        />
      </MaterialDetailsModal>
      {dueDate && physicalLoans && loansToDisplay && (
        <GroupModal
          pageSize={pageSize}
          openDetailsModal={openLoanDetailsModal}
          dueDate={dueDate}
          loansModal={loansToDisplay}
        >
          <SimpleModalHeader header={modalHeader} />
        </GroupModal>
      )}
      <ReservationGroupModal modalId={reservationModalId} pageSize={pageSize} />
    </div>
  );
};

export default DashBoard;
