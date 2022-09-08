import React, { useEffect, useState, FC } from "react";
import { LoanV2 } from "../../../core/fbs/model/loanV2";
import { getStackedItems, getListItems } from "./helpers";
import LoanListItems from "../list/loan-list-items";
import { GetMaterialManifestationQuery } from "../../../core/dbc-gateway/generated/graphql";
import { LoanDetailsV2 } from "../../../core/fbs/model";
import { ListView } from "../../../core/utils/types/list-view";
import usePager from "../../../components/result-pager/use-pager";

interface PaginationProps {
  selectModalMaterial: ({
    material,
    loanDetails
  }: {
    material: GetMaterialManifestationQuery | undefined | null;
    loanDetails: LoanDetailsV2;
  }) => void;
  openModalDueDate: (dueDate: string) => void;
  view: ListView;
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
  const [displayedLoans, setDisplayedLoans] = useState<LoanV2[]>([]);
  // So, this is necessary due to the stacked items
  // Where, in the ui it shows 5 stacked items, and
  // those items accumulated is 34 items - which means
  // even though there are five items, the pagination
  // component should display 34 items.....
  const overrideItemsShown = () => {
    return displayedLoans.length;
  };
  const { itemsShown, PagerComponent } = usePager(hitcount, overrideItemsShown);

  useEffect(() => {
    if (loans) {
      if (view === "list") {
        setDisplayedLoans(getListItems(loans, itemsShown));
      } else {
        const stackedLoans: LoanV2[] = getStackedItems(
          view,
          loans,
          itemsShown,
          dueDates
        );

        setDisplayedLoans([...stackedLoans]);
      }
    }
  }, [dueDates, loans, itemsShown, view]);

  return (
    <>
      <LoanListItems
        dueDates={dueDates}
        loans={displayedLoans}
        view={view}
        openModalDueDate={openModalDueDate}
        selectModalMaterial={selectModalMaterial}
      />
      {PagerComponent}
    </>
  );
};

export default Pagination;
