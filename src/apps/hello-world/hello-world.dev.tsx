import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import HelloWorld, { HelloWorldEntryProps } from "./hello-world.entry";

export default {
  title: "Hello World",
  argTypes: {
    titleText: {
      defaultValue: "Greetings"
    },
    introductionText: {
      defaultValue: "We warmly welcome everybody by saying:"
    }
  }
} as ComponentMeta<typeof HelloWorld>;

export const App: ComponentStory<typeof HelloWorld> = (
  args: HelloWorldEntryProps
) => <HelloWorld {...args} />;
