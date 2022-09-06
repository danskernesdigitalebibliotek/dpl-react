import React, { useEffect, useState, FC } from "react";
import { LoanV2 } from "../../../core/fbs/model/loanV2";
import { getStackedSearchItems, getListItems } from "./helpers";
import ResultPager from "../../../components/result-pager/result-pager";
import { pageSize } from "../../../core/configuration/pagesize.json";
import LoanListItems from "../list/loan-list-items";
import { GetMaterialManifestationQuery } from "../../../core/dbc-gateway/generated/graphql";
import { LoanDetailsV2 } from "../../../core/fbs/model";

interface PaginationProps {
  selectModalMaterial: ({
    material,
    loanDetails
  }: {
    material: GetMaterialManifestationQuery | undefined | null;
    loanDetails: LoanDetailsV2;
  }) => void;
  openModalDueDate: (dueDate: string) => void;
  view: string;
  hitcount: number;
  dueDates: string[];
  loans: LoanV2[];
}

const Pagination: FC<PaginationProps> = ({
  view,
  hitcount,
  dueDates,
  loans,
  openModalDueDate,
  selectModalMaterial
}) => {
  const [itemsShown, setitemsShown] = useState(pageSize);
  const [displayedLoans, setDisplayedLoans] = useState<LoanV2[]>();
  const [page, setPage] = useState<number>(0);

  const setPageHandler = () => {
    if (loans) {
      const currentPage = page + 1;
      const itemsOnPage = (currentPage + 1) * pageSize;
      setPage(currentPage);
      setitemsShown(itemsOnPage);
    }
  };

  useEffect(() => {
    if (loans) {
      if (view === "list") {
        setDisplayedLoans(getListItems(loans, itemsShown));
      } else {
        const stackedLoans: LoanV2[] = getStackedSearchItems(
          view,
          loans,
          itemsShown,
          dueDates
        );

        setDisplayedLoans([...stackedLoans]);
      }
    }
  }, [dueDates, loans, itemsShown, view]);

  useEffect(() => {
    // When view is changed (from list to stacks or stacks to list)
    // The items shown are reset to pagesize from config
    setitemsShown(pageSize);
  }, [view]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {displayedLoans && (
        <>
          <LoanListItems
            dueDates={dueDates}
            loans={displayedLoans}
            view={view}
            openModalDueDate={openModalDueDate}
            selectModalMaterial={selectModalMaterial}
          />
          <ResultPager
            itemsShown={displayedLoans.length}
            hitcount={hitcount}
            setPageHandler={setPageHandler}
          />
        </>
      )}
    </>
  );
};

export default Pagination;
