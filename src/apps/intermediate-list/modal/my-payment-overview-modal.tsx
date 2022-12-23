import React, { FC } from "react";
import ExternalLinkIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/buttons/icon-btn-external-link.svg";
import Modal, { useModalButtonHandler } from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import { Link } from "../../../components/atoms/link";

const MyPaymentOverviewModal: FC = () => {
  const t = useText();
  const { close } = useModalButtonHandler();
  const handleClick = () => {
    close("intermediate-payment-modal");
  };
  return (
    <Modal
      modalId="intermediate-payment-modal"
      closeModalAriaLabelText="test"
      screenReaderModalDescriptionText="test"
      classNames="modal-cta"
    >
      <div className="modal-cta__container">
        <h2 className="text-header-h2">
          {t("intermediatePaymentModalHeaderText")}
        </h2>
        <div className="mt-48 color-secondary-gray">
          <p className="text-body-medium-regular">
            {t("intermediatePaymentModalBodyText")}
          </p>
          <p className="text-links mt-24">
            {t("intermediatePaymentModalNoticeText")}
          </p>
        </div>
        <div className="modal-cta__buttons mt-48">
          <Link
            className="btn-primary btn-filled btn-large arrow__hover--right-small"
            href={
              new URL(
                "https://www.borger.dk/vaelg-kommune?actionPageId=065ca8f9-a1f5-4946-ada7-12e163f568df&selfserviceId=7200a519-38ad-48b9-b19a-6e5783e39999"
              )
            }
            isNewTab
          >
            {t("intermediatePaymentModalGotoText")}{" "}
            <img src={ExternalLinkIcon} className="btn-icon invert" alt="" />
          </Link>
          <div className="modal-cta__link">
            <button
              className="link-tag color-secondary-gray ml-8"
              type="button"
              onClick={handleClick}
            >
              {t("intermediatePaymentModalCancelText")}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MyPaymentOverviewModal;
