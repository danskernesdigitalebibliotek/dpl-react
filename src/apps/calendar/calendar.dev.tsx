import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import Calendar from "./calendar.entry";

export default {
  title: "Apps / Calendar",
  component: Calendar,
  argTypes: {
    ...serviceUrlArgs
  }
} as ComponentMeta<typeof Calendar>;

export const App: ComponentStory<typeof Calendar> = (args) => (
  <Calendar {...args} />
);
