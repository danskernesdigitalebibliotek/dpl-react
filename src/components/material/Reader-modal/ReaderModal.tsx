import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Modal from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import Reader from "../../reader-player/Reader";
import { closeModal } from "../../../core/modal.slice";

type ReaderModalType = {
  identifier: string;
};

const ReaderModal = ({ identifier }: ReaderModalType) => {
  const t = useText();
  const dispatch = useDispatch();

  useEffect(() => {
    // Attach the closeModal function to the window object to be able to close the modal
    // from the reader / player.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-shadow
    window.closeModal = (modalId: string) => {
      dispatch(closeModal({ modalId }));
    };

    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      delete window.closeModal;
    };
  }, [dispatch]);

  return (
    <Modal
      isFullScreen
      modalId={`reader-modal-${identifier}`}
      screenReaderModalDescriptionText={t("readerModalDescriptionText")}
      dataCy="reader-modal"
      // We don't want to show the close button in the reader modal
      // as it's already present in the reader itself.
      closeModalAriaLabelText=""
    >
      <Reader identifier={identifier} />
    </Modal>
  );
};

export default ReaderModal;
