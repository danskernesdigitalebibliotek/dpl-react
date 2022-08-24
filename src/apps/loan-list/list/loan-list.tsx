import React, { useEffect, useState, useCallback, FC } from "react";
import { useSelector } from "react-redux";
import { useGetLoansV2 } from "../../../core/fbs/fbs";
import { GetMaterialManifestationQuery } from "../../../core/dbc-gateway/generated/graphql";
import dateMatchesUsFormat from "../../../core/utils/helpers/date";
import {
  getAmountOfRenewableLoans,
  isAModalDisplayed,
  sortByLoanDate
} from "../../../core/utils/helpers/general";
import { getUrlQueryParam } from "../../../core/utils/helpers/url";
import { LoanV2 } from "../../../core/fbs/model/loanV2";
import { useText } from "../../../core/utils/text";
import DueDateLoansModal from "../modal/due-date-loans-modal";
import IconList from "../../../components/icon-list/icon-list";
import IconStack from "../../../components/icon-stack/icon-stack";
import {
  ModalIdsProps,
  useModalButtonHandler
} from "../../../core/utils/modal";
import MaterialDetailsModal from "../modal/material-details-modal";
import { LoanDetailsV2 } from "../../../core/fbs/model";
import { FaustId } from "../../../core/utils/types/ids";
import RenewLoansModal from "../modal/renew-loans-modal";
import modalIdsConf from "../../../core/configuration/modal-ids.json";
import Pagination from "../utils/pagination";
import { ListView } from "../../../core/utils/types/list-view";
import {
  queryMatchesFaust,
  removeLoansWithDuplicateDueDate
} from "../utils/helpers";

export interface ModalMaterialType {
  materialItemNumber: number;
  mainText: string;
  pid: string;
  faust: FaustId;
  specific: string;
  creators: string;
}
export interface LoanDetailsType {
  dueDate: string;
  loanId: string;
  loanDate: string;
}

const LoanList: FC = () => {
  const { open } = useModalButtonHandler();
  const t = useText();
  const [loans, setLoans] = useState<LoanV2[]>();
  const [allLoans, setAllLoans] = useState<LoanV2[]>([]);
  const [searchItemsShown, setSearchItemsShown] = useState(pageSize);
  const [displayedLoans, setDisplayedLoans] = useState<LoanV2[]>();
  const [dueDates, setDueDates] = useState<string[]>([]);
  const [modalMaterial, setModalMaterial] = useState<
    GetMaterialManifestationQuery | null | undefined
  >(null);
  const [modalLoanDetails, setModalLoanDetails] =
    useState<LoanDetailsV2 | null>(null);
  const [dueDateModal, setDueDateModal] = useState<string>("");
  const [loansModal, setLoansModal] = useState<LoanV2[] | null>();
  const [displayList, setDisplayList] = useState<boolean>(false);
  const [renewable, setRenewable] = useState<number | null>(null);
  const [view, setView] = useState<ListView>("list");
  const { isSuccess, data, refetch } = useGetLoansV2();
  const { modalIds } = useSelector((s: ModalIdsProps) => s.modal);

  const updateRenewable = (materials: LoanV2[]) => {
    // Amount of renewable loans are determined, used in the ui
    const amountOfRenewableLoans = getAmountOfRenewableLoans(materials);
    setRenewable(amountOfRenewableLoans);
  };

  useEffect(() => {
    if (isSuccess && data) {
      setAllLoans([...data]);
      const listOfDueDates = data.map((a) => a.loanDetails.dueDate);
      const uniqeListOfDueDates = Array.from(new Set(listOfDueDates));

      // The due dates are used for the stacked materials
      // The stacked materials view shows materials stacked by
      // due date, and for this we need a uniqe list of due dates
      setDueDates(uniqeListOfDueDates);

      // Loans are sorted by due date
      const sortedByLoanDate = sortByLoanDate(data);

      setLoans(sortedByLoanDate);
      updateRenewable(sortedByLoanDate);
      setDisplayedLoans([...sortedByLoanDate].splice(0, searchItemsShown));
    }
  }, [isSuccess, data, searchItemsShown]);

  const selectModalMaterial = ({
    material,
    loanDetails
  }: {
    material: GetMaterialManifestationQuery | undefined | null;
    loanDetails: LoanDetailsV2;
  }) => {
    setModalMaterial(material);
    setModalLoanDetails(loanDetails);
  };

  useEffect(() => {
    setDisplayList(true);
    if (isAModalDisplayed(modalIds)) {
      refetch();
      setDisplayList(true);
    }
  }, [modalIds, modalIds?.length, refetch]);

  const openModalDueDate = useCallback(
    (dueDateModalInput?: string) => {
      if (loans && dueDateModalInput) {
        setDueDateModal(dueDateModalInput);
        // The loans are filtered with said date string
        const loansForModal = removeLoansWithDuplicateDueDate(
          dueDateModalInput,
          loans,
          "loanDetails.dueDate"
        );

        // Amount of renewable loans are determined, used in the ui
        const amountOfRenewableLoans = getAmountOfRenewableLoans(loansForModal);

        // Loans for modal (the modal shows loans stacked by due date)
        setLoansModal(loansForModal);
        setRenewable(amountOfRenewableLoans);
      }
    },
    [loans]
  );

  const openRenewLoansModal = useCallback(() => {
    if (loans) {
      const amountOfRenewableLoans = getAmountOfRenewableLoans(loans);

      // Loans for modal (the modal shows loans stacked by due date)
      setLoansModal(loans);
      setRenewable(amountOfRenewableLoans);
      open(modalIdsConf.allLoansId);
    }
  }, [loans, open]);

  const setPageHandler = () => {
    if (loans) {
      const currentPage = page + 1;
      const itemsOnPage = (currentPage + 1) * pageSize;
      setPage(currentPage);
      setSearchItemsShown(itemsOnPage);
    }
  };

  useEffect(() => {
    const modalString = getUrlQueryParam("modal");

    // modal query param: due date modal date
    const dateFound = dateMatchesUsFormat(modalString);
    if (modalString && loans && dateFound) {
      openModalDueDate(dateFound);
      return;
    }

    // modal query param: details modal faust
    const faustFound = queryMatchesFaust(modalString);

    if (modalString && faustFound && loans) {
      const loanDetailsForModal = loans.filter(
        ({ loanDetails }) => loanDetails.recordId === faustFound
      );
      setModalLoanDetails(loanDetailsForModal[0].loanDetails);
      open(faustFound);
      return;
    }
    // modal query param: modal loans all
    if (modalString === modalIdsConf.allLoansId) {
      open(modalIdsConf.allLoansId);
    }
  }, [loans, openModalDueDate, open]);

  useEffect(() => {
    if (loans) {
      if (view === "list") {
        setDisplayedLoans(getSearchItems(loans, searchItemsShown));
      } else {
        const stackedLoans: LoanV2[] = getStackedSearchItems(
          view,
          loans,
          searchItemsShown,
          dueDates
        );

        setDisplayedLoans([...stackedLoans]);
      }
    }
  }, [dueDates, loans, searchItemsShown, view]);

  useEffect(() => {
    // When view is changed (from list to stacks or stacks to list)
    // The items shown are reset to pagesize from config
    setSearchItemsShown(pageSize);
  }, [view]);

  return (
    <>
      {/* only display the list when a modal is not open. this is to do with accessibility,
      so the screen reader does not focus on focusable inputs in the list while a modal is open. */}
      {displayList && (
        <>
          <h1 className="text-header-h1 m-32">{t("loanListTitleText")}</h1>
          <div className="dpl-list-buttons m-32">
            <h2 className="dpl-list-buttons__header">
              {t("loanListPhysicalLoansTitleText")}
              <div className="dpl-list-buttons__power">{allLoans.length}</div>
            </h2>
            <div className="dpl-list-buttons__buttons">
              <div className="dpl-list-buttons__buttons__button">
                <button
                  onClick={() => setView("list")}
                  className={`dpl-icon-button ${
                    view === "list" ? "dpl-icon-button--selected" : ""
                  }`}
                  type="button"
                  aria-label={t("loanListListText")}
                >
                  <IconList />
                </button>
              </div>
              <div className="dpl-list-buttons__buttons__button">
                <button
                  className={`dpl-icon-button ${
                    view === "stacked" ? "dpl-icon-button--selected" : ""
                  }`}
                  id="test-stack"
                  onClick={() => setView("stacked")}
                  type="button"
                  aria-label={t("loanListStackText")}
                >
                  <IconStack />
                </button>
              </div>
              <div className="dpl-list-buttons__buttons__button">
                <button
                  type="button"
                  onClick={() => {
                    openRenewLoansModal();
                  }}
                  aria-describedby={t(
                    "loanListRenewMultipleButtonExplanationText"
                  )}
                  className="btn-primary btn-filled btn-small arrow__hover--right-small"
                >
                  {t("loanListRenewMultipleButtonText")}
                </button>
              </div>
            </div>
          </div>
          {loans && (
            <Pagination
              dueDates={dueDates}
              loans={loans}
              view={view}
              hitcount={allLoans.length}
              openModalDueDate={openModalDueDate}
              selectModalMaterial={selectModalMaterial}
            />
          )}
        </>
      )}
      {modalLoanDetails && (
        <MaterialDetailsModal
          loanDetails={modalLoanDetails}
          material={modalMaterial}
        />
      )}
      <DueDateLoansModal
        dueDate={dueDateModal}
        renewable={renewable}
        loansModal={loansModal}
      />
      <RenewLoansModal renewable={renewable} loansModal={loans} />
    </>
  );
};

export default LoanList;
