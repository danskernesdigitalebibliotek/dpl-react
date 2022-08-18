import React, { useState, FC } from "react";
import { LoanV2 } from "../../../core/fbs/model/loanV2";
import { LoanDetailsV2 } from "../../../core/fbs/model";
import StackableMaterial from "../materials/stackable-material";
import { GetMaterialManifestationQuery } from "../../../core/dbc-gateway/generated/graphql";
import { FaustId } from "../../../core/utils/types/ids";

interface LoanListItemProps {
  loans: LoanV2[];
  duplicateDueDates: string[];
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
  duplicateDueDates,
  openModalDueDate,
  selectModalMaterial
}) => {
  useState<LoanDetailsV2 | null>(null);

  return (
    <div className="list-reservation-container m-32">
      {loans.map(({ loanDetails }) => {
        return (
          <StackableMaterial
            amountOfMaterialsWithDueDate={
              duplicateDueDates.filter(
                (dueDateArray) => dueDateArray === loanDetails.dueDate
              ).length
            }
            selectMaterial={selectModalMaterial}
            key={loanDetails.recordId}
            selectDueDate={() => openModalDueDate(loanDetails.dueDate)}
            faust={loanDetails.recordId as FaustId}
            loanDetails={loanDetails}
          />
        );
      })}
    </div>
  );
};

export default LoanListItems;
