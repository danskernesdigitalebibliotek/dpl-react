import type { Meta, StoryObj } from "@storybook/react";
import Reader from "./Reader.entry";

const meta: Meta<typeof Reader> = {
  title: "Apps / Reader",
  component: Reader,
  argTypes: {
    identifier: {
      control: { type: "text" }
    },
    orderId: {
      control: { type: "text" }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Reader>;

export const Primary: Story = {
  args: {
    ...serviceUrlArgs
  }
};
