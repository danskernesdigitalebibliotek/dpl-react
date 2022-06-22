import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Material } from "./material";

export default {
  title: "Atoms / Material",
  component: Material,
  args: {
    size: "small",
    animate: true,
    tint: "120",
    materialId: "870970-basis:45234401",
    materialUrl: "/",
    materialDescription: "description"
  }
} as ComponentMeta<typeof Material>;

const Template: ComponentStory<typeof Material> = (args) => (
  <Material {...args} />
);

export const item = Template.bind({});
item.args = {};
