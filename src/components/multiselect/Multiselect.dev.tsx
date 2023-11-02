import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Multiselect from "./Multiselect";

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
  component: Multiselect,
  argTypes: {
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
} as ComponentMeta<typeof Multiselect>;

const Template: ComponentStory<typeof Multiselect> = (args) => (
  <Multiselect {...args} />
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
