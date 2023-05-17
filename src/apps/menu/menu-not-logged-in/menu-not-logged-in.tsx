import React, { FC } from "react";
import { useUrls } from "../../../core/utils/url";
import { useText } from "../../../core/utils/text";
import Link from "../../../components/atoms/links/Link";
import Modal from "../../../core/utils/modal";
import { getModalIds } from "../../../core/utils/helpers/general";

const MenuNotLoggedInContent: FC = () => {
  const t = useText();
  const { menuLoginUrl, menuSignUpUrl } = useUrls();
  const { userMenuAnonymous: userMenuAnonymousModalId } = getModalIds();

  return (
    <Modal
      classNames="modal-right modal--no-padding"
      modalId={userMenuAnonymousModalId as string}
      closeModalAriaLabelText={t("menuNotAuthenticatedCloseButtonText")}
      screenReaderModalDescriptionText={t(
        "menuNotAuthenticatedModalDescriptionText"
      )}
      isSlider
    >
      <div className="modal-login modal-login--anonymous">
        <Link
          href={menuLoginUrl}
          className="btn-primary btn-filled btn-large arrow__hover--right-small"
        >
          {t("menuLoginText")}
        </Link>
        <Link
          href={menuSignUpUrl}
          className="mt-32 link-tag color-secondary-gray modal-login__btn-create-profile"
        >
          {t("menuSignUpText")}
        </Link>
      </div>
    </Modal>
  );
};

export default MenuNotLoggedInContent;
