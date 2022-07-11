import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import localeDa from "dayjs/locale/da";
import localizedFormat from "dayjs/plugin/localizedFormat";
import MenuIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Menu.svg";
import VariousIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Various.svg";
import { getLoansV2 } from "../../../core/fbs/fbs";
import { LoanV2 } from "../../../core/fbs/model/loanV2";
import Modal from "../../../core/utils/modal";
import StatusCircle from "../materials/utils/status-circle";
import MaterialDecorator from "../materials/material-decorator";
import { useText } from "../../../core/utils/text";
import CheckBox from "../materials/utils/checkbox";
import DueDateLoansModal from "../modal/due-date-loans-modal";

const DemoLoanList: React.FC = () => {
  const t = useText();
  const [loans, setLoans] = useState<LoanV2[] | null>([]);
  const [dueDates, setDueDates] = useState<string[]>();
  const [dueDateModal, setDueDateModal] = useState<string>("");
  const [loansModal, setLoansModal] = useState<LoanV2[] | null>();
  const [renewable, setRenewable] = useState<number | null>(null);
  const [amountOfLoans, setAmountOfLoans] = useState<number>(0);
  const [view, setView] = useState<string>("list");

  useEffect(() => {
    dayjs.extend(localizedFormat);
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    // regex for finding date string from modal query param
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    // modal query param
    const modalString = searchParams.get("modal");

    if (modalString && loans) {
      const found = modalString.toString().match(regex);
      // If there is a date string in the modal query param
      if (found) {
        setDueDateModal(found[0]);
        // THe loans are filtered with said date string
        const loansForModal = loans.filter(
          ({ loanDetails }) => loanDetails.dueDate === dueDateModal
        );
        // Amount of renewable loans are determined, used in the ui
        const amountOfRenewableLoans = loansForModal.filter(
          ({ isRenewable }) => isRenewable
        ).length;

        // Loans for modal (the modal shows loans stacked by due date)
        setLoansModal(loansForModal);
        setRenewable(amountOfRenewableLoans);
      }
    }
  }, [loans, dueDateModal]);

  useEffect(() => {
    getLoansV2().then((value) => {
      if (value) {
        const listOfDueDates = value.map((a) => a.loanDetails.dueDate);
        const uniqeListOfDueDates = Array.from(new Set(listOfDueDates));

        // The due dates are used for the stacked materials
        // The stacked materials view shows materials stacked by
        // due date, and for this we need a uniqe list of due dates
        setDueDates(uniqeListOfDueDates);

        // Loans are sorted by due date
        const sortedByDueDate = value.sort(
          (objA, objB) =>
            new Date(objA.loanDetails.dueDate).getTime() -
            new Date(objB.loanDetails.dueDate).getTime()
        );
        setLoans(sortedByDueDate);
        setAmountOfLoans(sortedByDueDate.length);
      }
    });
  }, []);

  function openModalDueDate(dueDateModalInput: string) {
    if (loans) {
      setDueDateModal(dueDateModalInput);
      setLoansModal(
        loans.filter(
          ({ loanDetails }) => loanDetails.dueDate === dueDateModalInput
        )
      );
    }
  }

  return (
    <div aria-hidden={loansModal !== null ?? true}>
      <h1 className="text-header-h1 m-32">{t("loanListTitleText")}</h1>
      {/* Todo style the below */}
      <h2 className="text-header-h4 m-32">
        {t("loanListPhysicalLoansTitleText")} ({amountOfLoans})
      </h2>
      <button onClick={() => setView("list")} type="button">
        <img src={MenuIcon} alt={t("loanListListText")} />
      </button>
      <button onClick={() => setView("stacked")} type="button">
        <img src={VariousIcon} alt={t("loanListStackText")} />
      </button>
      <button
        type="button"
        aria-describedby={t("loanListRenewMultipleButtonExplanationText")}
        className="btn-primary btn-medium  btn-filled arrow__hover--right-small"
      >
        {t("loanListRenewMultipleButtonText")}
      </button>
      {loans && (
        <div className="list-reservation-container">
          {view === "stacked" &&
            dueDates?.map((uniqueDueDate) => {
              // Stack items:
              // if multiple items have the same due date, they are "stacked"
              // which means styling making it look like there are multiple materials,
              // but only _one_ with said due date is visible.
              const loan = loans.filter(
                ({ loanDetails }) => loanDetails.dueDate === uniqueDueDate
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

export default DemoLoanList;
