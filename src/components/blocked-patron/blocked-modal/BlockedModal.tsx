import React, { FC } from "react";
import Modal from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import { useUrls } from "../../../core/utils/url";
import { Link } from "../../atoms/link";

interface BlockedModalProps {
  blockedStatus: string;
}

const BlockedModal: FC<BlockedModalProps> = ({ blockedStatus }) => {
  const t = useText();
  const { blockedPatronELinkUrl } = useUrls();

  return (
    <Modal
      modalId="blocked-modal"
      classNames="modal-loan"
      closeModalAriaLabelText={t(`blockedPatronCloseModalAriaLabelText`)}
      screenReaderModalDescriptionText={t(
        `blockedPatronModalAriaDescriptionText`
      )}
    >
      <div className="modal-text__container">
        <h1 className="text-header-h3">
          {t(`blockedPatron${blockedStatus}TitleText`)}
        </h1>
        <p className="mt-48 mb-48 text-body-large">
          {t(`blockedPatron${blockedStatus}BodyText`)}
        </p>
        {blockedStatus === "E" && (
          <Link href={blockedPatronELinkUrl}>
            {t(`blockedPatronELinkText`)}
          </Link>
        )}
      </div>
    </Modal>
  );
};

export default BlockedModal;
