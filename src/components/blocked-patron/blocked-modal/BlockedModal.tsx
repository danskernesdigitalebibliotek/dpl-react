import React, { FC, useEffect, useState } from "react";
import Modal from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import BlockedTypes from "../../../core/utils/types/BlockedTypes";
import { useUrls } from "../../../core/utils/url";
import Link from "../../atoms/links/Link";
import { getModalIds } from "../../../core/utils/helpers/modal-helpers";

interface BlockedModalProps {
  blockedStatus: string;
}

const BlockedModal: FC<BlockedModalProps> = ({ blockedStatus }) => {
  const t = useText();
  const u = useUrls();
  const blockedPatronELinkUrl = u("blockedPatronELinkUrl", true);
  const { blockedModal } = getModalIds();
  const [isJustLoggedIn, setJustLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const urlPrams = new URLSearchParams(window.location.search);
    if (urlPrams.get("check_logged_in")) {
      setJustLoggedIn(true);
    }
  }, []);

  // If the user isn't actually blocked, don't render the modal,
  // and only showe the modal if the user has just logged in.
  if (!blockedStatus || blockedStatus === "" || !isJustLoggedIn) {
    return null;
  }

  return (
    <Modal
      modalId={blockedModal as string}
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
