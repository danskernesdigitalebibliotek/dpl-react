import * as React from "react";
import { FC } from "react";
import Modal, { useModalButtonHandler } from "../../core/utils/modal";
import { useText } from "../../core/utils/text";
import { Button } from "../Buttons/Button";
import { getModalIds } from "../../core/utils/helpers/modal-helpers";

export interface AcceptModalProps {
  accept: () => void;
}

const AcceptModal: FC<AcceptModalProps> = ({ accept }) => {
  const { acceptModal } = getModalIds();
  const t = useText();
  const { close } = useModalButtonHandler();

  const acceptAndClose = () => {
    close(acceptModal as string);
    accept();
  };

  return (
    <Modal
      modalId={acceptModal as string}
      closeModalAriaLabelText={t("acceptModalAriaLabelText")}
      screenReaderModalDescriptionText={t("acceptModalAriaDescriptionText")}
    >
      <div className="modal-cta__container">
        <h2 className="text-header-h2">{t("acceptModalHeaderText")}</h2>
        <div className="mt-48 color-secondary-gray">
          <p className="text-body-medium-regular">{t("acceptModalBodyText")}</p>
          <p className="text-links mt-24">{t("acceptModalAreYouSureText")}</p>
        </div>
        <div className="modal-cta__buttons mt-48">
          <Button
            label={t("acceptModalCancelButtonText")}
            buttonType="none"
            disabled={false}
            collapsible={false}
            size="large"
            variant="filled"
            onClick={() => close(acceptModal as string)}
          />
          <div className="modal-cta__link">
            <button
              type="button"
              onClick={() => acceptAndClose()}
              className="link-tag color-secondary-gray ml-8"
            >
              {t("acceptModalAcceptButtonText")}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AcceptModal;
