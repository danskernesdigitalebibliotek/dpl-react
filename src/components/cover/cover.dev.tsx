import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Cover } from "./cover";
import { getCurrentLocation } from "../../core/utils/helpers/url";
import { withUrls } from "../../core/utils/url";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import globalTextArgs from "../../core/storybook/globalTextArgs";

export default {
  title: "Components / Cover",
  component: Cover,
  argTypes: {
    ...globalTextArgs,
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
    id: {
      name: "PID",
      control: { type: "text" }
    },
    url: {
      name: "URL",
      control: { type: "string" }
    },
    description: {
      name: "Description",
      control: { type: "text" }
    }
  },
  args: {
    ...serviceUrlArgs,
    id: "870970-basis:45234401",
    size: "small",
    animate: true,
    tint: "120",
    url: new URL("/", getCurrentLocation()),
    description: "description"
  }
} as ComponentMeta<typeof Cover>;

const WrappedCover = withUrls(Cover);
const Template: ComponentStory<typeof Cover> = (args) => (
  <WrappedCover {...args} />
);

export const item = Template.bind({});
item.args = {};