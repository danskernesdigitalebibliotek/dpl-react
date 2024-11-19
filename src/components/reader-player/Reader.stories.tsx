import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Store from "../store";
import Reader from "./Reader";

const meta: Meta<typeof Reader> = {
  title: "Components/Reader",
  component: Reader,
  parameters: {
    layout: "centered"
  },
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
  render: () => (
    <Store>
      <div className="modal-fullscreen">
        <Reader identifier="9788793681095" />
      </div>
    </Store>
  )
};

// Works only if the matrial is reserved
export const WithOrderId: Story = {
  render: () => (
    <Store>
      <div className="modal-fullscreen">
        <Reader orderId="9788793681095" />
      </div>
    </Store>
  )
};
