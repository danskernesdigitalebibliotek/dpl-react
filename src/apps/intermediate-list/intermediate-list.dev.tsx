import { ComponentMeta, ComponentStory } from "@storybook/react";

import React from "react";

import Fees from "./intermediate-list.entry";

export default {
  title: "Apps / Intermediate-list",

  component: Fees
} as ComponentMeta<typeof Fees>;

const Template: ComponentStory<typeof Fees> = (props) => <Fees {...props} />;

export const IntermediateListEntry = Template.bind({});

IntermediateListEntry.args = {};
