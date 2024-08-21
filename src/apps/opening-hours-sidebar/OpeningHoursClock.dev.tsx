import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import OpeningHoursClock from "./OpeningHoursClock.entry";

export default {
  title: "Apps / Opening Hour Clock",
  component: OpeningHoursClock,
  argTypes: {
    ...serviceUrlArgs,
    openingHoursText: {
      name: "Opening hours text",
      defaultValue: "Opening hours",
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof OpeningHoursClock>;

export const App: ComponentStory<typeof OpeningHoursClock> = (args) => (
  <OpeningHoursClock {...args} />
);
