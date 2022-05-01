import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Hello, { HelloProps } from "./hello";

export default {
  title: "Components/Hello",
  argTypes: {
    what: {
      defaultValue: "world"
    },
    shouldBeEmphasized: {
      defaultValue: true
    }
  }
} as ComponentMeta<typeof Hello>;

const Template: ComponentStory<typeof Hello> = (args: HelloProps) => (
  <Hello {...args} />
);

export const HelloWorld = Template.bind({});
HelloWorld.args = {
  what: "world"
};

export const HelloHuman = Template.bind({});
HelloHuman.args = {
  what: "human"
};

export const HelloAnimal = Template.bind({});
HelloAnimal.args = {
  what: "animal"
};
