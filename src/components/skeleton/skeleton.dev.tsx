import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Skeleton, SkeletonProps } from "./skeleton";

export default {
  title: "Atoms/Skeleton",
  component: Skeleton
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args: SkeletonProps) => (
  <Skeleton {...args} />
);
export const SkeletonDemo = Template.bind({});
SkeletonDemo.args = {
  height: "100px",
  width: "100px",
  br: "5px",
  mt: "5px",
  mb: "5px",
  mr: "5px",
  ml: "5px"
};
