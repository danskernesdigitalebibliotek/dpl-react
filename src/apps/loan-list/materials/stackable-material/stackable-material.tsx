import React, { useEffect, useCallback, FC, MouseEvent, useState } from "react";
import { useText } from "../../../../core/utils/text";
import fetchMaterial, { MaterialProps } from "../utils/material-fetch-hoc";
import { useModalButtonHandler } from "../../../../core/utils/modal";
import DueDateLoansModal from "../../modal/due-date-loans-modal";
import MaterialStatus from "./material-status";
import MaterialOverdueLink from "./material-overdue-link";
import AdditionalMaterialsButton from "./additional-materials-button";
import MaterialInfo from "./material-info";
import { getMaterialInfo, queryMatchesFaust } from "../../utils/helpers";
import { MetaDataType } from "../../../../core/utils/types/meta-data-type";
import { LoanMetaDataType } from "../../../../core/utils/types/loan-meta-data-type";
import { ReservationMetaDataType } from "../../../../core/utils/types/reservation-meta-data-type";
import MaterialDetailsModal from "../../modal/material-details-modal";
import { getUrlQueryParam } from "../../../../core/utils/helpers/url";
import fetchDigitalMaterial from "../utils/digital-material-fetch-hoc";

interface StackableMaterialProps {
  stack?: MetaDataType<LoanMetaDataType>[];
  loanMetaData: MetaDataType<LoanMetaDataType | ReservationMetaDataType>;
  amountOfMaterialsWithDueDate?: number;
  dueDateLabel?: string;
  openModal?: boolean;
}

const StackableMaterial: FC<StackableMaterialProps & MaterialProps> = ({
  amountOfMaterialsWithDueDate,
  material,
  openModal,
  loanMetaData,
  dueDateLabel,
  stack
}) => {
  const t = useText();
  const { open } = useModalButtonHandler();
  const additionalMaterials = amountOfMaterialsWithDueDate
    ? amountOfMaterialsWithDueDate - 1
    : 0;

  const { dueDate, loanDate } = loanMetaData.loanSpecific || {};
  const { id } = loanMetaData || {};

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
      open(id);
    },
    [id, open]
  );

  useEffect(() => {
    const modalString = getUrlQueryParam("modal");

    // modal query param: details modal faust
    const faustFound = queryMatchesFaust(modalString);

    if (modalString && faustFound && faustFound === id) {
      open(faustFound);
    }
  }, [id, open]);

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
          <MaterialInfo material={material}>
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
        )}
        <MaterialStatus
          dueDate={dueDate}
          loanDate={loanDate}
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
      {dueDate && stack && (
        <DueDateLoansModal dueDate={dueDate} loansModal={stack} />
      )}
      {loanMetaData && loanMetaData && (
        <MaterialDetailsModal loanMetaData={loanMetaData} material={material} />
      )}
    </>
  );
};

export default fetchMaterial(fetchDigitalMaterial(StackableMaterial));
