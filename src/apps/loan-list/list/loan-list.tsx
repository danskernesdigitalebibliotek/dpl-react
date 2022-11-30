import React, { useEffect, useState, FC, useCallback } from "react";
import { useGetLoansV2 } from "../../../core/fbs/fbs";
import {
  getAmountOfRenewableLoans,
  getDueDatesLoan,
  getModalIds,
  sortByLoanDate
} from "../../../core/utils/helpers/general";
import { getUrlQueryParam } from "../../../core/utils/helpers/url";
import { useText } from "../../../core/utils/text";
import { useModalButtonHandler } from "../../../core/utils/modal";
import List from "./list";
import { useGetV1UserLoans } from "../../../core/publizon/publizon";
import { LoanType } from "../../../core/utils/types/loan-type";
import { ListView } from "../../../core/utils/types/list-view";
import EmptyList from "../../../components/empty-list/empty-list";
import {
  mapPublizonLoanToLoanType,
  mapFBSLoanToLoanType
} from "../../../core/utils/helpers/list-mapper";
import ToggleListViewButtons from "./ToggleListViewButtons";
import ListHeader from "./ListHeader";

interface LoanListProps {
  pageSize: number;
}

const LoanList: FC<LoanListProps> = ({ pageSize }) => {
  const { allLoansId } = getModalIds();
  const { open } = useModalButtonHandler();
  const t = useText();
  const [view, setView] = useState<ListView>("list");
  const [physicalLoans, setPhysicalLoans] = useState<LoanType[]>(null);
  const [digitalLoans, setDigitalLoans] = useState<LoanType[]>(null);
  const [physicalLoansDueDates, setPhysicalLoansDueDates] = useState<string[]>(
    []
  );
  const { isSuccess, data } = useGetLoansV2();
  const { data: publizonData } = useGetV1UserLoans();

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
    }
  }, [publizonData]);

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
      {(physicalLoans?.length > 0 || digitalLoans?.length > 0) && (
        <>
          {physicalLoans && (
            <List
              pageSize={pageSize}
              emptyListLabel={t("loanListPhysicalLoansEmptyListText")}
              loans={physicalLoans}
              dueDates={physicalLoansDueDates}
              view={view}
            >
              <ListHeader
                header={t("loanListPhysicalLoansTitleText")}
                amount={physicalLoans.length}
              >
                <ToggleListViewButtons
                  disableRenewLoansButton={
                    getAmountOfRenewableLoans(physicalLoans) === 0
                  }
                  view={view}
                  setView={setView}
                  loans={physicalLoans}
                  pageSize={pageSize}
                />
              </ListHeader>
            </List>
          )}
          {digitalLoans && (
            <List
              pageSize={pageSize}
              emptyListLabel={t("loanListDigitalLoansEmptyListText")}
              loans={digitalLoans}
              view="list"
            >
              <ListHeader
                header={t("loanListDigitalLoansTitleText")}
                amount={digitalLoans.length}
              />
            </List>
          )}
        </>
      )}
      {physicalLoans?.length === 0 && digitalLoans?.length === 0 && (
        <EmptyList
          emptyListText={t("loanListDigitalPhysicalLoansEmptyListText")}
        />
      )}
    </div>
  );
};

export default LoanList;
