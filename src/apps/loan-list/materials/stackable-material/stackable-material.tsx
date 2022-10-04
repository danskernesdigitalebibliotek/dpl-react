import React, { useEffect, useCallback, FC, MouseEvent, useState } from "react";
import { useText } from "../../../../core/utils/text";
import {
  FetchMaterial,
  StackableMaterialProps,
  MaterialProps
} from "../utils/material-fetch-hoc";
import { useModalButtonHandler } from "../../../../core/utils/modal";
import DueDateLoansModal from "../../modal/due-date-loans-modal";
import MaterialStatus from "./material-status";
import MaterialOverdueLink from "./material-overdue-link";
import AdditionalMaterialsButton from "./additional-materials-button";
import MaterialInfo from "./material-info";

const StackableMaterial: FC<StackableMaterialProps & MaterialProps> = ({
  amountOfMaterialsWithDueDate,
  material,
  openModal,
  selectMaterial,
  loanMetaData,
  dueDateLabel,
  stack
}) => {
  const t = useText();
  const { open } = useModalButtonHandler();
  const [additionalMaterials] = useState(
    amountOfMaterialsWithDueDate ? amountOfMaterialsWithDueDate - 1 : 0
  );
  const [showModal, setShowModal] = useState(false);
  const { dueDate, id } = loanMetaData;

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
      setShowModal(true);
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
      if (selectMaterial) {
        selectMaterial({
          material,
          loanMetaData
        });
      }
      open(id);
    },
    [id, loanMetaData, material, open, selectMaterial]
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
        <MaterialInfo loanMetaData={loanMetaData} material={material}>
          <AdditionalMaterialsButton
            label={t("loanListMaterialsDesktopText")}
            openDueDateModal={openDueDateModal}
            additionalMaterials={additionalMaterials}
            screenReaderLabel={t("loanListMaterialsModalDesktopText")}
          />
          <MaterialOverdueLink
            label={t("loanListLateFeeDesktopText")}
            dueDate={dueDate}
          />
        </MaterialInfo>
        <MaterialStatus
          loanMetaData={loanMetaData}
          material={material}
          dueDateLabel={dueDateLabel || ""}
        >
          <AdditionalMaterialsButton
            label={t("loanListMaterialsMobileText")}
            screenReaderLabel={t("loanListMaterialsModalMobileText")}
            openDueDateModal={openDueDateModal}
            additionalMaterials={additionalMaterials}
          />
          <MaterialOverdueLink
            label={t("loanListLateFeeMobileText")}
            dueDate={dueDate}
          />
        </MaterialStatus>
      </button>
      {showModal && dueDate && stack && (
        <DueDateLoansModal dueDate={dueDate} loansModal={stack} />
      )}
    </>
  );
};

export default FetchMaterial(StackableMaterial);
