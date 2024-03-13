import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import OpeningHoursEditor from "./OpeningHoursEditor.entry";

export default {
  title: "Apps / OpeningHoursEditor",
  component: OpeningHoursEditor,
  argTypes: {
    ...serviceUrlArgs
  }
} as ComponentMeta<typeof OpeningHoursEditor>;

export const App: ComponentStory<typeof OpeningHoursEditor> = (args) => (
  <OpeningHoursEditor {...args} />
);
