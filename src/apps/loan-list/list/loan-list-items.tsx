import React, { FC, useEffect, useState } from "react";
import { removeLoansWithDuplicateDueDate } from "../utils/helpers";
import StackableMaterial from "../materials/stackable-material/stackable-material";
import { ListView } from "../../../core/utils/types/list-view";
import { LoanType } from "../../../core/utils/types/loan-type";
import { getUrlQueryParam } from "../../../core/utils/helpers/url";
import { isDate } from "../../../core/utils/helpers/date";

interface LoanListItemProps {
  loans: LoanType[];
  view: ListView;
  dueDates: string[];
  dueDateLabel: string;
  pageSize: number;
}

const LoanListItems: FC<LoanListItemProps> = ({
  loans,
  view,
  dueDates,
  dueDateLabel,
  pageSize
}) => {
  const [localDueDates, setLocalDueDates] = useState<Array<string | null>>([]);

  useEffect(() => {
    if (view === "stacked") {
      // Publizon material sometimes have due dates that are "null"
      // These should also be displayed stacked
      setLocalDueDates([...dueDates, null]);
    }
  }, [dueDates, view]);

  return (
    <div className="list-reservation-container m-32">
      {view === "stacked" &&
        localDueDates.map((uniqueDueDate: string | null) => {
          // Stack items:
          // if multiple items have the same due date, they are "stacked"
          // which means styling making it look like there are multiple materials,
          // but only _one_ with said due date is visible.
          const loansUniqueDueDate = removeLoansWithDuplicateDueDate(
            uniqueDueDate,
            loans
          );
          const loan = loansUniqueDueDate[0] || {};

          let openModal = false;
          const queryParam = getUrlQueryParam("modal");

          // If there is a query param with the due date, a modal should be opened
          if (queryParam && uniqueDueDate && isDate(queryParam)) {
            openModal = queryParam === uniqueDueDate;
          }

          return (
            <div>
              {loan && (
                <StackableMaterial
                  pageSize={pageSize}
                  dueDateLabel={dueDateLabel}
                  loan={loan}
                  identifier={loan.identifier}
                  faust={loan.faust}
                  openModal={openModal}
                  key={loan.faust || loan.identifier}
                  amountOfMaterialsWithDueDate={loansUniqueDueDate.length}
                  stack={loansUniqueDueDate}
                />
              )}
            </div>
          );
        })}
      {view === "list" &&
        loans.map((loan) => {
          return (
            <StackableMaterial
              pageSize={pageSize}
              openModal={false}
              identifier={loan.identifier}
              faust={loan.faust}
              dueDateLabel={dueDateLabel}
              key={loan.faust || loan.identifier}
              loan={loan}
            />
          );
        })}
    </div>
  );
};

export default LoanListItems;
