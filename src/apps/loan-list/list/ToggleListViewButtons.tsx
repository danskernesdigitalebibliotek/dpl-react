import React, { FC, useCallback } from "react";
import { useText } from "../../../core/utils/text";
import IconList from "../../../components/icon-list/icon-list";
import IconStack from "../../../components/icon-stack/icon-stack";
import { ListView } from "../../../core/utils/types/list-view";
import { LoanType } from "../../../core/utils/types/loan-type";
import { setQueryParametersInUrl } from "../../../core/utils/helpers/url";

export interface ToggleListViewButtonsProps {
  setView: (view: ListView) => void;
  view: ListView;
  disableRenewLoansButton: boolean;
  pageSize: number;
  loans: LoanType[];
  openRenewLoansModal: () => void;
}

const ToggleListViewButtons: FC<ToggleListViewButtonsProps> = ({
  setView,
  view,
  disableRenewLoansButton,
  openRenewLoansModal
}) => {
  const t = useText();

  const setViewHandler = useCallback(
    (inputView: ListView) => {
      setQueryParametersInUrl({
        listview: inputView
      });
      setView(inputView);
    },
    [setView]
  );

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
          aria-pressed={view === "list"}
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
          aria-pressed={view === "stack"}
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
            className={`btn-primary btn-filled btn-small arrow__hover--right-small ${
              disableRenewLoansButton ? "btn-outline" : ""
            }`}
            id="test-renew-button"
            aria-describedby="renew-multiple-modal"
          >
            {t("loanListRenewMultipleButtonText")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToggleListViewButtons;
