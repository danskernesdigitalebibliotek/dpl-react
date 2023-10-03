import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Multiselect from "./Multiselect";

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
    options: [
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
    ]
  }
} as ComponentMeta<typeof Multiselect>;

export const Default: ComponentStory<typeof Multiselect> = (args) => (
  <Multiselect {...args} />
);
