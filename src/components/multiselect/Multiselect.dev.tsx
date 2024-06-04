import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
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
export default {
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
    }
  },
  args: {
    caption: "Title",
    options
  }
} as ComponentMeta<typeof WrappedMultiselect>;

const Template: ComponentStory<typeof WrappedMultiselect> = (args) => (
  <WrappedMultiselect {...args} />
);

export const Default = Template.bind({});

export const SingleSelected = Template.bind({});
SingleSelected.args = {
  defaultValue: options.slice(0, 1)
};

export const MultipleSelected = Template.bind({});
MultipleSelected.args = {
  defaultValue: options.slice(0, 2)
};
