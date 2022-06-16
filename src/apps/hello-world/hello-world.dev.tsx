import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import HelloWorld, { HelloWorldEntryProps } from "./hello-world.entry";

export default {
  title: "Apps / Hello World",
  component: HelloWorld,
  argTypes: {
    titleText: {
      defaultValue: "Greetings",
      control: { type: "text" }
    },
    introductionText: {
      defaultValue: "We warmly welcome everybody by saying:",
      control: { type: "text" }
    },
    whatText: {
      defaultValue: "world",
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof HelloWorld>;

export const App: ComponentStory<typeof HelloWorld> = (
  args: HelloWorldEntryProps
) => <HelloWorld {...args} />;
