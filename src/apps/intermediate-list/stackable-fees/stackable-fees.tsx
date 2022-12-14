import React, { useEffect, useCallback, FC, MouseEvent, useState } from "react";
import dayjs from "dayjs";
import { FeeV2 } from "../../../core/fbs/model";
import { useModalButtonHandler } from "../../../core/utils/modal";
import FeeInfo from "./fee-info";
import fetchMaterial, {
  MaterialProps
} from "../../loan-list/materials/utils/material-fetch-hoc";
import AdditionalFeesButton from "./additional-fees-button";
import FeeStatus from "./fee-status";
import FeeDetailsModal from "../modal/fee-details-modal";
import { Link } from "../../../components/atoms/link";
import FeeStatusCircle from "../utils/fee-status-circle";
import { useText } from "../../../core/utils/text";

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
  const t = useText();
  const { amount, creationDate, reasonMessage, dueDate } = feeData;
  const creationDateFormatted = dayjs(creationDate).format("D. MMMM YYYY");
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
  });
  console.log(feeData);
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
        <div className="modal modal-show modal-loan">
          <div className="modal__screen-reader-description" id="describemodal">
            Denne modal dækker sidens indhold, og er en demo
          </div>
          <div className="modal-loan__container">
            <div className="modal-loan__header">
              <div className="mr-32">
                <FeeStatusCircle
                  dueDate={dueDate || ""}
                  feeCreationDate={creationDate}
                />
              </div>
              <div>
                <h2 className="modal-loan__title text-header-h2">
                  {t("turnedInText")} {creationDateFormatted}
                </h2>
                <p className="text-body-medium-regular color-secondary-gray mt-4">
                  Kan afleveres på alle Rudersdals biblioteker
                </p>
              </div>
            </div>
            <div className="modal-loan__buttons">
              <div className="checkbox">
                <input
                  id="checkbox_id__0.09343192931195876"
                  className="checkbox__input"
                  type="checkbox"
                />
                <label
                  className="checkbox__label"
                  htmlFor="checkbox_id__0.09343192931195876"
                >
                  <span className="checkbox__icon">
                    <svg width="20px" height="20px">
                      <polyline
                        points="1.5 6 4.5 9 10.5 1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                  </span>
                  <div>
                    <span className="checkbox__text text-small-caption color-secondary-gray ">
                      Jeg accepterer{" "}
                      <Link href={new URL("https://www.google.dk")}>
                        Betalingsbetingelserne<sup>*</sup>
                      </Link>
                    </span>
                  </div>
                </label>
              </div>
              <div>
                <p>30,-</p>
              </div>
              <button
                type="button"
                className="btn-primary btn-filled btn-small arrow__hover--right-small undefined"
              >
                Betal
              </button>
            </div>
            <ul className="modal-loan__list-container">
              <li className="modal-loan__list">
                <ul className="modal-loan__list-materials">
                  <li>
                    <div className="list-materials ">
                      <div className="list-materials__content">
                        <div className="list-materials__content-status">
                          <div className="status-label status-label--outline ">
                            bog
                          </div>
                          <div className="status-label status-label--danger list-materials__content-status-label">
                            AFLEVERES 20.11.21
                          </div>
                        </div>
                        <p className="text-header-h5 mt-8">Audrey Hepburn</p>
                        <p className="text-small-caption">
                          Af Isabel Sánchez Vegara, Amaia Arrazola (2018)
                        </p>
                      </div>
                      <div className="list-materials__status">
                        <span className="text-small-caption">
                          Digitale materialer kan ikke fornys
                        </span>
                        <div className="status-label status-label--danger ">
                          AFLEVERES 20.11.21
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </FeeDetailsModal>
    </>
  );
};

export default fetchMaterial(StackableFees);
