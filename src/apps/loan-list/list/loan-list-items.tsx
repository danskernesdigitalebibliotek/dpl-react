import React, { FC, useEffect, useState } from "react";
import { removeLoansWithDuplicateDueDate } from "../utils/helpers";
import StackableMaterial from "../materials/stackable-material";
import { GetMaterialManifestationQuery } from "../../../core/dbc-gateway/generated/graphql";
import { ListView } from "../../../core/utils/types/list-view";
import { LoanMetaDataType } from "../../../core/utils/helpers/LoanMetaDataType";

interface LoanListItemProps {
  loans: LoanMetaDataType[];
  view: ListView;
  dueDates: string[];
  selectModalMaterial: ({
    material,
    loanMetaData
  }: {
    material: GetMaterialManifestationQuery | undefined | null;
    loanMetaData: LoanMetaDataType;
  }) => void;
  openModalDueDate: (id: string, dueDate?: string) => void;
}

const LoanListItems: FC<LoanListItemProps> = ({
  loans,
  view,
  dueDates,
  openModalDueDate,
  selectModalMaterial
}) => {
  const [localDueDates, setLocalDueDates] = useState<Array<string | null>>([]);

  useEffect(() => {
    if (view === "stacked") {
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
          const loanMetaData = loansUniqueDueDate[0] || {};

          return (
            <div>
              {loanMetaData && (
                <StackableMaterial
                  loanMetaData={loanMetaData}
                  key={loanMetaData.id}
                  selectDueDate={openModalDueDate}
                  selectMaterial={selectModalMaterial}
                  amountOfMaterialsWithDueDate={loansUniqueDueDate.length}
                />
              )}
            </div>
          );
        })}
      {view === "list" &&
        loans.map((loanMetaData) => {
          return (
            <StackableMaterial
              selectMaterial={selectModalMaterial}
              key={loanMetaData.id}
              loanMetaData={loanMetaData}
            />
          );
        })}
    </div>
  );
};

export default LoanListItems;
