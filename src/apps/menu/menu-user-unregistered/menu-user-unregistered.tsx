import React from "react";
import { useText } from "../../../core/utils/text";
import Modal from "../../../core/utils/modal";
import { getModalIds } from "../../../core/utils/helpers/modal-helpers";
import MenuUserUnregisteredContent from "./MenuUserUnregisteredContent";

const MenuUserUnregistered = () => {
  const { userMenuUnregistered: userMenuUnregisteredModalId } = getModalIds();
  const t = useText();

  return (
    <Modal
      modalId={userMenuUnregisteredModalId as string}
      classNames="modal-right modal--no-padding"
      closeModalAriaLabelText={t("menuAuthenticatedCloseButtonText")}
      screenReaderModalDescriptionText={t(
        "menuAuthenticatedModalDescriptionText"
      )}
      isSlider
    >
      <MenuUserUnregisteredContent />
    </Modal>
  );
};

export default MenuUserUnregistered;
