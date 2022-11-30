import React, { FC } from "react";
import { removeLoansWithDuplicateDueDate } from "../utils/helpers";
import StackableMaterial from "../materials/stackable-material/stackable-material";
import { ListView } from "../../../core/utils/types/list-view";
import { LoanType } from "../../../core/utils/types/loan-type";
import { getUrlQueryParam } from "../../../core/utils/helpers/url";
import { isDate } from "../../../core/utils/helpers/date";
import { useText } from "../../../core/utils/text";

interface LoanListItemProps {
  loans: LoanType[];
  view: ListView;
  dueDates?: string[];
  pageSize: number;
}

const LoanListItems: FC<LoanListItemProps> = ({
  loans,
  view,
  dueDates,
  pageSize
}) => {
  const t = useText();

  return (
    // explanation for screen readers used in additional-materials-button
    // It is located here to avoid duplicate ids in the dom
    <div className="list-reservation-container my-32">
      <div
        className="list-reservation__hidden-explanation"
        id="materials-modal-text"
      >
        {t("loanListDueDateModalAriaLabelText")}
      </div>
      {view === "stack" &&
        dueDates &&
        dueDates.map((uniqueDueDate: string) => {
          // Stack items:
          // if multiple items have the same due date, they are "stack"
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
              key={loan.faust || loan.identifier}
              loan={loan}
            />
          );
        })}
    </div>
  );
};

export default LoanListItems;
