import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import React, { useEffect } from "react";
import Modal, { useModalButtonHandler } from "../../../core/utils/modal";
import ModalMessage from "./ModalMessage";
import globalTextArgs, {
  argTypes as globalConfigArgTypes
} from "../../../core/storybook/globalTextArgs";

const ModalTemplate: StoryFn<typeof ModalMessage> = (props) => {
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

const meta: Meta<typeof ModalMessage> = {
  title: "Components / Message / Modal Message",
  component: ModalMessage,
  argTypes: {
    ...globalConfigArgTypes,
    title: {
      control: { type: "text" }
    },
    subTitle: {
      control: { type: "text" }
    }
  },
  args: {
    ...globalTextArgs,
    title: "This is a title",
    subTitle: "This is a subtitle"
  },
  render: ModalTemplate
};

export default meta;

type Story = StoryObj<typeof ModalMessage>;

export const ModalMessageExample: Story = {};
