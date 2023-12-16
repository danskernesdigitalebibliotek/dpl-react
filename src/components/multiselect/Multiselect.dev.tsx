import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Multiselect from "./Multiselect";
import globalTextArgs from "../../core/storybook/globalTextArgs";
import { withText } from "../../core/utils/text";

const WrappedMultiselect = withText(Multiselect);

const options = [
  {
    item: "First item",
    value: "1"
  },
  {
    item: "2. item",
    value: "2"
  },
  {
    item: "III",
    value: "3"
  }
];
export default {
  title: "Components / Multiselect",
  component: WrappedMultiselect,
  argTypes: {
    ...globalTextArgs,
    caption: {
      name: "Caption",
      control: { type: "text" }
    },
    updateExternalState: {
      table: { disable: true }
    }
  },
  args: {
    ...globalTextArgs,
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
