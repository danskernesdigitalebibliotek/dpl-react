import React, { useState, FC } from "react";
import { GetMaterialManifestationQuery } from "../../../core/dbc-gateway/generated/graphql";
import { useText } from "../../../core/utils/text";
import IconList from "../../../components/icon-list/icon-list";
import IconStack from "../../../components/icon-stack/icon-stack";
import { LoanDetailsV2 } from "../../../core/fbs/model";
import Pagination from "../utils/pagination";
import { ListView } from "../../../core/utils/types/list-view";
import { LoanMetaDataType } from "../../../core/utils/helpers/LoanMetaDataType";

export interface ListProps {
  header: string;
  openRenewLoansModal: () => void;
  openModalDueDate: (id: string, dueDate?: string) => void;
  setView?: (view: string) => void;
  selectModalMaterial: ({
    material,
    loanMetaData
  }: {
    material: GetMaterialManifestationQuery | undefined | null;
    loanMetaData: LoanMetaDataType;
  }) => void;
  loans: LoanMetaDataType[];
  dueDates: string[];
  allLoansLength: number;
  view: ListView;
}

const List: FC<ListProps> = ({
  header,
  openRenewLoansModal,
  openModalDueDate,
  selectModalMaterial,
  setView,
  loans,
  dueDates,
  allLoansLength,
  view
}) => {
  const t = useText();
  useState<LoanDetailsV2 | null>(null);

  return (
    <>
      <div className="dpl-list-buttons m-32">
        <h2 className="dpl-list-buttons__header">
          {header}
          <div className="dpl-list-buttons__power">{allLoansLength}</div>
        </h2>
        {setView && (
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
        )}
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
