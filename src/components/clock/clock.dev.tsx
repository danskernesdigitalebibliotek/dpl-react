import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Clock } from "./clock";

export default {
  title: "Components/Clock",
  component: Clock
} as ComponentMeta<typeof Clock>;

const Template: ComponentStory<typeof Clock> = () => <Clock />;

export const ClockNow = Template.bind({});
