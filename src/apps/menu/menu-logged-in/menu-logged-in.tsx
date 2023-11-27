import React, { FC } from "react";
import { useText } from "../../../core/utils/text";
import Modal from "../../../core/utils/modal";
import MenuLoggedInContent from "./MenuLoggedInContent";
import { getModalIds } from "../../../core/utils/helpers/modal-helpers";

interface MenuLoggedInProps {
  pageSize: number;
}

const MenuLoggedIn: FC<MenuLoggedInProps> = ({ pageSize }) => {
  const { userMenuAuthenticated: userMenuAuthenticatedModalId } = getModalIds();
  const t = useText();

  return (
    <Modal
      modalId={userMenuAuthenticatedModalId as string}
      classNames="modal-right modal--no-padding"
      closeModalAriaLabelText={t("menuAuthenticatedCloseButtonText")}
      screenReaderModalDescriptionText={t(
        "menuAuthenticatedModalDescriptionText"
      )}
      isSlider
    >
      <MenuLoggedInContent pageSize={pageSize} />
    </Modal>
  );
};

export default MenuLoggedIn;
