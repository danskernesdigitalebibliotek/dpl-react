import type { Meta, StoryObj } from "@storybook/react-webpack5";
import Reader from "./Reader";

const meta: Meta<typeof Reader> = {
  title: "ReaderPlayer / Reader",
  component: Reader,
  argTypes: {
    identifier: {
      control: { type: "text" },
      description:
        "Publizon identifier for a material (Do not use both identifier and orderid)"
    },
    orderid: {
      control: { type: "text" },
      description:
        "Place order id for a allready ordered material (Do not use both identifier and orderid)"
    }
  }
};

export default meta;

type Story = StoryObj<typeof Reader>;

export const WithIdentifier: Story = {
  args: {
    identifier: "9788793681095"
  }
};

// Works only if the matrial is reserved
export const WithOrderId: Story = {
  args: {
    orderid: ""
  }
};
