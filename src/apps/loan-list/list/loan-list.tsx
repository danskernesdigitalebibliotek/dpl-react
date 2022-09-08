import React, { useEffect, useState, useCallback, FC } from "react";
import { useSelector } from "react-redux";
import { useGetLoansV2 } from "../../../core/fbs/fbs";
import { GetMaterialManifestationQuery } from "../../../core/dbc-gateway/generated/graphql";
import dateMatchesUsFormat from "../../../core/utils/helpers/date";
import {
  getAmountOfRenewableLoans,
  isAModalDisplayed,
  getDueDatesLoan,
  sortByLoanDate,
  getDueDatesForModal
} from "../../../core/utils/helpers/general";
import { getUrlQueryParam } from "../../../core/utils/helpers/url";
import { useText } from "../../../core/utils/text";
import DueDateLoansModal from "../modal/due-date-loans-modal";
import {
  ModalIdsProps,
  useModalButtonHandler
} from "../../../core/utils/modal";
import MaterialDetailsModal from "../modal/material-details-modal";
import RenewLoansModal from "../modal/renew-loans-modal";
import modalIdsConf from "../../../core/configuration/modal-ids.json";
import List from "./list";
import { useGetV1UserLoans } from "../../../core/publizon/publizon";
import { LoanMetaDataType } from "../../../core/utils/helpers/LoanMetaDataType";
import { ListView } from "../../../core/utils/types/list-view";

const LoanList: FC = () => {
  const { open } = useModalButtonHandler();
  const t = useText();
  const [view, setView] = useState<string>("list");
  const [physicalLoans, setPhysicalLoans] = useState<LoanMetaDataType[]>();
  const [allPhysicalLoans, setAllPhysicalLoans] = useState<LoanMetaDataType[]>(
    []
  );
  const [digitalLoans, setDigitalLoans] = useState<LoanMetaDataType[]>();
  const [allDigitalLoans, setAllDigitalLoans] = useState<LoanMetaDataType[]>(
    []
  );
  const [physicalLoansDueDates, setPhysicalLoansDueDates] = useState<string[]>(
    []
  );
  const [digitalLoansDueDates, setDigitalLoansDueDates] = useState<string[]>(
    []
  );
  const [modalMaterial, setModalMaterial] = useState<
    GetMaterialManifestationQuery | null | undefined
  >(null);
  const [modalLoanDetails, setModalLoanDetails] =
    useState<LoanMetaDataType | null>(null);
  const [dueDateModal, setDueDateModal] = useState<string>("");
  const [loansModal, setLoansModal] = useState<LoanMetaDataType[]>();
  const [displayList, setDisplayList] = useState<boolean>(false);
  const [renewable, setRenewable] = useState<number | null>(null);
  const { isSuccess, data, refetch } = useGetLoansV2();
  const { data: publizonData } = useGetV1UserLoans();
  const { modalIds } = useSelector((s: ModalIdsProps) => s.modal);

  const updateRenewable = (materials: LoanMetaDataType[]) => {
    // Amount of renewable loans are determined, used in the ui
    const amountOfRenewableLoans = getAmountOfRenewableLoans(materials);
    setRenewable(amountOfRenewableLoans);
  };

  useEffect(() => {
    if (isSuccess && data) {
      const mapToLoanMetaDataType = mapLoanPBSToLoanMetaDataType(data);
      setAllPhysicalLoans(mapToLoanMetaDataType);

      // The due dates are used for the stacked materials
      // The stacked materials view shows materials stacked by
      // due date, and for this we need a unique list of due dates
      setPhysicalLoansDueDates(getDueDatesLoan(mapToLoanMetaDataType));

      // Loans are sorted by loan date
      const sortedByLoanDate = sortByLoanDate(mapToLoanMetaDataType);

      setPhysicalLoans(sortedByLoanDate);
      updateRenewable(sortedByLoanDate);
      setDisplayedLoans([...sortedByLoanDate].splice(0, searchItemsShown));
    }
  }, [isSuccess, data, searchItemsShown]);

  useEffect(() => {
    if (publizonData?.loans) {
      const mapToLoanMetaDataType = mapLoanPublizonToLoanMetaDataType(
        publizonData.loans
      );
      setAllDigitalLoans(mapToLoanMetaDataType);

      // Loans are sorted by loan date
      const sortedByLoanDate = sortByLoanDate(mapToLoanMetaDataType);

      setDigitalLoans(sortedByLoanDate);

      // The due dates are used for the stacked materials
      // The stacked materials view shows materials stacked by
      // due date, and for this we need a unique list of due dates
      setDigitalLoansDueDates(getDueDatesLoan(sortedByLoanDate));
    }
  }, [publizonData]);

  const selectModalMaterial = ({
    material,
    loanMetaData
  }: {
    material: GetMaterialManifestationQuery | undefined | null;
    loanMetaData: LoanMetaDataType;
  }) => {
    setModalMaterial(material);
    setModalLoanDetails(loanMetaData);
  };

  useEffect(() => {
    setDisplayList(true);
    if (isAModalDisplayed(modalIds)) {
      refetch();
      setDisplayList(true);
    }
  }, [modalIds, modalIds?.length, refetch]);

  const openModalDueDate = useCallback(
    (id: string, dueDateModalInput?: string) => {
      if (dueDateModalInput) {
        const isClickedLoanPhysical = physicalLoans?.find(
          (loan) => loan.id === id
        );
        const isClickedLoanDigital = digitalLoans?.find(
          (loan) => loan.id === id
        );
        setDueDateModal(dueDateModalInput);

        if (physicalLoans && isClickedLoanPhysical) {
          // The loans are filtered with said date string
          const loansForModal = getDueDatesForModal(
            physicalLoans,
            dueDateModalInput
          );

          // Amount of renewable loans are determined, used in the ui
          const amountOfRenewableLoans =
            getAmountOfRenewableLoans(loansForModal);

          // Loans for modal (the modal shows loans stacked by due date)
          setLoansModal(loansForModal);
          setRenewable(amountOfRenewableLoans);
        } else if (digitalLoans && isClickedLoanDigital) {
          setRenewable(0);
          // The loans are filtered with said date string
          const loansForModal = getDueDatesForModal(
            digitalLoans,
            dueDateModalInput
          );
          // Loans for modal (the modal shows loans stacked by due date)
          setLoansModal(loansForModal);
        }
      }
    },
    [digitalLoans, physicalLoans]
  );

  const openRenewLoansModal = useCallback(() => {
    if (physicalLoans) {
      const amountOfRenewableLoans = getAmountOfRenewableLoans(physicalLoans);

      // Loans for modal (the modal shows loans stacked by due date)
      setLoansModal(physicalLoans);
      setRenewable(amountOfRenewableLoans);
      open(modalIdsConf.allLoansId);
    }
  }, [physicalLoans]);

  useEffect(() => {
    const modalString = getUrlQueryParam("modal");

    // modal query param: due date modal date
    const dateFound = dateMatchesUsFormat(modalString);
    if (modalString && physicalLoans && dateFound) {
      openModalDueDate(dateFound);
      return;
    }

    // modal query param: details modal faust
    const faustFound = queryMatchesFaust(modalString);

    if (modalString && faustFound && physicalLoans) {
      const loanDetailsForModal = physicalLoans.filter(
        ({ id }) => id === faustFound
      );
      setModalLoanDetails(loanDetailsForModal[0]);
      modalButtonHandler(faustFound);
      return;
    }
    // modal query param: modal loans all
    if (modalString === modalIdsConf.allLoansId) {
      open(modalIdsConf.allLoansId);
    }
  }, [physicalLoans, openModalDueDate]);

  useEffect(() => {
    if (loans) {
      if (view === "list") {
        setDisplayedLoans(getSearchItems(loans, searchItemsShown));
      } else {
        const stackedLoans: LoanV2[] = getStackedSearchItems(
          view,
          loans,
          searchItemsShown,
          dueDates
        );

        setDisplayedLoans([...stackedLoans]);
      }
    }
  }, [dueDates, loans, searchItemsShown, view]);

  useEffect(() => {
    // When view is changed (from list to stacks or stacks to list)
    // The items shown are reset to pagesize from config
    setSearchItemsShown(pageSize);
  }, [view]);

  return (
    <>
      {/* only display the list when a modal is not open. this is to do with accessibility,
      so the screen reader does not focus on focusable inputs in the list while a modal is open. */}
      <h1 className="text-header-h1 m-32">{t("loanListTitleText")}</h1>
      {displayList && (
        <>
          {physicalLoans && (
            <List
              header={t("loanListPhysicalLoansTitleText")}
              openRenewLoansModal={openRenewLoansModal}
              openModalDueDate={openModalDueDate}
              selectModalMaterial={selectModalMaterial}
              loans={physicalLoans}
              dueDates={physicalLoansDueDates}
              allLoansLength={allPhysicalLoans.length}
              setView={setView}
              view={view as ListView}
              dueDateLabel={t("LoanListToBeDeliveredText")}
            />
          )}
          {digitalLoans && (
            <List
              header={t("loanListDigitalLoansTitleText")}
              openRenewLoansModal={openRenewLoansModal}
              openModalDueDate={openModalDueDate}
              selectModalMaterial={selectModalMaterial}
              loans={digitalLoans}
              dueDates={digitalLoansDueDates}
              allLoansLength={allDigitalLoans.length}
              view={view as ListView}
              dueDateLabel={t("loanListToBeDeliveredDigitalMaterialText")}
            />
          )}
        </>
      )}
      {modalLoanDetails && (
        <MaterialDetailsModal
          loanMetaData={modalLoanDetails}
          material={modalMaterial}
        />
      )}
      {loansModal && (
        <DueDateLoansModal
          dueDate={dueDateModal}
          renewable={renewable}
          loansModal={loansModal}
        />
      )}
      {physicalLoans && (
        <RenewLoansModal renewable={renewable} loansModal={physicalLoans} />
      )}
    </>
  );
};

export default LoanList;
