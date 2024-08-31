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
    },
    openingHoursSidebarLinkText: {
      name: "Opening hours link text",
      defaultValue: "See all opening hours",
      control: { type: "text" }
    },
    openingHoursSidebarBranchesConfig: {
      name: "Opening hours sidebar branches",
      defaultValue:
        '[{"branch_id":"10","name":"Hovedbiblioteket","link":"/hovedbiblioteket","promoted":true},{"branch_id":"12","name":"Brønshøj Bibliotek","link":"/bronshoj-bibliotek","promoted":false},{"branch_id":"18","name":"Læsefilialen","link":"/laesefilialen","promoted":false},{"branch_id":"24","name":"Det virtuelle bibliotek","link":"/det-virtuelle-bibliotek","promoted":false}]',
      control: { type: "text" }
    },
    size: {
      name: "Size",
      defaultValue: "small",
      control: {
        type: "select",
        options: ["small", "large"]
      }
    }
  }
} as ComponentMeta<typeof OpeningHoursSidebar>;

export const App: ComponentStory<typeof OpeningHoursSidebar> = (args) => (
  <OpeningHoursSidebar {...args} />
);
