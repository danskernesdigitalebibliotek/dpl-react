import React, { useEffect, useCallback, FC, MouseEvent, useState } from "react";
import MaterialStatus from "./material-status";
import MaterialOverdueLink from "./material-overdue-link";
import AdditionalMaterialsButton from "./additional-materials-button";
import MaterialInfo from "./material-info";
import fetchMaterial, { MaterialProps } from "../utils/material-fetch-hoc";
import { LoanType } from "../../../../core/utils/types/loan-type";
import fetchDigitalMaterial from "../utils/digital-material-fetch-hoc";

export interface StackableMaterialProps {
  loan: LoanType;
  amountOfMaterialsWithDueDate?: number;
  openLoanDetailsModal: (modalId: string) => void;
  openDueDateModal?: (dueDate: string) => void;
}

const StackableMaterial: FC<StackableMaterialProps & MaterialProps> = ({
  amountOfMaterialsWithDueDate,
  material,
  loan,
  openDueDateModal,
  openLoanDetailsModal
}) => {
  const [additionalMaterials] = useState(
    amountOfMaterialsWithDueDate ? amountOfMaterialsWithDueDate - 1 : 0
  );
  const { dueDate, faust, identifier, periodical } = loan;

  function stopPropagationFunction(e: Event | MouseEvent) {
    e.stopPropagation();
  }
  useEffect(() => {
    document
      .querySelector(".list-reservation a")
      ?.addEventListener("click", stopPropagationFunction, true);

    return () => {
      document
        .querySelector(".list-reservation a")
        ?.removeEventListener("click", stopPropagationFunction, true);
    };
  }, []);

  const openLoanDetailsModalHandler = useCallback(
    (e: MouseEvent) => {
      stopPropagationFunction(e);
      if (faust) {
        openLoanDetailsModal(faust);
      }
      if (identifier) {
        openLoanDetailsModal(identifier);
      }
    },
    [faust, identifier, openLoanDetailsModal]
  );

  return (
    <button
      type="button"
      onClick={(e) => openLoanDetailsModalHandler(e)}
      className={`list-reservation my-32 ${
        additionalMaterials > 0 ? "list-reservation--stacked" : ""
      }`}
    >
      {material && (
        <MaterialInfo
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
    </button>
  );
};

export default fetchDigitalMaterial(fetchMaterial(StackableMaterial));
