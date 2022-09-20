import React, { useEffect, useState, FC } from "react";
import { getStackedItems, getListItems } from "./helpers";
import LoanListItems from "../list/loan-list-items";
import { GetMaterialManifestationQuery } from "../../../core/dbc-gateway/generated/graphql";
import { ListView } from "../../../core/utils/types/list-view";
import usePager from "../../../components/result-pager/use-pager";
import { getPageSizeFromConfiguration } from "../../../core/utils/helpers/general";
import { LoanMetaDataType } from "../../../core/utils/types/loan-meta-data-type";
import { MetaDataType } from "../../../core/utils/types/meta-data-type";

interface PaginationProps {
  selectModalMaterial: ({
    material,
    loanMetaData
  }: {
    material: GetMaterialManifestationQuery | undefined | null;
    loanMetaData: MetaDataType<LoanMetaDataType>;
  }) => void;
  view: ListView;
  dueDates: string[];
  loans: MetaDataType<LoanMetaDataType>[];
  dueDateLabel: string;
}

const Pagination: FC<PaginationProps> = ({
  view,
  dueDates,
  loans,
  selectModalMaterial,
  dueDateLabel
}) => {
  const [displayedLoans, setDisplayedLoans] = useState<
    MetaDataType<LoanMetaDataType>[]
  >([]);
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
    getPageSizeFromConfiguration("pageSizeLoanList"),
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
        selectModalMaterial={selectModalMaterial}
      />
      {PagerComponent}
    </>
  );
};

export default Pagination;
