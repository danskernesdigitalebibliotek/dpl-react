import React, { FC, useEffect } from "react";
import Modal from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import BlockedTypes from "../../../core/utils/types/BlockedTypes";
import { useUrls } from "../../../core/utils/url";
import Link from "../../atoms/links/Link";
import { useSetHasBeenVisible } from "../../../core/blockedModal.slice";
import { useBlockedModalHasBeenVisible } from "../helper";

interface BlockedModalProps {
  blockedStatus: BlockedTypes;
}

export const getBlockedModalId = () => "blocked-patron";

const BlockedModal: FC<BlockedModalProps> = ({ blockedStatus }) => {
  const t = useText();
  const u = useUrls();
  const blockedPatronELinkUrl = u("blockedPatronELinkUrl", true);
  const modalId = getBlockedModalId();
  const setHasBeenVisible = useSetHasBeenVisible();
  // Used to check whether the modal has been opened by another component,
  // the modal should really only be showed once.
  const hasBeenVisible = useBlockedModalHasBeenVisible();

  useEffect(() => {
    if (!hasBeenVisible) {
      setHasBeenVisible();
    }
  }, [blockedStatus, hasBeenVisible, setHasBeenVisible]);

  return (
    <Modal
      modalId={modalId}
      classNames="modal-cta modal-padding"
      closeModalAriaLabelText={t(`blockedPatronCloseModalAriaLabelText`)}
      screenReaderModalDescriptionText={t(
        `blockedPatronModalAriaDescriptionText`
      )}
    >
      <div className="modal-text__container">
        <h2 className="text-header-h3">
          {t(`blockedPatron${blockedStatus}TitleText`)}
        </h2>
        <p className="mt-48 mb-48 text-body-large">
          {t(`blockedPatron${blockedStatus}BodyText`)}
        </p>
        {blockedStatus === BlockedTypes.fee && blockedPatronELinkUrl && (
          <Link href={blockedPatronELinkUrl}>
            {t(`blockedPatronELinkText`)}
          </Link>
        )}
      </div>
    </Modal>
  );
};

export default BlockedModal;
