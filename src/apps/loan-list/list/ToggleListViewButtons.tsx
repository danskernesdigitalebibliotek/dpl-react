import React, { FC, useCallback } from "react";
import { useText } from "../../../core/utils/text";
import IconList from "../../../components/icon-list/icon-list";
import IconStack from "../../../components/icon-stack/icon-stack";
import { ListView } from "../../../core/utils/types/list-view";
import { getModalIds } from "../../../core/utils/helpers/general";
import { useModalButtonHandler } from "../../../core/utils/modal";
import RenewLoansModal from "../modal/renew-loans-modal";
import { LoanType } from "../../../core/utils/types/loan-type";

export interface ToggleListViewButtonsProps {
  setView: (view: ListView) => void;
  view: ListView;
  disableRenewLoansButton: boolean;
  pageSize: number;
  loans: LoanType[];
}

const ToggleListViewButtons: FC<ToggleListViewButtonsProps> = ({
  setView,
  view,
  disableRenewLoansButton,
  pageSize,
  loans
}) => {
  const t = useText();
  const { open } = useModalButtonHandler();
  const { allLoansId } = getModalIds();

  const setViewHandler = useCallback(
    (inputView: ListView) => {
      setView(inputView);
    },
    [setView]
  );

  const openRenewLoansModal = useCallback(() => {
    open(allLoansId as string);
  }, [allLoansId, open]);

  return (
    <div className="dpl-list-buttons__buttons">
      <div
        id="renew-multiple-modal"
        className="dpl-list-buttons__screen-reader-description"
      >
        {t("loanListRenewMultipleButtonExplanationText")}
      </div>
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
            view === "stack" ? "dpl-icon-button--selected" : ""
          }`}
          data-cy="stack"
          onClick={() => setViewHandler("stack")}
          type="button"
          aria-label={t("loanListAriaLabelStackButtonText")}
        >
          <IconStack />
        </button>
        <div className="dpl-list-buttons__buttons__button dpl-list-buttons__buttons__button--hide-on-mobile">
          <button
            type="button"
            onClick={() => {
              openRenewLoansModal();
            }}
            disabled={disableRenewLoansButton}
            id="test-renew-button"
            aria-describedby="renew-multiple-modal"
            className="btn-primary btn-filled btn-small arrow__hover--right-small"
          >
            {t("loanListRenewMultipleButtonText")}
          </button>
        </div>
      </div>
      <RenewLoansModal pageSize={pageSize} loansModal={loans} />
    </div>
  );
};

export default ToggleListViewButtons;
