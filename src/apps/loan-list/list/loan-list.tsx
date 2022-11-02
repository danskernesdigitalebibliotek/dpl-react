import React, { useEffect, useState, FC } from "react";
import { useSelector } from "react-redux";
import { useGetLoansV2 } from "../../../core/fbs/fbs";
import {
  getDueDatesLoan,
  getModalIds,
  sortByLoanDate
} from "../../../core/utils/helpers/general";
import { getUrlQueryParam } from "../../../core/utils/helpers/url";
import { useText } from "../../../core/utils/text";
import {
  ModalIdsProps,
  useModalButtonHandler
} from "../../../core/utils/modal";
import List from "./list";
import { useGetV1UserLoans } from "../../../core/publizon/publizon";
import { LoanType } from "../../../core/utils/types/loan-type";
import { ListView } from "../../../core/utils/types/list-view";
import EmptyList from "../materials/utils/empty-list";
import {
  mapPublizonLoanToLoanType,
  mapFBSLoanToLoanType
} from "../../../core/utils/helpers/list-mapper";

interface LoanListProps {
  pageSize: number;
}

const LoanList: FC<LoanListProps> = ({ pageSize }) => {
  const { allLoansId } = getModalIds();
  const { open } = useModalButtonHandler();
  const t = useText();
  const { allLoansId } = getModalIds();
  const [view, setView] = useState<string>("list");
  const [physicalLoans, setPhysicalLoans] = useState<LoanType[]>([]);
  const [digitalLoans, setDigitalLoans] = useState<LoanType[]>([]);
  const [physicalLoansDueDates, setPhysicalLoansDueDates] = useState<string[]>(
    []
  );
  const [digitalLoansDueDates, setDigitalLoansDueDates] = useState<string[]>(
    []
  );
  const { isSuccess, data, refetch } = useGetLoansV2();
  const { data: publizonData } = useGetV1UserLoans();
  const { modalIds } = useSelector((s: ModalIdsProps) => s.modal);

  useEffect(() => {
    if (isSuccess && data) {
      const mapToLoanType = mapFBSLoanToLoanType(data);

      // The due dates are used for the stacked materials
      // The stacked materials view shows materials stacked by
      // due date, and for this we need a unique list of due dates
      setPhysicalLoansDueDates(getDueDatesLoan(mapToLoanType));

      // Loans are sorted by loan date
      const sortedByLoanDate = sortByLoanDate(mapToLoanType);

      setPhysicalLoans(sortedByLoanDate);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (publizonData?.loans) {
      const mapToLoanType = mapPublizonLoanToLoanType(publizonData.loans);

      // Loans are sorted by loan date
      const sortedByLoanDate = sortByLoanDate(mapToLoanType);

      setDigitalLoans(sortedByLoanDate);

      // The due dates are used for the stacked materials
      // The stacked materials view shows materials stacked by
      // due date, and for this we need a unique list of due dates
      setDigitalLoansDueDates(getDueDatesLoan(sortedByLoanDate));
    }
  }, [publizonData]);

  useEffect(() => {
    refetch();
  }, [modalIds?.length, refetch]);

  useEffect(() => {
    const modalString = getUrlQueryParam("modal");

    // modal query param: modal loans all
    if (modalString === allLoansId) {
      open(allLoansId);
    }
  }, [physicalLoans, open, allLoansId]);

  return (
    <div className="loan-list-page">
      <h1 className="text-header-h1 my-32">{t("loanListTitleText")}</h1>
      {(physicalLoans.length > 0 || digitalLoans.length > 0) && (
        <>
          {physicalLoans && (
            <List
              pageSize={pageSize}
              emptyListLabel={t("loanListPhysicalLoansEmptyListText")}
              header={t("loanListPhysicalLoansTitleText")}
              dueDateLabel={t("loanListToBeDeliveredText")}
              loans={physicalLoans}
              dueDates={physicalLoansDueDates}
              setView={setView}
              view={view as ListView}
              viewToggleable
            />
          )}
          {digitalLoans && (
            <List
              pageSize={pageSize}
              header={t("loanListDigitalLoansTitleText")}
              emptyListLabel={t("loanListDigitalLoansEmptyListText")}
              dueDateLabel={t("loanListToBeDeliveredDigitalMaterialText")}
              loans={digitalLoans}
              dueDates={digitalLoansDueDates}
              setView={setView}
              view={view as ListView}
              viewToggleable={false}
            />
          )}
        </>
      )}
      {physicalLoans.length === 0 && digitalLoans.length === 0 && (
        <EmptyList
          emptyListText={t("loanListDigitalPhysicalLoansEmptyListText")}
        />
      )}
    </div>
  );
};

export default LoanList;
