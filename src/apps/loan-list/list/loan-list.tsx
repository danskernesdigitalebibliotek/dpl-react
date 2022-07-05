import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import localeDa from "dayjs/locale/da";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { getLoansV2 } from "../../../core/fbs/fbs";
import { LoanV2 } from "../../../core/fbs/model/loanV2";
import Modal from "../../../core/utils/modal";
import StatusCircle from "../materials/utils/status-circle";
import MaterialDecorator from "./../materials/material-decorator";

interface LoanListProps {}

const DemoSearchHeader: React.FC<LoanListProps> = ({}) => {
  const [loans, setLoans] = useState<LoanV2[] | null>([]);
  const [dueDates, setDueDates] = useState<string[]>();
  const [dueDateModal, setDueDateModal] = useState<string>("");
  const [loansModal, setLoansModal] = useState<LoanV2[] | null>();
  const [renewable, setRenewable] = useState<LoanV2[] | null>();

  useEffect(() => {
    dayjs.extend(localizedFormat);
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    const found = searchParams.get("modal").toString().match(regex);
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
  }, [loans]);

  useEffect(() => {
    getLoansV2().then((value) => {
      if (value) {
        const listOfDueDates = value.map((a) => a.loanDetails.dueDate);
        const uniqeListOfDueDates = Array.from(new Set(listOfDueDates));
        setDueDates(uniqeListOfDueDates);
        setLoans(value);
      }
    });
  }, []);

  function selectDueDate(dueDateModal) {
    setDueDateModal(dueDateModal);
    setLoansModal(
      loans.filter(({ loanDetails }) => loanDetails.dueDate === dueDateModal)
    );
  }

  return (
    <>
      <h1 className="text-header-h1 m-32" aria-hidden={loansModal}>
        Dine lånte materialer
      </h1>
      <div className="list-reservation-container">
        {dueDates &&
          loans &&
          dueDates.map((uniqueDueDate) => {
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
      </div>
      <Modal modalId={dueDateModal} closeModalAriaLabelText="Todo">
        <div className="modal-loan__header">
          <div className="mr-32">
            <StatusCircle loanDate="04-14-2022" dueDate={dueDateModal} />
          </div>
          <div>
            <h1 className="modal-loan__title text-header-h2">
              Afleveres{" "}
              {dayjs(dueDateModal).locale(localeDa).format("DD MMMM YYYY")}
            </h1>
          </div>
        </div>
        <div className="modal-loan__buttons">
          <div className="checkbox">
            <input
              id="checkbox-select-all"
              className="checkbox__input"
              type="checkbox"
            />
            <label className="checkbox__label" for="checkbox-select-all">
              <span className="checkbox__icon">
                <svg width="20px" height="20px">
                  <polyline
                    points="1.5 6 4.5 9 10.5 1"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  ></polyline>
                </svg>
              </span>
              <span className="checkbox__text text-small-caption color-secondary-gray">
                Vælg alle med mulighed for fornyelse
              </span>
            </label>
          </div>
          <button
            type="button"
            className="btn-primary btn-filled btn-small arrow__hover--right-small"
          >
            Forny mulige ({renewable})
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
    </>
  );
};

export default DemoSearchHeader;
