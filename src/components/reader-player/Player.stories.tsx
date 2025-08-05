import type { Meta, StoryObj } from "@storybook/react-webpack5";
import Player from "./Player";

const meta: Meta<typeof Player> = {
  title: "ReaderPlayer / Player",
  component: Player,
  argTypes: {
    identifier: {
      control: { type: "text" },
      description:
        "Publizon identifier for a material (Do not use both identifier and orderId)"
    },
    orderId: {
      control: { type: "text" },
      description:
        "Place order id for a allready ordered material (Do not use both identifier and orderId)"
    }
  }
};

export default meta;

type Story = StoryObj<typeof Player>;

export const WithIdentifier: Story = {
  args: {
    identifier: "9788702366600"
  }
};

// Works only if the matrial is reserved
export const WithOrderId: Story = {
  args: {
    orderId: ""
  }
};
