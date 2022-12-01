import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { configTypes } from "../../core/utils/helpers/fetcher";
import CreatePatron from "./CreatePatron.entry";

export default {
  title: "Apps / Create patron",
  component: CreatePatron,
  argTypes: {
    // Config
    [configTypes.fbs]: {
      defaultValue: "",
      control: { type: "text" }
    },
    [configTypes.publizon]: {
      defaultValue: "",
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof CreatePatron>;

const Template: ComponentStory<typeof CreatePatron> = (props) => (
  <CreatePatron {...props} />
);

export const CreatePatronEntry = Template.bind({});
CreatePatronEntry.args = {};
