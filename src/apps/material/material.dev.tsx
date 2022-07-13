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
    workId: {
      name: "workId",
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof MaterialEntry>;

const Template: ComponentStory<typeof MaterialEntry> = (args) => (
  <MaterialEntry {...args} />
);

export const withStorybookArgs = Template.bind({});
withStorybookArgs.args = {
  pid: `870970-basis:46336461`,
  workId: `work-of:870970-basis:46336461`
};

export const withUrlParams = Template.bind({});
withUrlParams.args = { pid: undefined, workId: undefined };
