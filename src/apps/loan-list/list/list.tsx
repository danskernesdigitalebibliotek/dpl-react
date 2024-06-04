import React, { FC, useEffect, ReactNode, useState } from "react";
import { ListView } from "../../../core/utils/types/list-view";
import { LoanType } from "../../../core/utils/types/loan-type";
import EmptyList from "../../../components/empty-list/empty-list";
import { getListItems } from "../../../core/utils/helpers/general";
import { getStackedItems } from "../utils/helpers";
import LoanListItems from "./loan-list-items";
import usePager from "../../../components/result-pager/use-pager";

export interface ListProps {
  loans: LoanType[];
  dueDates?: string[];
  view: ListView;
  emptyListLabel: string;
  pageSize: number;
  openLoanDetailsModal: (loan: LoanType) => void;
  openDueDateModal: (dueDate: string) => void;
  children?: ReactNode;
}

const List: FC<ListProps> = ({
  loans,
  dueDates,
  view,
  emptyListLabel,
  pageSize,
  openLoanDetailsModal,
  openDueDateModal,
  children
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

  const { itemsShown, PagerComponent, firstInNewPage } = usePager({
    hitcount: loans.length,
    pageSize,
    overrideItemsShown: view === "list" ? undefined : overrideItemsShown
  });

  useEffect(() => {
    if (view === "list") {
      setDisplayedLoans(getListItems(loans, itemsShown) as LoanType[]);
    } else {
      const stackedLoans = getStackedItems(view, loans, itemsShown, dueDates);
      setDisplayedLoans([...stackedLoans]);
    }
  }, [dueDates, loans, itemsShown, view]);

  return (
    <>
      {children}
      {loans.length > 0 && (
        <>
          <LoanListItems
            indexOfFocus={firstInNewPage}
            openLoanDetailsModal={openLoanDetailsModal}
            openDueDateModal={openDueDateModal}
            dueDates={dueDates}
            loans={displayedLoans}
            view={view}
          />
          <PagerComponent />
        </>
      )}
      {loans.length === 0 && (
        <EmptyList classNames="mt-24" emptyListText={emptyListLabel} />
      )}
    </>
  );
};

export default List;
