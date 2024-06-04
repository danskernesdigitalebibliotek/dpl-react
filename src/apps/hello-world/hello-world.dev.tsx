import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import HelloWorld, { HelloWorldEntryProps } from "./hello-world.entry";
import globalTextArgs, {
  GlobalEntryTextProps
} from "../../core/storybook/globalTextArgs";

export default {
  title: "Apps / Hello World",
  component: HelloWorld,
  argTypes: {
    ...globalTextArgs,
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
  args: HelloWorldEntryProps & GlobalEntryTextProps
) => <HelloWorld {...args} />;
