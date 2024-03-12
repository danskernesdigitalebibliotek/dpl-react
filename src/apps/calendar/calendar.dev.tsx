import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Calendar from "./calendar.entry";

export default {
  title: "Apps / Calendar",
  component: Calendar,
  argTypes: {}
} as ComponentMeta<typeof Calendar>;

export const App: ComponentStory<typeof Calendar> = (args) => (
  <Calendar {...args} />
);
