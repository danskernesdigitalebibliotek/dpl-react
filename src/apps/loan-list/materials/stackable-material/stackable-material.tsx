import React, { useCallback, FC, useState } from "react";
import MaterialStatus from "./material-status";
import MaterialOverdueLink from "./material-overdue-link";
import AdditionalMaterialsButton from "./additional-materials-button";
import MaterialInfo from "./material-info";
import fetchMaterial, { MaterialProps } from "../utils/material-fetch-hoc";
import { LoanType } from "../../../../core/utils/types/loan-type";
import fetchDigitalMaterial from "../utils/digital-material-fetch-hoc";

export interface StackableMaterialProps {
  loan: LoanType;
  additionalMaterials: number;
  openLoanDetailsModal: (modalId: string) => void;
  openDueDateModal?: (dueDate: string) => void;
}

const StackableMaterial: FC<StackableMaterialProps & MaterialProps> = ({
  additionalMaterials,
  material,
  loan,
  openDueDateModal,
  openLoanDetailsModal
}) => {
  const { dueDate, faust, identifier, periodical } = loan;

  const openLoanDetailsModalHandler = useCallback(() => {
    if (faust) {
      openLoanDetailsModal(faust);
    }
    if (identifier) {
      openLoanDetailsModal(identifier);
    }
  }, [faust, identifier, openLoanDetailsModal]);

  return (
    <div
      className={`list-reservation my-32 ${
        additionalMaterials > 0 ? "list-reservation--stacked" : ""
      }`}
    >
      {material && (
        <MaterialInfo
          openDetailsModal={openLoanDetailsModalHandler}
          periodical={periodical}
          material={material}
          isbnForCover={identifier || ""}
        >
          <AdditionalMaterialsButton
            showOn="desktop"
            openDueDateModal={() =>
              openDueDateModal && dueDate && openDueDateModal(dueDate)
            }
            additionalMaterials={additionalMaterials}
          />
          <MaterialOverdueLink showOn="desktop" dueDate={dueDate} />
        </MaterialInfo>
      )}
      <MaterialStatus loan={loan}>
        <AdditionalMaterialsButton
          showOn="mobile"
          openDueDateModal={() =>
            openDueDateModal && dueDate && openDueDateModal(dueDate)
          }
          additionalMaterials={additionalMaterials}
        />
        <MaterialOverdueLink showOn="mobile" dueDate={dueDate} />
      </MaterialStatus>
    </div>
  );
};

export default fetchDigitalMaterial(fetchMaterial(StackableMaterial));
