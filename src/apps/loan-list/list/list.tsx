import React, { useState, FC, useCallback, useEffect } from "react";
import { GetMaterialManifestationQuery } from "../../../core/dbc-gateway/generated/graphql";
import { useText } from "../../../core/utils/text";
import IconList from "../../../components/icon-list/icon-list";
import IconStack from "../../../components/icon-stack/icon-stack";
import Pagination from "../utils/pagination";
import { ListView } from "../../../core/utils/types/list-view";
import { LoanMetaDataType } from "../../../core/utils/types/loan-meta-data-type";
import RenewLoansModal from "../modal/renew-loans-modal";
import { useModalButtonHandler } from "../../../core/utils/modal";
import modalIdsConf from "../../../core/configuration/modal-ids.json";
import { getUrlQueryParam } from "../../../core/utils/helpers/url";
import { isDate } from "../../../core/utils/helpers/date";

export interface ListProps {
  header: string;
  setView: (view: string) => void;
  selectModalMaterial: ({
    material,
    loanMetaData
  }: {
    material: GetMaterialManifestationQuery | undefined | null;
    loanMetaData: LoanMetaDataType;
  }) => void;
  loans: LoanMetaDataType[];
  dueDates: string[];
  view: ListView;
  dueDateLabel: string;
  viewToggleable: boolean;
}

const List: FC<ListProps> = ({
  header,
  selectModalMaterial,
  setView,
  loans,
  dueDates,
  view,
  dueDateLabel,
  viewToggleable
}) => {
  const t = useText();
  const { open } = useModalButtonHandler();
  const [showModal, setShowModal] = useState<boolean>(false);

  const openRenewLoansModal = useCallback(() => {
    setShowModal(true);
    open(modalIdsConf.allLoansId);
  }, [open]);

  useEffect(() => {
    const modalString = getUrlQueryParam("modal");

    // If the query param has all loans id, the modal should be opened
    if (modalString === modalIdsConf.allLoansId) {
      openRenewLoansModal();
    }

    // If the queryparme is a date, the view should be stacked
    // because the modal it opens can only be opened in the stacked view
    if (isDate(modalString)) {
      setView("stacked");
    }
  }, [openRenewLoansModal, setView]);

  return (
    <>
      <div className="dpl-list-buttons m-32">
        <h2 className="dpl-list-buttons__header">
          {header}
          <div className="dpl-list-buttons__power">{loans.length}</div>
        </h2>
        {viewToggleable && (
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
          dueDateLabel={dueDateLabel}
          dueDates={dueDates}
          loans={loans}
          view={view as ListView}
          selectModalMaterial={selectModalMaterial}
        />
      )}
      {showModal && <RenewLoansModal loansModal={loans} />}
    </>
  );
};

export default List;
