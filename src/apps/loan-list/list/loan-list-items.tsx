import React, { useState, FC } from "react";
import { LoanV2 } from "../../../core/fbs/model/loanV2";
import { removeLoansWithDuplicateDueDate } from "../helpers";
import { LoanDetailsV2 } from "../../../core/fbs/model";
import StackableMaterial from "../materials/stackable-material";
import { GetMaterialManifestationQuery } from "../../../core/dbc-gateway/generated/graphql";
import { FaustId } from "../../../core/utils/types/ids";

interface LoanListItemProps {
  loans: LoanV2[];
  view: string;
  dueDates: string[];
  selectModalMaterial: ({
    material,
    loanDetails
  }: {
    material: GetMaterialManifestationQuery | undefined | null;
    loanDetails: LoanDetailsV2;
  }) => void;
  openModalDueDate: (dueDate: string) => void;
}

const LoanListItems: FC<LoanListItemProps> = ({
  loans,
  view,
  dueDates,
  openModalDueDate,
  selectModalMaterial
}) => {
  useState<LoanDetailsV2 | null>(null);

  return (
    <div className="list-reservation-container m-32">
      {view === "stacked" &&
        dueDates.map((uniqueDueDate) => {
          // Stack items:
          // if multiple items have the same due date, they are "stacked"
          // which means styling making it look like there are multiple materials,
          // but only _one_ with said due date is visible.
          const loan = removeLoansWithDuplicateDueDate(
            uniqueDueDate,
            loans,
            "loanDetails.dueDate"
          );

          const { loanDetails } = loan[0];

          return (
            <StackableMaterial
              loanDetails={loanDetails}
              key={loanDetails.recordId}
              faust={loanDetails.recordId as FaustId}
              selectDueDate={() => openModalDueDate(loanDetails.dueDate)}
              selectMaterial={selectModalMaterial}
              amountOfMaterialsWithDueDate={loan.length}
            />
          );
        })}
      {view === "list" &&
        loans.map(({ loanDetails }) => {
          return (
            <StackableMaterial
              selectMaterial={selectModalMaterial}
              key={loanDetails.recordId}
              faust={loanDetails.recordId as FaustId}
              loanDetails={loanDetails}
            />
          );
        })}
    </div>
  );
};

export default LoanListItems;
