import React, { useEffect, useState, FC } from "react";
import { getStackedItems, getListItems } from "./helpers";
import LoanListItems from "../list/loan-list-items";
import { ListView } from "../../../core/utils/types/list-view";
import usePager from "../../../components/result-pager/use-pager";
import { LoanType } from "../../../core/utils/types/loan-type";

interface PaginationProps {
  view: ListView;
  dueDates: string[];
  loans: LoanType[];
  dueDateLabel: string;
  pageSize: number;
}

const Pagination: FC<PaginationProps> = ({
  view,
  dueDates,
  loans,
  dueDateLabel,
  pageSize
}) => {
  const [displayedLoans, setDisplayedLoans] = useState<LoanType[]>([]);
  // So, this is necessary due to the stacked items
  // Where, in the ui it shows 5 stacked items, and
  // those items accumulated is 34 items - which means
  // even though there are five items, the pagination
  // component should display 34 items.....
  const overrideItemsShown = () => {
    return displayedLoans.length;
  };

  const { itemsShown, PagerComponent } = usePager(
    loans.length,
    pageSize,
    overrideItemsShown
  );

  useEffect(() => {
    if (loans) {
      if (view === "list") {
        setDisplayedLoans(getListItems(loans, itemsShown));
      } else {
        const stackedLoans = getStackedItems(view, loans, itemsShown, dueDates);
        setDisplayedLoans([...stackedLoans]);
      }
    }
  }, [dueDates, loans, itemsShown, view]);

  return (
    <>
      <LoanListItems
        dueDateLabel={dueDateLabel}
        dueDates={dueDates}
        loans={displayedLoans}
        view={view}
      />
      {PagerComponent}
    </>
  );
};

export default Pagination;
