import React, { useEffect, useCallback, FC, MouseEvent, useState } from "react";
import { FeeV2 } from "../../../core/fbs/model";
import { useModalButtonHandler } from "../../../core/utils/modal";
import FeeInfo from "./fee-info";
import fetchMaterial, {
  MaterialProps
} from "../../loan-list/materials/utils/material-fetch-hoc";
import AdditionalFeesButton from "./additional-fees-button";
import FeeStatus from "./fee-status";
import FeeDetailsModal from "../modal/fee-details-modal";

export interface StackableFeeProps {
  amountOfMaterialsWithDueDate?: number;
  fee: FeeV2;
  faust: string;
  feeData: FeeV2;
  totalFeeAmountText: string;
  FeeCreatedText: string;
  otherMaterialsText: string;
}

const StackableFees: FC<StackableFeeProps & MaterialProps> = ({
  amountOfMaterialsWithDueDate,
  fee,
  faust,
  material,
  feeData,
  totalFeeAmountText,
  FeeCreatedText,
  otherMaterialsText
}) => {
  const { open } = useModalButtonHandler();
  const { amount, creationDate, reasonMessage } = feeData;
  const [additionalFees] = useState(
    amountOfMaterialsWithDueDate ? amountOfMaterialsWithDueDate - 1 : 0
  );

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

  const selectListMaterial = useCallback(
    (e: MouseEvent) => {
      stopPropagationFunction(e);
      console.log(`hallo? ${faust}`);
      open(faust || "");
    },
    [faust, open]
  );

  return (
    <>
      <button
        type="button"
        onClick={(e) => selectListMaterial(e)}
        className={`list-reservation my-32 ${
          additionalFees > 0 ? "list-reservation--stacked" : ""
        }`}
      >
        {fee && (
          <FeeInfo material={material} isbnForCover="">
            <AdditionalFeesButton
              label={otherMaterialsText}
              showOn="desktop"
              // openDueDateModal={openDueDateModal}
              additionalFees={additionalFees}
              screenReaderLabel="screenreadertext"
            />
          </FeeInfo>
        )}
        <div className="list-reservation__status">
          <FeeStatus
            dueDate={creationDate}
            dueDateLabel={FeeCreatedText}
            reasonMessage={reasonMessage}
          >
            {/* <AdditionalMaterialsButton
            label={t("loanListMaterialsMobileText")}
            showOn="mobile"
            screenReaderLabel={t("loanListMaterialsModalMobileText")}
            openDueDateModal={openDueDateModal}
            additionalMaterials={additionalMaterials}
          /> */}
          </FeeStatus>
          <div className="list-reservation__fee">
            <p className="text-body-medium-medium">
              {totalFeeAmountText} {amount},-
            </p>
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
      <FeeDetailsModal faust={faust} material={material}>
        <h1>Hello WOrld! :D:D:D</h1>
      </FeeDetailsModal>
    </>
  );
};

export default fetchMaterial(StackableFees);
