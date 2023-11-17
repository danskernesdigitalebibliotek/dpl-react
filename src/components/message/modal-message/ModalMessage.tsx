/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { FC } from "react";
import withFocusTrap from "../../../core/utils/withFocusTrap";
import Message, { MessageProps } from "./Message";
import { Button } from "../../Buttons/Button";
import { useModalButtonHandler } from "../../../core/utils/modal";

interface ModalMessageProps extends MessageProps {
  ctaButton?: {
    modalId: string;
    text: string;
    callback?: () => void;
    dataCy?: string;
  };
}

const ModalMessage: FC<ModalMessageProps> = (props) => {
  const { close } = useModalButtonHandler();
  const { ctaButton, ...messageProps } = props;
  return (
    <div className="modal-cta__container">
      <Message {...messageProps} />
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
              close(ctaButton.modalId);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default withFocusTrap(ModalMessage);
