import React, { useState, FC } from "react";
import { GetMaterialManifestationQuery } from "../../../core/dbc-gateway/generated/graphql";
import { LoanV2 } from "../../../core/fbs/model/loanV2";
import { useText } from "../../../core/utils/text";
import IconList from "../../../components/icon-list/icon-list";
import IconStack from "../../../components/icon-stack/icon-stack";
import { LoanDetailsV2 } from "../../../core/fbs/model";
import Pagination from "../utils/pagination";
import { ListView } from "../../../core/utils/types/list-view";
import { Loan } from "../../../core/publizon/model";

export interface ListProps {
  header: string;
  openRenewLoansModal: () => void;
  openModalDueDate: (dueDate: string) => void;
  selectModalMaterial: ({
    material,
    loanDetails
  }: {
    material: GetMaterialManifestationQuery | undefined | null;
    loanDetails: LoanDetailsV2;
  }) => void;
  loans: LoanV2 | Loan;
  dueDates: string[];
  allLoansLength: number;
}

const List: FC<ListProps> = ({
  header,
  openRenewLoansModal,
  openModalDueDate,
  selectModalMaterial,
  loans,
  dueDates,
  allLoansLength
}) => {
  const t = useText();
  useState<LoanDetailsV2 | null>(null);
  const [view, setView] = useState<string>("list");

  return (
    <>
      <div className="dpl-list-buttons m-32">
        <h2 className="dpl-list-buttons__header">
          {header}
          <div className="dpl-list-buttons__power">{allLoansLength}</div>
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
              aria-describedby={t("loanListRenewMultipleButtonExplanationText")}
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
          view={view as ListView}
          hitcount={allLoansLength}
          openModalDueDate={openModalDueDate}
          selectModalMaterial={selectModalMaterial}
        />
      )}
    </>
  );
};

export default List;
