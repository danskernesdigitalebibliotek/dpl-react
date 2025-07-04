import React, { FC } from "react";
import clsx from "clsx";
import MaterialOverdueLink from "./material-overdue-link";
import AdditionalMaterialsButton from "./additional-materials-button";
import MaterialInfo from "./material-info";
import fetchMaterial, { MaterialProps } from "../utils/material-fetch-hoc";
import { LoanType } from "../../../../core/utils/types/loan-type";
import fetchDigitalMaterial from "../utils/digital-material-fetch-hoc";
import MaterialStatus from "./material-status";
import { LoanId } from "../../../../core/utils/types/ids";
import ListMaterialSkeleton from "../../../reservation-list/reservation-material/list-material-skeleton";

export interface StackableMaterialProps {
  loan: LoanType;
  additionalMaterials: number;
  openLoanDetailsModal: (loan: LoanType) => void;
  openDueDateModal?: (dueDate: string) => void;
  focused: boolean;
  loanId?: LoanId | null;
}

const StackableMaterial: FC<StackableMaterialProps & MaterialProps> = ({
  additionalMaterials,
  material,
  loan,
  openDueDateModal,
  openLoanDetailsModal,
  focused,
  loanId
}) => {
  const { dueDate, identifier, periodical } = loan;

  const handleOpenDueDateModal = () => {
    if (openDueDateModal && dueDate) {
      openDueDateModal(dueDate);
      return;
    }
    openLoanDetailsModal(loan);
  };

  return (
    <div
      className={clsx(
        "list-reservation my-32 cursor-pointer arrow__hover--right-small",
        {
          "list-reservation--stacked": additionalMaterials > 0
        }
      )}
      role="button"
      onMouseUp={handleOpenDueDateModal}
      onKeyUp={(e) => {
        // `!focused` prevents opening material details modal after clicking
        // enter on pager. Pager gives focus to the next stackable material too
        // quickly while still registering the enter key press.
        if ((e.key === "Enter" || e.key === " ") && !focused) {
          handleOpenDueDateModal();
        }
      }}
      tabIndex={0}
    >
      {material && (
        <MaterialInfo
          arrowLabelledBy={`${loanId || identifier}-title`}
          openDetailsModal={handleOpenDueDateModal}
          periodical={periodical}
          material={material}
          focused={focused}
          isbnForCover={identifier || ""}
        >
          <AdditionalMaterialsButton
            showOn="desktop"
            openDueDateModal={handleOpenDueDateModal}
            additionalMaterials={additionalMaterials}
          />
          <MaterialOverdueLink showOn="desktop" dueDate={dueDate} />
        </MaterialInfo>
      )}
      <MaterialStatus
        arrowLabelledBy={`${loanId || identifier}-title`}
        loan={loan}
        openDetailsModal={openLoanDetailsModal}
        openDueDateModal={handleOpenDueDateModal}
        additionalMaterials={additionalMaterials}
      >
        <AdditionalMaterialsButton
          showOn="mobile"
          openDueDateModal={handleOpenDueDateModal}
          additionalMaterials={additionalMaterials}
        />
        <MaterialOverdueLink showOn="mobile" dueDate={dueDate} />
      </MaterialStatus>
    </div>
  );
};

export default fetchDigitalMaterial(
  fetchMaterial(StackableMaterial, ListMaterialSkeleton),
  ListMaterialSkeleton
);
