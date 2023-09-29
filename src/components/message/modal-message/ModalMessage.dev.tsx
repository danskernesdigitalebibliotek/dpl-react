import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useEffect } from "react";
import Modal, { useModalButtonHandler } from "../../../core/utils/modal";
import ModalMessage from "./ModalMessage";

export default {
  title: "Components / Message / Modal Message",
  argTypes: {
    title: {
      defaultValue: "This is a title",
      control: { type: "text" }
    },
    subTitle: {
      defaultValue: "This is a subtitle",
      control: { type: "text" }
    }
  },
  component: ModalMessage
} as ComponentMeta<typeof ModalMessage>;

const Template: ComponentStory<typeof ModalMessage> = (props) => {
  const { open } = useModalButtonHandler();

  useEffect(() => {
    open("modal-message");
  }, [open]);

  return (
    <Modal
      modalId="modal-message"
      closeModalAriaLabelText="close"
      screenReaderModalDescriptionText="modal message story"
      classNames="modal-cta modal-padding"
    >
      <ModalMessage
        {...props}
        ctaButton={{ modalId: "modal-message", text: "Man" }}
      >
        <p>Hello, I am some extra info</p>
      </ModalMessage>
    </Modal>
  );
};

export const ModalMessageExample = Template.bind({});
