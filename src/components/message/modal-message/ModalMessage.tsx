import * as React from "react";
import { FC } from "react";
import withFocusTrap from "../../../core/utils/withFocusTrap";
import Message, { MessageProps } from "./Message";
import { Button } from "../../Buttons/Button";
import { useModalButtonHandler } from "../../../core/utils/modal";

interface RequiredModalId {
  modalId: string;
  closeAllModals?: never;
}
interface RequireCloseAllModals {
  modalId?: never;
  closeAllModals: boolean;
}

interface ModalMessageProps extends MessageProps {
  ctaButton?: {
    text: string;
    callback?: () => void;
    dataCy?: string;
  } & (RequiredModalId | RequireCloseAllModals);
}

const ModalMessage: FC<ModalMessageProps> = React.forwardRef((props) => {
  const { close, closeAll } = useModalButtonHandler();
  const { ctaButton, ...messageProps } = props;
  return (
    <div className="modal-cta__container">
      <Message
        // TODO: Explicitly define prop types for better clarity
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...messageProps}
      />
      <div className="modal-cta__buttons mt-48">
        {ctaButton && (
          <Button
            dataCy={ctaButton.dataCy ?? "modal-cta-button"}
            classNames="modal-message__confirm-button"
            label={ctaButton.text}
            buttonType="none"
            disabled={false}
            collapsible={false}
            size="small"
            variant="filled"
            onClick={() => {
              if (ctaButton.callback) {
                ctaButton.callback();
              }
              if (ctaButton.modalId) {
                close(ctaButton.modalId);
              }
              if (ctaButton.closeAllModals) {
                closeAll();
              }
            }}
          />
        )}
      </div>
    </div>
  );
});

ModalMessage.displayName = "ModalMessage";
export default withFocusTrap(ModalMessage);
