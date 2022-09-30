import React, { useEffect, useState, FC } from "react";
import { useSelector } from "react-redux";
import { useGetLoansV2 } from "../../../core/fbs/fbs";
import {
  getDueDatesLoan,
  sortByLoanDate
} from "../../../core/utils/helpers/general";
import { useText } from "../../../core/utils/text";
import { ModalIdsProps } from "../../../core/utils/modal";
import { useGetV1UserLoans } from "../../../core/publizon/publizon";
import { LoanMetaDataType } from "../../../core/utils/types/loan-meta-data-type";
import { ListView } from "../../../core/utils/types/list-view";
import { MetaDataType } from "../../../core/utils/types/meta-data-type";
import {
  mapFBSLoanToLoanMetaDataType,
  mapPublizonLoanToLoanMetaDataType
} from "../../../core/utils/helpers/mapper";
import EmptyList from "../materials/utils/empty-list";
import List from "./list";

const LoanList: FC = () => {
  const t = useText();
  const [view, setView] = useState<string>("list");
  const [physicalLoans, setPhysicalLoans] = useState<
    MetaDataType<LoanMetaDataType>[]
  >([]);
  const [digitalLoans, setDigitalLoans] = useState<
    MetaDataType<LoanMetaDataType>[]
  >([]);
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
      const mapToLoanMetaDataType = mapFBSLoanToLoanMetaDataType(data);

      // The due dates are used for the stacked materials
      // The stacked materials view shows materials stacked by
      // due date, and for this we need a unique list of due dates
      setPhysicalLoansDueDates(getDueDatesLoan(mapToLoanMetaDataType));

      // Loans are sorted by loan date
      const sortedByLoanDate = sortByLoanDate(mapToLoanMetaDataType);

      setPhysicalLoans(sortedByLoanDate);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (publizonData?.loans) {
      const mapToLoanMetaDataType = mapPublizonLoanToLoanMetaDataType(
        publizonData.loans
      );

      // Loans are sorted by loan date
      const sortedByLoanDate = sortByLoanDate(mapToLoanMetaDataType);

      setDigitalLoans(sortedByLoanDate);

      // The due dates are used for the stacked materials
      // The stacked materials view shows materials stacked by
      // due date, and for this we need a unique list of due dates
      setDigitalLoansDueDates(getDueDatesLoan(sortedByLoanDate));
    }
  }, [publizonData]);

  useEffect(() => {
    if (modalIds.length === 0) {
      refetch();
    }
  }, [modalIds?.length, refetch]);

  return (
    <div className="loan-list-page">
      <h1 className="text-header-h1 my-32">{t("loanListTitleText")}</h1>
      {(physicalLoans.length > 0 || digitalLoans.length > 0) && (
        <>
          {physicalLoans && (
            <List
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
