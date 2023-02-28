import React, { FC } from "react";
import { removeLoansWithDuplicateDueDate } from "../utils/helpers";
import StackableMaterial from "../materials/stackable-material/stackable-material";
import { ListView } from "../../../core/utils/types/list-view";
import { LoanType } from "../../../core/utils/types/loan-type";
import { useText } from "../../../core/utils/text";

interface LoanListItemProps {
  loans: LoanType[];
  view: ListView;
  dueDates?: string[];
  openLoanDetailsModal: (modalId: string) => void;
  openDueDateModal: (dueDate: string) => void;
}

const LoanListItems: FC<LoanListItemProps> = ({
  loans,
  view,
  dueDates,
  openDueDateModal,
  openLoanDetailsModal
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
          // if multiple items have the same due date, they are a "stack"
          // which means styling making it look like there are multiple materials,
          // but only _one_ with said due date is visible.
          const loansUniqueDueDate = removeLoansWithDuplicateDueDate(
            uniqueDueDate,
            loans
          );
          const loan = loansUniqueDueDate[0] || {};
          return (
            <div>
              {loan && (
                <StackableMaterial
                  openDueDateModal={openDueDateModal}
                  openLoanDetailsModal={openLoanDetailsModal}
                  loan={loan}
                  identifier={loan.identifier}
                  faust={loan.faust}
                  key={loan.faust || loan.identifier}
                  // -1 because it is _additional_ to the one displayed...
                  additionalMaterials={loansUniqueDueDate.length - 1}
                />
              )}
            </div>
          );
        })}
      {view === "list" &&
        loans.map((loan) => {
          return (
            <StackableMaterial
              openLoanDetailsModal={openLoanDetailsModal}
              identifier={loan.identifier}
              faust={loan.faust}
              key={loan.faust || loan.identifier}
              loan={loan}
              // Zero, as it is not stacked
              additionalMaterials={0}
            />
          );
        })}
    </div>
  );
};

export default LoanListItems;
