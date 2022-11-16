import { ComponentMeta, ComponentStory } from "@storybook/react";

import React from "react";

import DashBoard from "./dashboard.entry";

export default {
  title: "Apps / DashBoard",

  component: DashBoard
} as ComponentMeta<typeof DashBoard>;

const Template: ComponentStory<typeof DashBoard> = (props) => (
  <DashBoard {...props} />
);

export const DashBoardEntry = Template.bind({});

DashBoardEntry.args = {};
