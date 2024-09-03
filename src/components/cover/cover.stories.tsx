import React from "react";
import type { Meta, StoryFn } from "@storybook/react";
import { Cover } from "./cover";
import { getCurrentLocation } from "../../core/utils/helpers/url";
import { withUrls } from "../../core/utils/url";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import globalTextArgs from "../../core/storybook/globalTextArgs";
import globalConfigArgs from "../../core/storybook/globalConfigArgs";

export default {
  title: "Components / Cover",
  component: Cover,
  argTypes: {
    ...serviceUrlArgs,
    ...globalTextArgs,
    ...globalConfigArgs,
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
    alt: {
      name: "Alt text",
      control: { type: "text" }
    }
  },
  args: {
    id: "870970-basis:45234401",
    size: "small",
    animate: true,
    tint: "120",
    url: new URL("/", getCurrentLocation()),
    alt: "alt text for the image"
  }
} as Meta<typeof Cover>;

const WrappedCover = withUrls(Cover);
const Template: StoryFn<typeof Cover> = (args) => <WrappedCover {...args} />;

export const item = Template.bind({});
item.args = {};
