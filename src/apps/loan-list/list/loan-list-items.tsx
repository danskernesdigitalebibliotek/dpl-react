import React, { FC, useEffect, useState } from "react";
import { removeLoansWithDuplicateDueDate } from "../utils/helpers";
import StackableMaterial from "../materials/stackable-material/stackable-material";
import { GetMaterialManifestationQuery } from "../../../core/dbc-gateway/generated/graphql";
import { ListView } from "../../../core/utils/types/list-view";
import { LoanMetaDataType } from "../../../core/utils/types/loan-meta-data-type";
import { getUrlQueryParam } from "../../../core/utils/helpers/url";
import { isDate } from "../../../core/utils/helpers/date";

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
  dueDateLabel: string;
}

const LoanListItems: FC<LoanListItemProps> = ({
  loans,
  view,
  dueDates,
  selectModalMaterial,
  dueDateLabel
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
          const loanMetaData = loansUniqueDueDate[0] || {};

          let openModal = false;
          const queryParam = getUrlQueryParam("modal");

          // If there is a query param with the due date, a modal should be opened
          if (queryParam && uniqueDueDate && isDate(queryParam)) {
            openModal = queryParam === uniqueDueDate;
          }

          return (
            <div>
              {loanMetaData && (
                <StackableMaterial
                  dueDateLabel={dueDateLabel}
                  loanMetaData={loanMetaData}
                  openModal={openModal}
                  key={loanMetaData.id}
                  selectMaterial={selectModalMaterial}
                  amountOfMaterialsWithDueDate={loansUniqueDueDate.length}
                  stack={loansUniqueDueDate}
                />
              )}
            </div>
          );
        })}
      {view === "list" &&
        loans.map((loanMetaData) => {
          return (
            <StackableMaterial
              openModal={false}
              dueDateLabel={dueDateLabel}
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
