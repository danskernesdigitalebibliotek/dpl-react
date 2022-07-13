import React, { useEffect, useState } from "react";
import MenuIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Menu.svg";
import VariousIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Various.svg";
import { useGetLoansV2 } from "../../../core/fbs/fbs";
import { LoanV2 } from "../../../core/fbs/model/loanV2";
import MaterialDecorator from "../materials/material-decorator";
import { useText } from "../../../core/utils/text";
import { getUrlQueryParam } from "../../../core/utils/helpers";
import DueDateLoansModal from "../modal/due-date-loans-modal";
import {
  removeLoansWithDuplicateDueDate,
  getAmountOfRenewableLoans
} from "../helpers";

const LoanList: React.FC = () => {
  const t = useText();
  const [loans, setLoans] = useState<LoanV2[]>();
  const [dueDates, setDueDates] = useState<string[]>([]);
  const [dueDateModal, setDueDateModal] = useState<string>("");
  const [loansModal, setLoansModal] = useState<LoanV2[] | null>();
  const [ariaHide, setAriaHide] = useState<boolean>(false);
  const [renewable, setRenewable] = useState<number | null>(null);
  const [amountOfLoans, setAmountOfLoans] = useState<number>(0);
  const [view, setView] = useState<string>("list");

  const { isSuccess, data } = useGetLoansV2();

  useEffect(() => {
    if (isSuccess && data) {
      const listOfDueDates = data.map((a) => a.loanDetails.dueDate);
      const uniqeListOfDueDates = Array.from(new Set(listOfDueDates));

      // The due dates are used for the stacked materials
      // The stacked materials view shows materials stacked by
      // due date, and for this we need a uniqe list of due dates
      setDueDates(uniqeListOfDueDates);

      // Loans are sorted by due date
      const sortedByDueDate = data.sort(
        (objA, objB) =>
          new Date(objA.loanDetails.dueDate).getTime() -
          new Date(objB.loanDetails.dueDate).getTime()
      );
      setLoans(sortedByDueDate);
      setAmountOfLoans(sortedByDueDate.length);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    // regex for finding date string from modal query param
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    // modal query param
    const modalString = getUrlQueryParam("modal");

    if (modalString && loans) {
      const found = modalString.toString().match(regex);
      // If there is a date string in the modal query param
      if (found) {
        setDueDateModal(found[0]);
        // The loans are filtered with said date string
        const loansForModal = removeLoansWithDuplicateDueDate(
          dueDateModal,
          loans,
          "loanDetails.dueDate"
        );

        // Amount of renewable loans are determined, used in the ui
        const amountOfRenewableLoans = getAmountOfRenewableLoans(loansForModal);

        // Loans for modal (the modal shows loans stacked by due date)
        setLoansModal(loansForModal);
        setAriaHide(true);
        setRenewable(amountOfRenewableLoans);
      }
    }
  }, [loans, dueDateModal]);

  function openModalDueDate(dueDateModalInput: string) {
    if (loans) {
      setDueDateModal(dueDateModalInput);
      setLoansModal(
        removeLoansWithDuplicateDueDate(
          dueDateModalInput,
          loans,
          "loanDetails.dueDate"
        )
      );
    }
  }

  return (
    <div aria-hidden={ariaHide}>
      <h1 className="text-header-h1 m-32">{t("loanListTitleText")}</h1>
      <div className="dpl-list-buttons">
        <h2 className="dpl-list-buttons__header">
          {t("loanListPhysicalLoansTitleText")}
          <div className="dpl-list-buttons__power">{amountOfLoans}</div>
        </h2>
        <div className="dpl-list-buttons__buttons">
          <div className="dpl-list-buttons__buttons__button">
            <button
              className="dpl-icon-button"
              onClick={() => setView("list")}
              type="button"
            >
              <img src={MenuIcon} alt={t("loanListListText")} />
            </button>
          </div>
          <div className="dpl-list-buttons__buttons__button">
            <button
              className="dpl-icon-button"
              onClick={() => setView("stacked")}
              type="button"
            >
              <img src={VariousIcon} alt={t("loanListStackText")} />
            </button>
          </div>
          <div className="dpl-list-buttons__buttons__button">
            <button
              type="button"
              aria-describedby={t("loanListRenewMultipleButtonExplanationText")}
              className="btn-primary btn-filled btn-small arrow__hover--right-small"
            >
              {t("loanListRenewMultipleButtonText")}
            </button>
          </div>
        </div>
      </div>
      {loans && (
        <div className="list-reservation-container">
          {view === "stacked" &&
            dueDates.map((uniqueDueDate) => {
              // Stack items:
              // if multiple items have the same due date, they are "stacked"
              // which means styling making it look like there are multiple materials,
              // but only _one_ with said due date is visible.
              const loan = removeLoansWithDuplicateDueDate(
                uniqueDueDate,
                loans,
                "loanDetails.dueDate"
              );

              const {
                loanDetails: { dueDate, loanDate, recordId }
              } = loan[0];
              return (
                <MaterialDecorator
                  key={recordId}
                  materialType="stackableMaterial"
                  faust={recordId}
                  selectDueDate={() => openModalDueDate(dueDate)}
                  dueDate={dueDate}
                  loanDate={loanDate}
                  amountOfMaterialsWithDueDate={loan.length}
                />
              );
            })}
          {view === "list" &&
            loans.map(({ loanDetails: { dueDate, loanDate, recordId } }) => {
              return (
                <MaterialDecorator
                  key={recordId}
                  materialType="stackableMaterial"
                  faust={recordId}
                  dueDate={dueDate}
                  loanDate={loanDate}
                />
              );
            })}
        </div>
      )}
      <DueDateLoansModal
        dueDate={dueDateModal}
        renewable={renewable}
        dueDates={dueDates}
        loansModal={loansModal}
      />
    </div>
  );
};

export default LoanList;
