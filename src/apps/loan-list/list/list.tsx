import React, { FC, useCallback, useEffect } from "react";
import { useText } from "../../../core/utils/text";
import IconList from "../../../components/icon-list/icon-list";
import IconStack from "../../../components/icon-stack/icon-stack";
import PaginatedLoans from "../utils/PaginatedLoans";
import { ListView } from "../../../core/utils/types/list-view";
import { LoanType } from "../../../core/utils/types/loan-type";
import RenewLoansModal from "../modal/renew-loans-modal";
import { useModalButtonHandler } from "../../../core/utils/modal";
import { getUrlQueryParam } from "../../../core/utils/helpers/url";
import { isDate } from "../../../core/utils/helpers/date";
import EmptyList from "../../../components/empty-list/empty-list";
import {
  getAmountOfRenewableLoans,
  getModalIds
} from "../../../core/utils/helpers/general";

export interface ListProps {
  header: string;
  setView: (view: string) => void;
  loans: LoanType[];
  dueDates: string[];
  view: ListView;
  emptyListLabel: string;
  viewToggleable: boolean;
  pageSize: number;
}

const List: FC<ListProps> = ({
  header,
  setView,
  loans,
  dueDates,
  view,
  viewToggleable,
  emptyListLabel,
  pageSize
}) => {
  const t = useText();
  const { open } = useModalButtonHandler();
  const { allLoansId } = getModalIds();

  const openRenewLoansModal = useCallback(() => {
    open(allLoansId as string);
  }, [allLoansId, open]);

  useEffect(() => {
    const modalString = getUrlQueryParam("modal");

    // If the query param has all loans id, the modal should be opened
    if (modalString === allLoansId) {
      openRenewLoansModal();
    }

    // If the queryparme is a date, the view should be stacked
    // because the modal it opens can only be opened in the stacked view
    if (isDate(modalString)) {
      setView("stacked");
    }
  }, [allLoansId, openRenewLoansModal, setView]);

  const setViewHandler = useCallback(
    (inputView: ListView) => {
      setView(inputView);
    },
    [setView]
  );

  return (
    <>
      <div className="dpl-list-buttons my-32">
        <h2 className="dpl-list-buttons__header">
          {header}
          <div className="dpl-list-buttons__power">{loans.length}</div>
        </h2>
        {viewToggleable && (
          <div className="dpl-list-buttons__buttons">
            <div className="dpl-list-buttons__buttons__button">
              <button
                onClick={() => setViewHandler("list")}
                className={`dpl-icon-button ${
                  view === "list" ? "dpl-icon-button--selected" : ""
                }`}
                id="test-list"
                type="button"
                aria-label={t("loanListAriaLabelListButtonText")}
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
                onClick={() => setViewHandler("stacked")}
                type="button"
                aria-label={t("loanListAriaLabelStackButtonText")}
              >
                <IconStack />
              </button>
            </div>
            <div className="dpl-list-buttons__buttons__button dpl-list-buttons__buttons__button--hide-on-mobile">
              <div
                id="renew-multiple-modal"
                className="dpl-list-buttons__screen-reader-description"
              >
                {t("loanListRenewMultipleButtonExplanationText")}
              </div>
              <button
                type="button"
                onClick={() => {
                  openRenewLoansModal();
                }}
                disabled={getAmountOfRenewableLoans(loans) === 0}
                id="test-renew-button"
                aria-describedby="renew-multiple-modal"
                className="btn-primary btn-filled btn-small arrow__hover--right-small"
              >
                {t("loanListRenewMultipleButtonText")}
              </button>
            </div>
          </div>
        )}
      </div>
      {loans && loans.length > 0 && (
        <PaginatedLoans
          pageSize={pageSize}
          dueDates={dueDates}
          loans={loans}
          view={view as ListView}
        />
      )}
      {loans.length === 0 && <EmptyList emptyListText={emptyListLabel} />}
      <RenewLoansModal pageSize={pageSize} loansModal={loans} />
    </>
  );
};

export default List;
