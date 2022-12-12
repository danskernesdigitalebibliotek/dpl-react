import React, { useEffect, useCallback, FC, MouseEvent, useState } from "react";
import { useText } from "../../../core/utils/text";
import { FeeV2 } from "../../../core/fbs/model";
import { useModalButtonHandler } from "../../../core/utils/modal";
import FeeInfo from "./fee-info";
import fetchMaterial, {
  MaterialProps
} from "../../loan-list/materials/utils/material-fetch-hoc";
import AdditionalFeesButton from "./additional-fees-button";
import FeeStatus from "./fee-status";

export interface StackableFeeProps {
  amountOfMaterialsWithDueDate?: number;
  fee: FeeV2;
}

const StackableFees: FC<StackableFeeProps & MaterialProps> = ({
  amountOfMaterialsWithDueDate,
  fee,
  material
}) => {
  // const t = useText();
  // const { open } = useModalButtonHandler();
  const [additionalFees] = useState(
    amountOfMaterialsWithDueDate ? amountOfMaterialsWithDueDate - 1 : 0
  );

  console.log(fee);
  // const { materialItemNumber } = fee.materials;

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

  // const openDueDateModal = useCallback(() => {
  //   if (stack && dueDate) {
  //     open(dueDate);
  //   }
  // }, [stack, open, dueDate]);

  // useEffect(() => {
  //   if (openModal) {
  //     openDueDateModal();
  //   }
  // }, [openDueDateModal, openModal]);

  // const selectListMaterial = useCallback(
  //   (e: MouseEvent) => {
  //     stopPropagationFunction(e);
  //     open(faust || identifier || "");
  //   },
  //   [faust, identifier, open]
  // );

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          console.log("waheyu");
        }}
        className={`list-reservation my-32 ${
          additionalFees > 0 ? "list-reservation--stacked" : ""
        }`}
      >
        {fee && (
          <FeeInfo material={material} isbnForCover="">
            <AdditionalFeesButton
              label="label"
              showOn="desktop"
              // openDueDateModal={openDueDateModal}
              additionalFees={additionalFees}
              screenReaderLabel="screenreadertext"
            />
          </FeeInfo>
        )}
        <div className="list-reservation__status">
          <FeeStatus dueDateLabel="Hallo testing">
            {/* <AdditionalMaterialsButton
            label={t("loanListMaterialsMobileText")}
            showOn="mobile"
            screenReaderLabel={t("loanListMaterialsModalMobileText")}
            openDueDateModal={openDueDateModal}
            additionalMaterials={additionalMaterials}
          /> */}
          </FeeStatus>
          <div className="list-reservation__fee">
            <p className="text-body-medium-medium">Gebyr 30,-</p>
          </div>
        </div>
      </button>
      {/* {dueDate && stack && (
        <DueDateLoansModal
          pageSize={pageSize}
          dueDate={dueDate}
          loansModal={stack}
        />
      )} */}
      {/* <MaterialDetailsModal modalEntity={loan} material={material}>
        <MaterialDetails
          faust={loan.faust}
          identifier={loan.identifier}
          loan={loan}
        />
      </MaterialDetailsModal> */}
    </>
  );
};

export default fetchMaterial(StackableFees);
