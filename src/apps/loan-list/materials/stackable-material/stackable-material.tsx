import React, { useEffect, useCallback, FC, MouseEvent, useState } from "react";
import { useText } from "../../../../core/utils/text";
import { useModalButtonHandler } from "../../../../core/utils/modal";
import DueDateLoansModal from "../../modal/due-date-loans-modal";
import MaterialStatus from "./material-status";
import MaterialOverdueLink from "./material-overdue-link";
import AdditionalMaterialsButton from "./additional-materials-button";
import MaterialInfo from "./material-info";
import fetchMaterial, { MaterialProps } from "../utils/material-fetch-hoc";
import { LoanType } from "../../../../core/utils/types/loan-type";
import MaterialDetailsModal from "../../modal/material-details-modal";
import fetchDigitalMaterial from "../utils/digital-material-fetch-hoc";
import MaterialDetails from "../../modal/material-details";

export interface StackableMaterialProps {
  stack?: LoanType[];
  loan: LoanType;
  amountOfMaterialsWithDueDate?: number;
  openModal?: boolean;
  pageSize: number;
}

const StackableMaterial: FC<StackableMaterialProps & MaterialProps> = ({
  amountOfMaterialsWithDueDate,
  material,
  openModal,
  loan,
  stack,
  pageSize
}) => {
  const t = useText();
  const { open } = useModalButtonHandler();
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

  const openDueDateModal = useCallback(() => {
    if (stack && dueDate) {
      open(dueDate);
    }
  }, [stack, open, dueDate]);

  useEffect(() => {
    if (openModal) {
      openDueDateModal();
    }
  }, [openDueDateModal, openModal]);

  const selectListMaterial = useCallback(
    (e: MouseEvent) => {
      stopPropagationFunction(e);
      open(faust || identifier || "");
    },
    [faust, identifier, open]
  );

  return (
    <>
      <button
        type="button"
        onClick={(e) => selectListMaterial(e)}
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
              openDueDateModal={openDueDateModal}
              additionalMaterials={additionalMaterials}
            />
            <MaterialOverdueLink showOn="desktop" dueDate={dueDate} />
          </MaterialInfo>
        )}
        <MaterialStatus loan={loan}>
          <AdditionalMaterialsButton
            showOn="mobile"
            openDueDateModal={openDueDateModal}
            additionalMaterials={additionalMaterials}
          />
          <MaterialOverdueLink showOn="mobile" dueDate={dueDate} />
        </MaterialStatus>
      </button>
      {dueDate && stack && (
        <DueDateLoansModal
          pageSize={pageSize}
          dueDate={dueDate}
          loansModal={stack}
        />
      )}
      <MaterialDetailsModal modalEntity={loan} material={material}>
        <MaterialDetails
          faust={loan.faust}
          identifier={loan.identifier}
          loan={loan}
        />
      </MaterialDetailsModal>
    </>
  );
};

export default fetchDigitalMaterial(fetchMaterial(StackableMaterial));
