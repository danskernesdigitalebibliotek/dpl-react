import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Multiselect from "./Multiselect";
import globalTextArgs from "../../core/storybook/globalTextArgs";
import globalConfigArgs from "../../core/storybook/globalConfigArgs";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";

const WrappedMultiselect = withText(withUrls(Multiselect));

const options = [
  {
    item: "alertErrorMessageText",
    value: "1"
  },
  {
    item: "availabilityAvailableText",
    value: "2"
  },
  {
    item: "availabilityUnavailableText",
    value: "3"
  }
];

const meta: Meta<typeof WrappedMultiselect> = {
  title: "Components / Multiselect",
  component: WrappedMultiselect,
  argTypes: {
    ...globalTextArgs,
    ...globalConfigArgs,
    caption: {
      name: "Caption",
      control: { type: "text" }
    },
    updateExternalState: {
      table: { disable: true }
    },
    options: {
      control: { type: "object" }
    }
  },
  args: {
    caption: "Title",
    options
  },
  render: (args) => {
    return <WrappedMultiselect {...args} />;
  }
};

export default meta;

type Story = StoryObj<typeof WrappedMultiselect>;

export const Primary: Story = {};

export const SingleSelected: Story = {
  args: {
    defaultValue: options.slice(0, 1)
  }
};

export const MultipleSelected: Story = {
  args: {
    defaultValue: options.slice(0, 2)
  }
};
