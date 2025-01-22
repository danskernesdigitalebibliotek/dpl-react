import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import serviceUrlArgs, {
  argTypes as serviceUrlArgTypes
} from "../../core/storybook/serviceUrlArgs";
import OpeningHoursSidebar from "./OpeningHoursSidebar.entry";

const meta: Meta<typeof OpeningHoursSidebar> = {
  title: "Apps / Opening Hour Sidebar",
  component: OpeningHoursSidebar,
  argTypes: {
    ...serviceUrlArgTypes,
    openingHoursSidebarTitleText: {
      name: "Today's opening hours",
      defaultValue: "Today's opening hours",
      control: { type: "text" }
    },
    openingHoursText: {
      name: "Opening hours text",
      defaultValue: "Opening hours",
      control: { type: "text" }
    },
    openingHoursSidebarLinkText: {
      name: "Opening hours link text",
      defaultValue: "Go to @branchName",
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
  },
  args: {
    ...serviceUrlArgs,
    openingHoursSidebarTitleText: "Today's opening hours",
    openingHoursText: "Opening hours",
    openingHoursSidebarLinkText: "Go to @branchName",
    openingHoursSidebarBranchesConfig:
      '[{"branch_id":"10","name":"Hovedbiblioteket","link":"/hovedbiblioteket","promoted":true},{"branch_id":"12","name":"Brønshøj Bibliotek","link":"/bronshoj-bibliotek","promoted":false},{"branch_id":"18","name":"Læsefilialen","link":"/laesefilialen","promoted":false},{"branch_id":"24","name":"Det virtuelle bibliotek","link":"/det-virtuelle-bibliotek","promoted":false}]',
    size: "small"
  }
};

export default meta;

type Story = StoryObj<typeof OpeningHoursSidebar>;

export const App: Story = {
  // TODO: Explicitly define prop types for better clarity
  // eslint-disable-next-line react/jsx-props-no-spreading
  render: (args) => <OpeningHoursSidebar {...args} />
};
