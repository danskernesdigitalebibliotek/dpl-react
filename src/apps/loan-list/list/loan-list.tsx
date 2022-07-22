import React, { useEffect, useState, useCallback, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import MenuIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Menu.svg";
import VariousIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Various.svg";
import { useGetLoansV2 } from "../../../core/fbs/fbs";
import { GetMaterialManifestationQuery } from "../../../core/dbc-gateway/generated/graphql";
import { openModal } from "../../../core/modal.slice";
import {
  dateMatchesUsFormat,
  getUrlQueryParam
} from "../../../core/utils/helpers";
import { LoanV2 } from "../../../core/fbs/model/loanV2";
import { useText } from "../../../core/utils/text";
import DueDateLoansModal from "../modal/due-date-loans-modal";
import {
  removeLoansWithDuplicateDueDate,
  getAmountOfRenewableLoans,
  queryMatchesFaust
} from "../helpers";
import { ModalIdsProps } from "../../../core/utils/modal";
import MaterialDetailsModal from "../modal/material-details-modal";
import { LoanDetailsV2 } from "../../../core/fbs/model";
import RenewLoansModal from "../modal/renew-loans-modal";
import LoanListItems from "./loan-list-items";

export interface ModalMaterialType {
  materialItemNumber: number;
  mainText: string;
  pid: string;
  faust: string;
  specific: string;
  creators: string;
}
export interface LoanDetailsType {
  dueDate: string;
  loanId: string;
  loanDate: string;
}

const LoanList: FC = () => {
  const dispatch = useDispatch();
  const t = useText();
  const [loans, setLoans] = useState<LoanV2[]>();
  const [dueDates, setDueDates] = useState<string[]>([]);
  const [modalMaterial, setModalMaterial] = useState<
    GetMaterialManifestationQuery | null | undefined
  >(null);
  const [modalLoanDetails, setModalLoanDetails] =
    useState<LoanDetailsV2 | null>(null);
  const [dueDateModal, setDueDateModal] = useState<string>("");
  const [loansModal, setLoansModal] = useState<LoanV2[] | null>();
  const [displayList, setDisplayList] = useState<boolean>(false);
  const [renewable, setRenewable] = useState<number | null>(null);
  const [amountOfLoans, setAmountOfLoans] = useState<number>(0);
  const [view, setView] = useState<string>("list");
  const { isSuccess, data, refetch } = useGetLoansV2();
  const { modalIds } = useSelector((s: ModalIdsProps) => s.modal);

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

  const selectModalMaterial = ({
    material,
    loanDetails
  }: {
    material: GetMaterialManifestationQuery | undefined | null;
    loanDetails: LoanDetailsV2;
  }) => {
    setModalMaterial(material);
    setModalLoanDetails(loanDetails);
  };

  useEffect(() => {
    setDisplayList(true);
    if (modalIds.length > 0) {
      refetch();
      setDisplayList(true);
    }
  }, [modalIds?.length, refetch]);

  const openModalDueDate = useCallback(
    (dueDateModalInput?: string) => {
      if (loans && dueDateModalInput) {
        setDueDateModal(dueDateModalInput);
        // The loans are filtered with said date string
        const loansForModal = removeLoansWithDuplicateDueDate(
          dueDateModalInput,
          loans,
          "loanDetails.dueDate"
        );

        // Amount of renewable loans are determined, used in the ui
        const amountOfRenewableLoans = getAmountOfRenewableLoans(loansForModal);

        // Loans for modal (the modal shows loans stacked by due date)
        setLoansModal(loansForModal);
        setRenewable(amountOfRenewableLoans);
      }
    },
    [loans]
  );

  const openRenewLoansModal = useCallback(() => {
    if (loans) {
      const amountOfRenewableLoans = getAmountOfRenewableLoans(loans);

      // Loans for modal (the modal shows loans stacked by due date)
      setLoansModal(loans);
      setRenewable(amountOfRenewableLoans);
    }
  }, [loans]);

  useEffect(() => {
    const modalString = getUrlQueryParam("modal");

    // modal query param: due date modal date
    const dateFound = dateMatchesUsFormat(modalString);
    if (modalString && loans && dateFound) {
      openModalDueDate(dateFound);
      return;
    }

    // modal query param: details modal faust
    const faustFound = queryMatchesFaust(modalString);

    if (modalString && faustFound && loans) {
      const loanDetailsForModal = loans.filter(
        ({ loanDetails }) => loanDetails.recordId === faustFound
      );
      setModalLoanDetails(loanDetailsForModal[0].loanDetails);
      dispatch(openModal({ modalId: faustFound }));
      return;
    }
    // modal query param: modal loans all
    if (modalString === "all") {
      dispatch(openModal({ modalId: "all" }));
    }
  }, [loans, openModalDueDate, dispatch]);

  return (
    <>
      {displayList && (
        <>
          <h1 className="text-header-h1 m-32">{t("loanListTitleText")}</h1>
          <div className="dpl-list-buttons m-32">
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
                  id="test-stack"
                  onClick={() => setView("stacked")}
                  type="button"
                >
                  <img src={VariousIcon} alt={t("loanListStackText")} />
                </button>
              </div>
              <div className="dpl-list-buttons__buttons__button">
                <button
                  type="button"
                  onClick={() => {
                    openRenewLoansModal();
                    dispatch(openModal({ modalId: "all" }));
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
          </div>
          {loans && (
            <LoanListItems
              dueDates={dueDates}
              loans={loans}
              view={view}
              openModalDueDate={openModalDueDate}
              selectModalMaterial={selectModalMaterial}
            />
          )}
        </>
      )}
      {modalLoanDetails && (
        <MaterialDetailsModal
          loanDetails={modalLoanDetails}
          material={modalMaterial}
        />
      )}
      <DueDateLoansModal
        dueDate={dueDateModal}
        renewable={renewable}
        loansModal={loansModal}
      />
      <RenewLoansModal renewable={renewable} loansModal={loans} />
    </>
  );
};

export default LoanList;
