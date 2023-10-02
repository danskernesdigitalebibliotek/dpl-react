import React, { useEffect, useState, FC, useCallback } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { useGetLoansV2 } from "../../../core/fbs/fbs";
import {
  getAmountOfRenewableLoans,
  getDueDatesLoan,
  getModalIds,
  sortByDueDate,
  getScrollClass,
  constructModalId
} from "../../../core/utils/helpers/general";
import { getUrlQueryParam } from "../../../core/utils/helpers/url";
import { useText } from "../../../core/utils/text";
import {
  useModalButtonHandler,
  ModalIdsProps
} from "../../../core/utils/modal";
import List from "./list";
import { useGetV1UserLoans } from "../../../core/publizon/publizon";
import { LoanType } from "../../../core/utils/types/loan-type";
import { ListView } from "../../../core/utils/types/list-view";
import EmptyList from "../../../components/empty-list/empty-list";
import {
  mapPublizonLoanToLoanType,
  mapFBSLoanToLoanType
} from "../../../core/utils/helpers/list-mapper";
import ToggleListViewButtons from "./ToggleListViewButtons";
import ListHeader from "./ListHeader";
import {
  loansAreEmpty,
  removeLoansWithDuplicateDueDate,
  getFromListByKey,
  formatDate
} from "../utils/helpers";
import MaterialDetails, {
  constructMaterialDetailsModalId
} from "../modal/material-details";
import MaterialDetailsModal from "../modal/material-details-modal";
import {
  getDetailsModalId,
  containsDueDateModalQueryParam,
  dateFromDueDateModalQueryParam
} from "../../../core/utils/helpers/modal-helpers";
import LoansGroupModal from "../../../components/GroupModal/LoansGroupModal";
import { ListType } from "../../../core/utils/types/list-type";
import SimpleModalHeader from "../../../components/GroupModal/SimpleModalHeader";
import StatusCircleModalHeader from "../../../components/GroupModal/StatusCircleModalHeader";
import StatusCircle from "../materials/utils/status-circle";
import AcceptModal from "../../../components/accept-fees-modal/AcceptFeesModal";

interface LoanListProps {
  pageSize: number;
}

const LoanList: FC<LoanListProps> = ({ pageSize }) => {
  const { modalIds } = useSelector((s: ModalIdsProps) => s.modal);
  const { open } = useModalButtonHandler();
  const { loanDetails, allLoansId, dueDateModal, acceptModal } = getModalIds();
  const t = useText();
  const [view, setView] = useState<ListView>("list");
  const [modalLoan, setModalLoan] = useState<ListType | null>(null);
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [accepted, setAccepted] = useState<boolean>(false);
  const [modalDetailsId, setModalDetailsId] = useState<string | null>(null);
  const [physicalLoans, setPhysicalLoans] = useState<LoanType[] | null>(null);
  const [digitalLoans, setDigitalLoans] = useState<LoanType[] | null>(null);
  const [physicalLoansDueDates, setPhysicalLoansDueDates] = useState<string[]>(
    []
  );
  const { isSuccess, data } = useGetLoansV2();
  const { data: publizonData } = useGetV1UserLoans();
  useEffect(() => {
    let loanForModal = null;
    if (physicalLoans && modalDetailsId) {
      loanForModal = getFromListByKey(physicalLoans, "loanId", modalDetailsId);
    }
    if (loanForModal?.length === 0 && digitalLoans && modalDetailsId) {
      loanForModal = getFromListByKey(
        digitalLoans,
        "identifier",
        modalDetailsId
      );
    }
    if (loanForModal && loanForModal.length > 0) {
      setModalLoan(loanForModal[0]);
    }
  }, [digitalLoans, modalDetailsId, physicalLoans]);

  useEffect(() => {
    if (isSuccess && data) {
      const mapToLoanType = mapFBSLoanToLoanType(data);

      // The due dates are used for the stacked materials
      // The stacked materials view shows materials stacked by
      // due date, and for this we need a unique list of due dates
      setPhysicalLoansDueDates(getDueDatesLoan(mapToLoanType));

      // Loans are sorted by loan date
      const sortedByLoanDate = sortByDueDate(mapToLoanType);

      setPhysicalLoans(sortedByLoanDate);
    } else {
      setPhysicalLoans([]);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (publizonData?.loans) {
      const mapToLoanType = mapPublizonLoanToLoanType(publizonData.loans);

      // Loans are sorted by loan date
      const sortedByLoanDate = sortByDueDate(mapToLoanType);
      setDigitalLoans(sortedByLoanDate);
    } else {
      setDigitalLoans([]);
    }
  }, [publizonData]);

  const openAcceptModal = useCallback(() => {
    open(`${acceptModal}`);
  }, [acceptModal, open]);

  const openLoanDetailsModal = useCallback(
    (modalId: string) => {
      setModalDetailsId(modalId);
      open(`${loanDetails}${modalId}`);
    },
    [loanDetails, open]
  );

  const openDueDateModal = useCallback(
    (dueDateInput: string) => {
      setDueDate(dueDateInput);
      open(constructModalId(dueDateModal as string, [dueDateInput]));
    },
    [dueDateModal, open]
  );

  const openRenewLoansModal = useCallback(() => {
    setDueDate(null);
    open(allLoansId as string);
  }, [allLoansId, open]);

  useEffect(() => {
    const modalUrlParam = getUrlQueryParam("modal");
    // if there is a loan details query param, loan details modal should be opened
    const loanDetailsString = loanDetails as string;
    if (modalUrlParam && modalUrlParam.includes(loanDetails as string)) {
      const loanDetailsModalId = getDetailsModalId(
        modalUrlParam,
        loanDetailsString
      );
      if (loanDetailsModalId) {
        setModalDetailsId(loanDetailsModalId);
      }
    }

    // If there is a query param with the due date, a modal should be opened
    if (modalUrlParam && containsDueDateModalQueryParam(modalUrlParam)) {
      const dateFromQueryParam = dateFromDueDateModalQueryParam(modalUrlParam);
      setDueDate(dateFromQueryParam);
    }
  }, [allLoansId, loanDetails, openDueDateModal]);

  const listContainsLoans =
    (Array.isArray(physicalLoans) && physicalLoans.length > 0) ||
    (Array.isArray(digitalLoans) && digitalLoans.length > 0);

  const resetAccepted = () => {
    setAccepted(false);
  };

  return (
    <>
      <div className={`loan-list-page ${getScrollClass(modalIds)}`}>
        <h1 className="text-header-h1 my-32">{t("loanListTitleText")}</h1>
        {listContainsLoans && (
          <>
            {physicalLoans && (
              <List
                pageSize={pageSize}
                emptyListLabel={t("loanListPhysicalLoansEmptyListText")}
                loans={physicalLoans}
                dueDates={physicalLoansDueDates}
                view={view}
                openLoanDetailsModal={openLoanDetailsModal}
                openDueDateModal={openDueDateModal}
              >
                <ListHeader
                  header={t("loanListPhysicalLoansTitleText")}
                  amount={physicalLoans.length}
                >
                  <ToggleListViewButtons
                    disableRenewLoansButton={
                      getAmountOfRenewableLoans(physicalLoans) === 0
                    }
                    view={view}
                    setView={setView}
                    loans={physicalLoans}
                    pageSize={pageSize}
                    openRenewLoansModal={openRenewLoansModal}
                  />
                </ListHeader>
              </List>
            )}
            {digitalLoans && (
              <List
                pageSize={pageSize}
                emptyListLabel={t("loanListDigitalLoansEmptyListText")}
                loans={digitalLoans}
                view="list"
                openLoanDetailsModal={openLoanDetailsModal}
                openDueDateModal={openDueDateModal}
              >
                <ListHeader
                  header={t("loanListDigitalLoansTitleText")}
                  amount={digitalLoans.length}
                />
              </List>
            )}
          </>
        )}

        {loansAreEmpty(physicalLoans) && loansAreEmpty(digitalLoans) && (
          <EmptyList
            classNames="mt-24"
            emptyListText={t("loanListDigitalPhysicalLoansEmptyListText")}
          />
        )}
      </div>
      {/* modals below, the reason they are located here is that if they are nested
      within the components, it is not possible to hide the loan list when a modal is present
      which is necessary to comply with WCAG (so the screen readers cannot "catch" focusable html
      elements below the modal) */}
      <MaterialDetailsModal
        modalId={constructMaterialDetailsModalId(loanDetails, modalDetailsId)}
      >
        <MaterialDetails
          faust={modalLoan?.faust}
          identifier={modalLoan?.identifier}
          loan={modalLoan as LoanType}
          modalId={constructMaterialDetailsModalId(loanDetails, modalDetailsId)}
        />
      </MaterialDetailsModal>
      {physicalLoans && (
        <LoansGroupModal
          accepted={accepted}
          resetAccepted={() => resetAccepted()}
          pageSize={pageSize}
          openDetailsModal={openLoanDetailsModal}
          dueDate={dueDate}
          openAcceptModal={openAcceptModal}
          loansModal={
            dueDate
              ? removeLoansWithDuplicateDueDate(dueDate, physicalLoans)
              : physicalLoans
          }
        >
          {dueDate && (
            //  So, in the scenario where there are mixed loans, the design is challenged
            //  Therefore it was decided that the loandate for all the materials are "a month ago"
            <StatusCircleModalHeader
              header={t("groupModalDueDateHeaderText", {
                placeholders: { "@date": formatDate(dueDate) }
              })}
              dueDate={dueDate}
              subHeader={t("groupModalReturnLibraryText")}
              statusCircleComponent={
                <StatusCircle
                  loanDate={dayjs().subtract(1, "month").format("YYYY-MM-DD")}
                  dueDate={dueDate}
                />
              }
            />
          )}
          {!dueDate && <SimpleModalHeader header={t("groupModalHeaderText")} />}
        </LoansGroupModal>
      )}
      <AcceptModal accept={() => setAccepted(true)} />
    </>
  );
};

export default LoanList;
