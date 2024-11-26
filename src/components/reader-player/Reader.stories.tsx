import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Reader from "./Reader";

const meta: Meta<typeof Reader> = {
  title: "ReaderPlayer / Reader",
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

export const WithIdentifier: Story = {
  render: () => <Reader identifier="9788793681095" />
};

// Works only if the matrial is reserved
export const WithOrderId: Story = {
  render: () => <Reader orderId="97cb3a6f-e23b-41ad-97ca-e939541feba7" />
};
