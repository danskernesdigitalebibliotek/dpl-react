import type { Meta, StoryObj } from "@storybook/react";
import DemoModal from "./demo-modal.entry";
import globalTextArgs, {
  argTypes as globalTextArgTypes
} from "../../core/storybook/globalTextArgs";

const meta: Meta<typeof DemoModal> = {
  title: "Apps / Demo modal",
  component: DemoModal,
  parameters: {
    query: {
      modal: "demo-modal-one"
    }
  },

  // @ts-ignore: can't figure out how to type globalTextArgTypes
  argTypes: {
    ...globalTextArgTypes,
    ariaLabelModalOneText: {
      control: { type: "text" }
    },
    ariaLabelModalTwoText: {
      control: { type: "text" }
    },
    screenReaderModalDescriptionText: {
      control: { type: "text" }
    }
  }
};

export default meta;

type Story = StoryObj<typeof DemoModal>;

export const Primary: Story = {
  args: {
    ...globalTextArgs,
    ariaLabelModalOneText: "Luk dialog et",
    ariaLabelModalTwoText: "Luk dialog to",
    screenReaderModalDescriptionText:
      "Denne modal dækker sidens indhold, og er en demo"
  }
};
