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

const DemoSearchHeader: React.FC<LoanListProps> = () => {
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
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    const modalString = searchParams.get("modal");
    if (modalString && loans) {
      const found = modalString.toString().match(regex);
      if (found) {
        setDueDateModal(found[0]);
        const loansForModal = loans.filter(
          ({ loanDetails }) => loanDetails.dueDate === dueDateModal
        );
        const amountOfRenewableLoans = loansForModal.filter(
          ({ isRenewable }) => isRenewable
        ).length;
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
        setDueDates(uniqeListOfDueDates);
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

  function selectDueDate(dueDateModalInput: string) {
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
            dueDates &&
            dueDates?.map((uniqueDueDate) => {
              const loan = loans.filter(
                ({ loanDetails }) => loanDetails.dueDate === uniqueDueDate
              );

              const {
                loanDetails: { dueDate, loanDate, recordId }
              } = loan[0];
              return (
                <MaterialDecorator
                  materialType="stackableMaterial"
                  faust={recordId}
                  selectDueDate={() => selectDueDate(dueDate)}
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
                  materialType="stackableMaterial"
                  faust={recordId}
                  dueDate={dueDate}
                  loanDate={loanDate}
                />
              );
            })}
        </div>
      )}
      <Modal modalId={dueDateModal} closeModalAriaLabelText="Todo">
        <div className="modal-loan__header">
          <div className="mr-32">
            <StatusCircle loanDate="04-14-2022" dueDate={dueDateModal} />
          </div>
          <div>
            <h1 className="modal-loan__title text-header-h2">
              {t("loanListToBeDeliveredModalText")}{" "}
              {dayjs(dueDateModal).locale(localeDa).format("DD MMMM YYYY")}
            </h1>
          </div>
        </div>
        <div className="modal-loan__buttons">
          <div className="checkbox">
            <label className="checkbox__label" htmlFor="checkbox-select-all">
              <span className="checkbox__icon">
                <svg width="20px" height="20px">
                  <polyline
                    points="1.5 6 4.5 9 10.5 1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </span>
              <span className="checkbox__text text-small-caption color-secondary-gray">
                {t("loanListSelectPossibleCheckboxText")}
              </span>
              <input
                id="checkbox-select-all"
                className="checkbox__input"
                type="checkbox"
              />
            </label>
          </div>
          <button
            type="button"
            className="btn-primary btn-filled btn-small arrow__hover--right-small"
          >
            {t("loanListRenewPossibleText")} ({renewable})
          </button>
        </div>
        <div className="modal-loan__list">
          <ul className="modal-loan__list-materials">
            {dueDates &&
              loansModal &&
              loansModal.map(({ renewalStatusList, loanDetails }) => {
                return (
                  <MaterialDecorator
                    materialType="selectableMaterial"
                    faust={loanDetails.recordId}
                    dueDate={loanDetails.dueDate}
                    renewableStatus={renewalStatusList}
                    loanType={loanDetails.loanType}
                  />
                );
              })}
          </ul>
        </div>
      </Modal>
    </div>
  );
};

export default DemoSearchHeader;
