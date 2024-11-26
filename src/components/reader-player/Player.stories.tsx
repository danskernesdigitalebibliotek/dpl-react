import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Player from "./Player";

const meta: Meta<typeof Player> = {
  title: "ReaderPlayer / Player",
  component: Player,
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

type Story = StoryObj<typeof Player>;

export const WithIdentifier: Story = {
  render: () => (
    <div style={{ minHeight: "250px" }}>
      <Player identifier="9788702366600" />
    </div>
  )
};

// Works only if the matrial is reserved
export const WithOrderId: Story = {
  render: () => (
    <div style={{ minHeight: "250px" }}>
      <Player orderId="" />
    </div>
  )
};
