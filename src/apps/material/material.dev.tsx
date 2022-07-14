import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import MaterialEntry from "./material.entry";

export default {
  title: "Apps / Material",
  component: MaterialEntry,
  argTypes: {
    pid: {
      name: "pid",
      control: { type: "text" }
    },
    materialHeaderAuthorByText: {
      name: "Af forfatter",
      defaultValue: "Af ",
      control: { type: "text" }
    },
    periodikumSelectYearText: {
      name: "År",
      defaultValue: "År",
      control: { type: "text" }
    },
    periodikumSelectWeekText: {
      name: "Uge",
      defaultValue: "Uge",
      control: { type: "text" }
    },
    reserveBookText: {
      name: "Reserve book",
      defaultValue: "RESERVER BOG",
      control: { type: "text" }
    },
    fineOnBookshelfText: {
      name: "Fine on bookshelf",
      defaultValue: "FINE PÅ HYLDEN",
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof MaterialEntry>;

const Template: ComponentStory<typeof MaterialEntry> = (args) => (
  <MaterialEntry {...args} />
);

export const withStorybookArgs = Template.bind({});
withStorybookArgs.args = {
  pid: `870970-basis:52557240`
};

export const withUrlParams = Template.bind({});
withUrlParams.args = { pid: undefined };
