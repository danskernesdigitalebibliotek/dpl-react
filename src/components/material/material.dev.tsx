import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Material } from "./material";

export default {
  title: "Atoms / Material",
  component: Material,
  argTypes: {
    size: {
      name: "Image size",
      control: { type: "radio" }
    },
    tint: {
      name: "Background color tint",
      control: { type: "radio" }
    },
    animate: {
      name: "Use animation",
      control: { type: "boolean" }
    },
    materialId: {
      name: "Material ID",
      control: { type: "text" }
    },
    materialUrl: {
      name: "Material URL",
      control: { type: "text" }
    },
    materialDescription: {
      name: "Material description",
      control: { type: "text" }
    }
  },
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
