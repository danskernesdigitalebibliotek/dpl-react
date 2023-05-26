import React, { FC, useCallback, useEffect, useState } from "react";
import DashboardFees from "./dashboard-fees/dashboard-fees";
import DashboardNotificationList from "./dashboard-notification-list/dashboard-notification-list";
import { useText } from "../../core/utils/text";
import { useModalButtonHandler } from "../../core/utils/modal";
import GroupModal from "../../components/GroupModal/LoansGroupModal";
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
import { useGetLoansV2, useGetReservationsV2 } from "../../core/fbs/fbs";
import {
  mapFBSLoanToLoanType,
  mapFBSReservationToReservationType,
  mapPublizonReservationToReservationType
} from "../../core/utils/helpers/list-mapper";
import { ThresholdType } from "../../core/utils/types/threshold-type";
import { useConfig } from "../../core/utils/config";
import { yesterday, soon, longer } from "./util/helpers";
import SimpleModalHeader from "../../components/GroupModal/SimpleModalHeader";
import ReservationGroupModal from "./modal/ReservationsGroupModal";
import { useGetV1UserReservations } from "../../core/publizon/publizon";
import { ReservationType } from "../../core/utils/types/reservation-type";
import ReservationDetails from "../reservation-list/modal/reservation-details/reservation-details";
import DeleteReservationModal from "../reservation-list/modal/delete-reservation/delete-reservation-modal";

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
  const { data: physicalReservationsFbs } = useGetReservationsV2();
  const { data: digitalReservationsPublizon } = useGetV1UserReservations();
  const [physicalReservations, setPhysicalReservations] = useState<
    ReservationType[]
  >([]);
  const [digitalReservations, setDigitalReservations] = useState<
    ReservationType[]
  >([]);
  const { open } = useModalButtonHandler();
  const { isSuccess, data } = useGetLoansV2();
  const { loanDetails, dueDateModal, reservationDetails, deleteReservation } =
    getModalIds();
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [modalLoan, setModalLoan] = useState<ListType | null>(null);
  const [reservationForModal, setReservationForModal] =
    useState<ListType | null>(null);
  const [reservationModalId, setReservationModalId] = useState<string>("");
  const [modalLoanDetailsId, setModalLoanDetailsId] = useState<string | null>(
    null
  );
  useState<ReservationType | null>(null);
  const [modalReservationDetailsId, setModalReservationDetailsId] = useState<
    string | null
  >(null);
  const [physicalLoans, setPhysicalLoans] = useState<LoanType[] | null>(null);
  const [physicalLoansFarFromOverdue, setPhysicalLoansFarFromOverdue] =
    useState<LoanType[]>([]);
  const [physicalLoansSoonOverdue, setPhysicalLoansSoonOverdue] = useState<
    LoanType[]
  >([]);
  const [physicalLoansOverdue, setPhysicalLoansOverdue] = useState<LoanType[]>(
    []
  );
  const [loansToDisplay, setLoansToDisplay] = useState<LoanType[] | null>(null);
  const [modalHeader, setModalHealer] = useState("");

  const openModalHandler = useCallback(
    (modalId: string) => {
      setReservationModalId(modalId);
      open(modalId);
    },
    [open]
  );

  useEffect(() => {
    if (physicalReservationsFbs) {
      setPhysicalReservations(
        mapFBSReservationToReservationType(physicalReservationsFbs)
      );
    }
  }, [physicalReservationsFbs]);

  useEffect(() => {
    if (
      digitalReservationsPublizon &&
      digitalReservationsPublizon.reservations
    ) {
      setDigitalReservations(
        mapPublizonReservationToReservationType(
          digitalReservationsPublizon.reservations
        )
      );
    }
  }, [digitalReservationsPublizon]);

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
      setModalLoanDetailsId(modalId);
      open(`${loanDetails}${modalId}`);
    },
    [loanDetails, open]
  );

  const openReservationDetailsModal = useCallback(
    (modalId: string) => {
      setModalReservationDetailsId(modalId);
      open(`${reservationDetails}${modalId}`);
    },
    [open, reservationDetails]
  );

  useEffect(() => {
    const loanForModal = physicalLoans?.find(
      ({ loanId }) => String(loanId) === modalLoanDetailsId
    );

    if (loanForModal) {
      setModalLoan(loanForModal);
    }
  }, [modalLoanDetailsId, physicalLoans]);

  useEffect(() => {
    const reservation = [...physicalReservations, ...digitalReservations]?.find(
      ({ faust, identifier }) =>
        String(faust) === modalReservationDetailsId ||
        String(identifier) === modalReservationDetailsId
    );

    if (reservation) {
      setReservationForModal(reservation);
    }
  }, [digitalReservations, modalReservationDetailsId, physicalReservations]);

  const openReservationDeleteModal = useCallback(() => {
    if (reservationForModal) {
      open(
        `${deleteReservation}${
          reservationForModal.reservationId || reservationForModal.identifier
        }`
      );
    }
  }, [deleteReservation, open, reservationForModal]);

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
        physicalLoansFarFromOverdue={physicalLoansFarFromOverdue}
        physicalLoansOverdue={physicalLoansOverdue}
        physicalLoansSoonOverdue={physicalLoansSoonOverdue}
        digitalReservations={digitalReservations}
        physicalReservations={physicalReservations}
        openModalHandler={openModalHandler}
        openLoanDetailsModal={openLoanDetailsModal}
        openReservationDetailsModal={openReservationDetailsModal}
        openDueDateModal={openDueDateModal}
      />

      <MaterialDetailsModal modalId={`${loanDetails}${modalLoanDetailsId}`}>
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
      <ReservationGroupModal
        modalId={reservationModalId}
        digitalReservations={digitalReservations}
        physicalReservations={physicalReservations}
        pageSize={pageSize}
      />
      {reservationForModal && (
        <DeleteReservationModal
          modalId={`${deleteReservation}${
            reservationForModal.reservationId || reservationForModal.identifier
          }`}
          reservation={reservationForModal}
        />
      )}
      {reservationForModal && (
        <MaterialDetailsModal
          modalId={`${reservationDetails}${
            reservationForModal.faust || reservationForModal.identifier
          }`}
        >
          <ReservationDetails
            openReservationDeleteModal={openReservationDeleteModal}
            faust={reservationForModal.faust}
            identifier={reservationForModal.identifier}
            reservation={reservationForModal}
          />
        </MaterialDetailsModal>
      )}
    </div>
  );
};

export default DashBoard;
