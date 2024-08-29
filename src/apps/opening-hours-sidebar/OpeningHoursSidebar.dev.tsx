import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import OpeningHoursSidebar from "./OpeningHoursSidebar.entry";

export default {
  title: "Apps / Opening Hour Sidebar",
  component: OpeningHoursSidebar,
  argTypes: {
    ...serviceUrlArgs,
    openingHoursText: {
      name: "Opening hours text",
      defaultValue: "Opening hours",
      control: { type: "text" }
    },
    openingHoursSidebarTodayText: {
      name: "Opening hours today text",
      defaultValue: "Today (@toDayString)",
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof OpeningHoursSidebar>;

export const App: ComponentStory<typeof OpeningHoursSidebar> = (args) => (
  <OpeningHoursSidebar {...args} />
);
