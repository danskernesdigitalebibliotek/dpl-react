import React from "react";
import dayjs from "dayjs";
import localeDa from "dayjs/locale/da";
import Modal from "../../../core/utils/modal";
import StatusCircle from "../materials/utils/status-circle";
import MaterialDecorator from "../materials/material-decorator";
import { useText } from "../../../core/utils/text";
import CheckBox from "../materials/utils/checkbox";
import { LoanV2 } from "../../../core/fbs/model/loanV2";

interface DueDateLoansModalProps {
  dueDate: string;
  renewable: number | null;
  dueDates: string[] | undefined;
  loansModal: LoanV2[] | undefined | null;
}

const DueDateLoansModal: React.FC<DueDateLoansModalProps> = ({
  dueDate,
  renewable,
  dueDates,
  loansModal
}) => {
  const t = useText();

  return (
    <Modal
      modalId={dueDate}
      closeModalAriaLabelText={t("LoanListCloseModalText")}
      screenReaderModalDescriptionText={t("LoanListModalDescriptionText")}
    >
      {loansModal && (
        <>
          <div className="modal-loan__header">
            <div className="mr-32">
              {/* todo this status circle being discussed på fddf, as we dont know which numbers to use for the full circle, and the designers are somewhat vague about the idea  */}
              <StatusCircle loanDate="03-08-2022" dueDate={dueDate} />
            </div>
            <div>
              <h1 className="modal-loan__title text-header-h2">
                {t("loanListToBeDeliveredModalText")}{" "}
                {dayjs(dueDate).locale(localeDa).format("DD MMMM YYYY")}
              </h1>
            </div>
          </div>
          <div className="modal-loan__buttons">
            <CheckBox
              id="checkbox-select-all"
              label={t("loanListSelectPossibleCheckboxText")}
            />
            <button
              type="button"
              className="btn-primary btn-filled btn-small arrow__hover--right-small"
            >
              {t("loanListRenewPossibleText")} ({renewable})
            </button>
          </div>
          <div className="modal-loan__list">
            <ul className="modal-loan__list-materials">
              {dueDates &&
                loansModal.map(({ renewalStatusList, loanDetails }) => {
                  return (
                    <MaterialDecorator
                      materialType="selectableMaterial"
                      faust={loanDetails.recordId}
                      dueDate={loanDetails.dueDate}
                      renewableStatus={renewalStatusList}
                      loanType={loanDetails.loanType}
                    />
                  );
                })}
            </ul>
          </div>
        </>
      )}
    </Modal>
  );
};

export default DueDateLoansModal;
