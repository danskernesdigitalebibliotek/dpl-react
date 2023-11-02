import React, { useEffect, useState, FC, useCallback } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  getAmountOfRenewableLoans,
  getModalIds,
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
import { LoanType } from "../../../core/utils/types/loan-type";
import { ListView } from "../../../core/utils/types/list-view";
import EmptyList from "../../../components/empty-list/empty-list";
import ToggleListViewButtons from "./ToggleListViewButtons";
import ListHeader from "./ListHeader";
import {
  loansAreEmpty,
  removeLoansWithDuplicateDueDate,
  getFromListByKey
} from "../utils/helpers";
import MaterialDetails, {
  constructMaterialDetailsModalId
} from "../modal/material-details";
import MaterialDetailsModal, {
  loanDetailsModalId
} from "../modal/material-details-modal";
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
import { formatDate } from "../../../core/utils/helpers/date";
import useLoans from "../../../core/utils/useLoans";

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
  const {
    fbs: {
      loans: loansPhysical,
      stackedMaterialsDueDates: stackedMaterialsDueDatesFbs
    },
    publizon: { loans: loansDigital }
  } = useLoans();

  useEffect(() => {
    // If modalLoan is already set it should not be set again, because it will cause an infinite loop
    if (modalLoan) {
      return;
    }
    let loanForModal = null;
    if (loansPhysical && modalDetailsId) {
      loanForModal = getFromListByKey(loansPhysical, "loanId", modalDetailsId);
    }
    if (loanForModal?.length === 0 && loansDigital && modalDetailsId) {
      loanForModal = getFromListByKey(
        loansDigital,
        "identifier",
        modalDetailsId
      );
    }
    if (loanForModal && loanForModal.length > 0) {
      setModalLoan(loanForModal[0]);
    }
  }, [modalDetailsId, modalLoan, loansPhysical, loansDigital]);

  const openAcceptModal = useCallback(() => {
    open(`${acceptModal}`);
  }, [acceptModal, open]);

  const openLoanDetailsModal = useCallback(
    (loan: LoanType) => {
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
    (Array.isArray(loansPhysical) && loansPhysical.length > 0) ||
    (Array.isArray(loansDigital) && loansDigital.length > 0);

  const resetAccepted = () => {
    setAccepted(false);
  };

  return (
    <>
      <div className={`loan-list-page ${getScrollClass(modalIds)}`}>
        <h1 className="text-header-h1 my-32">{t("loanListTitleText")}</h1>
        {listContainsLoans && (
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

        {loansPhysical &&
          loansDigital &&
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
        <MaterialDetailsModal
          modalId={constructMaterialDetailsModalId(loanDetails, modalDetailsId)}
        >
          <MaterialDetails
            item={modalLoan}
            loan={modalLoan as LoanType}
            modalId={constructMaterialDetailsModalId(
              loanDetails,
              modalDetailsId
            )}
          />
        </MaterialDetailsModal>
      )}
      {loansPhysical && (
        <LoansGroupModal
          accepted={accepted}
          resetAccepted={() => resetAccepted()}
          pageSize={pageSize}
          openDetailsModal={openLoanDetailsModal}
          dueDate={dueDate}
          openAcceptModal={openAcceptModal}
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
