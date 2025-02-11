import React, { useEffect, useState, FC, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  getAmountOfRenewableLoans,
  getDueDatesLoan,
  getScrollClass,
  sortByDueDate
} from "../../../core/utils/helpers/general";
import { getUrlQueryParam } from "../../../core/utils/helpers/url";
import { useText } from "../../../core/utils/text";
import {
  useModalButtonHandler,
  ModalIdsProps
} from "../../../core/utils/modal";
import List from "./list";
import { isLoanType, LoanType } from "../../../core/utils/types/loan-type";
import { ListView } from "../../../core/utils/types/list-view";
import EmptyList from "../../../components/empty-list/empty-list";
import ToggleListViewButtons from "./ToggleListViewButtons";
import ListHeader from "./ListHeader";
import {
  loansAreEmpty,
  removeLoansWithDuplicateDueDate,
  getFromListByKey
} from "../utils/helpers";
import MaterialDetails from "../modal/material-details";
import MaterialDetailsModal, {
  loanDetailsModalId
} from "../modal/material-details-modal";
import {
  getDetailsModalId,
  containsDueDateModalQueryParam,
  dateFromDueDateModalQueryParam,
  constructModalId,
  getModalIds
} from "../../../core/utils/helpers/modal-helpers";
import LoansGroupModal from "../../../components/GroupModal/LoansGroupModal";
import SimpleModalHeader from "../../../components/GroupModal/SimpleModalHeader";
import StatusCircleModalHeader from "../../../components/GroupModal/StatusCircleModalHeader";
import StatusCircle from "../materials/utils/status-circle";
import { formatDate, getMonthAgoDate } from "../../../core/utils/helpers/date";
import useLoans from "../../../core/utils/useLoans";
import LoanListSkeleton from "./loan-list-skeleton";

interface LoanListProps {
  pageSize: number;
}

const LoanList: FC<LoanListProps> = ({ pageSize }) => {
  const { modalIds } = useSelector((s: ModalIdsProps) => s.modal);
  const { open } = useModalButtonHandler();
  const { loanDetails, allLoansId, dueDateModal } = getModalIds();
  const t = useText();
  const [view, setView] = useState<ListView>("list");
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [modalLoan, setModalLoan] = useState<LoanType | null>(null);
  const {
    fbs: { loans: fbsLoans, isLoading: isLoadingFbs },
    publizon: { loans: publizonLoans, isLoading: isLoadingPublizon }
  } = useLoans();
  const loansPhysical = sortByDueDate(fbsLoans);
  const loansDigital = sortByDueDate(publizonLoans);
  const stackedMaterialsDueDatesFbs = getDueDatesLoan(loansPhysical);
  const openLoanDetailsModal = useCallback(
    (loan: LoanType) => {
      setModalLoan(loan);
      open(loanDetailsModalId(loan));
    },
    [open]
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
      const loanIdFromModalId = getDetailsModalId(
        modalUrlParam,
        loanDetailsString
      );
      if (loanIdFromModalId && loansPhysical) {
        const loans = [
          ...getFromListByKey(loansPhysical, "loanId", loanIdFromModalId),
          ...getFromListByKey(loansDigital, "identifier", loanIdFromModalId)
        ];
        const loan = loans.filter(isLoanType).at(0);
        if (loan) {
          setModalLoan(loan);
        }
      }
    }

    // If there is a query param with the due date, a modal should be opened
    if (modalUrlParam && containsDueDateModalQueryParam(modalUrlParam)) {
      const dateFromQueryParam = dateFromDueDateModalQueryParam(modalUrlParam);
      setDueDate(dateFromQueryParam);
    }
  }, [loansPhysical, loansDigital, loanDetails, openDueDateModal]);

  const shouldShowSkeletons =
    isLoadingFbs &&
    isLoadingPublizon &&
    loansPhysical.length === 0 &&
    loansDigital.length === 0;

  return (
    <>
      <div className={`loan-list-page ${getScrollClass(modalIds)}`}>
        <h1 className="text-header-h1 my-32">{t("loanListTitleText")}</h1>
        {shouldShowSkeletons && <LoanListSkeleton />}

        {!shouldShowSkeletons &&
          (!loansAreEmpty(loansPhysical) || !loansAreEmpty(loansDigital)) && (
            <>
              {loansPhysical && (
                <List
                  pageSize={pageSize}
                  emptyListLabel={t("loanListPhysicalLoansEmptyListText")}
                  loans={loansPhysical}
                  dueDates={stackedMaterialsDueDatesFbs}
                  view={view}
                  openLoanDetailsModal={openLoanDetailsModal}
                  openDueDateModal={openDueDateModal}
                >
                  <ListHeader
                    header={t("loanListPhysicalLoansTitleText")}
                    amount={loansPhysical.length}
                  >
                    <ToggleListViewButtons
                      disableRenewLoansButton={
                        getAmountOfRenewableLoans(loansPhysical) === 0
                      }
                      view={view}
                      setView={setView}
                      loans={loansPhysical}
                      pageSize={pageSize}
                      openRenewLoansModal={openRenewLoansModal}
                    />
                  </ListHeader>
                </List>
              )}
              {loansDigital && (
                <List
                  pageSize={pageSize}
                  emptyListLabel={t("loanListDigitalLoansEmptyListText")}
                  loans={loansDigital}
                  view="list"
                  openLoanDetailsModal={openLoanDetailsModal}
                  openDueDateModal={openDueDateModal}
                >
                  <ListHeader
                    header={t("loanListDigitalLoansTitleText")}
                    amount={loansDigital.length}
                  />
                </List>
              )}
            </>
          )}

        {!isLoadingFbs &&
          !isLoadingPublizon &&
          loansAreEmpty(loansPhysical) &&
          loansAreEmpty(loansDigital) && (
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
      {modalLoan && (
        <MaterialDetailsModal modalId={loanDetailsModalId(modalLoan)}>
          <MaterialDetails
            item={modalLoan}
            loan={modalLoan as LoanType}
            modalId={loanDetailsModalId(modalLoan)}
          />
        </MaterialDetailsModal>
      )}
      {loansPhysical && (
        <LoansGroupModal
          pageSize={pageSize}
          openDetailsModal={openLoanDetailsModal}
          dueDate={dueDate}
          loansModal={
            dueDate
              ? removeLoansWithDuplicateDueDate(dueDate, loansPhysical)
              : loansPhysical
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
              statusCircleComponent={
                <StatusCircle loanDate={getMonthAgoDate()} dueDate={dueDate} />
              }
            />
          )}
          {!dueDate && <SimpleModalHeader header={t("groupModalHeaderText")} />}
        </LoansGroupModal>
      )}
    </>
  );
};

export default LoanList;
