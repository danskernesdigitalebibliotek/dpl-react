import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { Hello, HelloProps, TextProps } from "./hello";
import { withText } from "../../core/utils/text";
import globalTextArgs from "../../core/storybook/globalTextArgs";
import globalConfigArgs from "../../core/storybook/globalConfigArgs";

type Args = {
  args: HelloProps | TextProps;
};

// Add withText HOC because the Hello component uses texts.
const WrappedHello = withText(Hello);

export default {
  title: "Components/Hello",
  component: WrappedHello,
  argTypes: {
    ...globalTextArgs,
    ...globalConfigArgs,
    whatText: {
      defaultValue: "world",
      control: { type: "text" }
    },
    shouldBeEmphasized: {
      defaultValue: true
    }
  }
} as Meta<typeof WrappedHello>;

const Template: StoryFn<typeof WrappedHello> = (props: HelloProps) => (
  <WrappedHello {...props} />
);

export const HelloWorld = Template.bind({});

// Create a sub story showing what happens if the whatText prop is set to "human".
export const HelloHuman = Template.bind({});
(HelloWorld as Args).args = {
  whatText: "human"
};

// Create a sub story showing what happens if the whatText prop is set to "animal".
export const HelloAnimal = Template.bind({});
(HelloWorld as Args).args = {
  whatText: "animal"
};
