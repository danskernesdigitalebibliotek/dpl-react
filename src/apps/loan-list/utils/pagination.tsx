import React, { useEffect, useState, FC } from "react";
import { LoanV2 } from "../../../core/fbs/model/loanV2";
import { getStackedItems, getListItems } from "./helpers";
import LoanListItems from "../list/loan-list-items";
import { GetMaterialManifestationQuery } from "../../../core/dbc-gateway/generated/graphql";
import { ListView } from "../../../core/utils/types/list-view";
import usePager from "../../../components/result-pager/use-pager";
import { LoanMetaDataType } from "../../../core/utils/helpers/LoanMetaDataType";

interface PaginationProps {
  selectModalMaterial: ({
    material,
    loanMetaData
  }: {
    material: GetMaterialManifestationQuery | undefined | null;
    loanMetaData: LoanMetaDataType;
  }) => void;
  openModalDueDate: (id: string, dueDate?: string) => void;
  view: ListView;
  hitcount: number;
  dueDates: string[];
  loans?: LoanMetaDataType[];
  dueDateLabel: string;
  emptyListLabel: string;
}

const Pagination: FC<PaginationProps> = ({
  view,
  hitcount,
  dueDates,
  loans,
  openModalDueDate,
  selectModalMaterial,
  dueDateLabel,
  emptyListLabel
}) => {
  const [displayedLoans, setDisplayedLoans] = useState<LoanMetaDataType[]>([]);
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
        const stackedLoans = getStackedItems(view, loans, itemsShown, dueDates);
        setDisplayedLoans([...stackedLoans]);
      }
    }
  }, [dueDates, loans, itemsShown, view]);

  return (
    <>
      {displayedLoans.length > 0 && (
        <>
          <LoanListItems
            dueDateLabel={dueDateLabel}
            dueDates={dueDates}
            loans={displayedLoans}
            view={view}
            openModalDueDate={openModalDueDate}
            selectModalMaterial={selectModalMaterial}
          />
          {PagerComponent}
        </>
      )}
      {displayedLoans.length === 0 && (
        <div className="dpl-list-empty">{emptyListLabel}</div>
      )}
    </>
  );
};

export default Pagination;
