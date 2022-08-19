import React, { FC, useState, useEffect } from "react";
import { LoanV2 } from "../../../../core/fbs/model/loanV2";
import { LoanDetailsV2 } from "../../../../core/fbs/model";
import { GetMaterialManifestationQuery } from "../../../../core/dbc-gateway/generated/graphql";
import LoanListItems from "../../list/loan-list-items";
import ResultPager from "../../../../components/result-pager/result-pager";

interface PaginationProps {
  loans: LoanV2[];
  duplicateDueDates: string[];
  selectModalMaterial: ({
    material,
    loanDetails
  }: {
    material: GetMaterialManifestationQuery | undefined | null;
    loanDetails: LoanDetailsV2;
  }) => void;
  openModalDueDate: (dueDate: string) => void;
  pageSize: number;
  allLoansLength: number;
}

const Pagination: FC<PaginationProps> = ({
  allLoansLength,
  loans,
  duplicateDueDates,
  openModalDueDate,
  selectModalMaterial,
  pageSize
}) => {
  const [displayedItems, setDisplayedItems] = useState<LoanV2[]>(
    [...loans].splice(0, pageSize)
  );
  const [allLoans] = useState<LoanV2[]>(loans);
  const [page, setPage] = useState(0);
  const [searchItemsShown, setSearchItemsShown] = useState(pageSize);

  useEffect(() => {
    setDisplayedItems([...allLoans].splice(0, searchItemsShown));
  }, [searchItemsShown, allLoans]);

  const setPageHandler = () => {
    const currentPage = page + 1;
    setPage(currentPage);
    if ((currentPage + 1) * pageSize >= allLoansLength) {
      setSearchItemsShown(allLoansLength);
      return;
    }
    setSearchItemsShown((currentPage + 1) * pageSize);
  };

  return (
    <>
      <LoanListItems
        duplicateDueDates={duplicateDueDates}
        loans={displayedItems}
        openModalDueDate={openModalDueDate}
        selectModalMaterial={selectModalMaterial}
      />
      <ResultPager
        searchItemsShown={searchItemsShown}
        hitcount={allLoansLength}
        setPageHandler={setPageHandler}
      />
    </>
  );
};

export default Pagination;
