import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Cover } from "./cover";

export default {
  title: "Atoms / Cover",
  component: Cover,
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
    url: {
      name: "URL",
      control: { type: "text" }
    },
    description: {
      name: "Description",
      control: { type: "text" }
    }
  },
  args: {
    size: "small",
    animate: true,
    tint: "120",
    pid: "870970-basis:45234401",
    url: "/",
    description: "description"
  }
} as ComponentMeta<typeof Cover>;

const Template: ComponentStory<typeof Cover> = (args) => <Cover {...args} />;

export const item = Template.bind({});
item.args = {};
