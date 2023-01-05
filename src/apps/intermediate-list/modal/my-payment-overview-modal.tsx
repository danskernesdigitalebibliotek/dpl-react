import React, { FC } from "react";
import ExternalLinkIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/buttons/icon-btn-external-link.svg";
import Modal, { useModalButtonHandler } from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import { Link } from "../../../components/atoms/link";
import { useUrls } from "../../../core/utils/url";

const MyPaymentOverviewModal: FC = () => {
  const t = useText();
  const { close } = useModalButtonHandler();
  const { paymentOverviewUrl } = useUrls();
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
            href={new URL(paymentOverviewUrl)}
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

export const getIntermediatePaymentModalId = "intermediate-payment-modal";

export default MyPaymentOverviewModal;
