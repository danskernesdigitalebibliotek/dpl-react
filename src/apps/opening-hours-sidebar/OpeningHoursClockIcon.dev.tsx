import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import OpeningHoursClockIcon from "./OpeningHoursClockIcon.entry";

export default {
  title: "Apps / Opening Hour Clock Icon",
  component: OpeningHoursClockIcon,
  argTypes: {
    ...serviceUrlArgs,
    openingHoursText: {
      name: "Opening hours text",
      defaultValue: "Opening hours",
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof OpeningHoursClockIcon>;

export const App: ComponentStory<typeof OpeningHoursClockIcon> = (args) => (
  <OpeningHoursClockIcon {...args} />
);
