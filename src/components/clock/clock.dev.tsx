import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Clock, ClockProps } from "./clock";

export default {
  title: "Components/Clock",
  component: Clock
} as ComponentMeta<typeof Clock>;

const Template: ComponentStory<typeof Clock> = (args: ClockProps) => (
  <Clock {...args} />
);
export const ClockNow = Template.bind({});
ClockNow.args = {
  ariaLabel: "Det er"
};
