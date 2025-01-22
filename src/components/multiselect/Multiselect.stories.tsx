import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Multiselect from "./Multiselect";
import globalTextArgs, {
  argTypes as globalTextArgTypes
} from "../../core/storybook/globalTextArgs";
import globalConfigArgs, {
  argTypes as globalConfigArgTypes
} from "../../core/storybook/globalConfigArgs";
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
    ...globalTextArgTypes,
    ...globalConfigArgTypes,
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
    ...globalTextArgs,
    ...globalConfigArgs,
    caption: "Title",
    options
  },
  render: (args) => {
    // TODO: Explicitly define prop types for better clarity
    // eslint-disable-next-line react/jsx-props-no-spreading
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
