import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Cover } from "./cover";
import { getCurrentLocation } from "../../core/utils/helpers/url";
import { withUrls } from "../../core/utils/url";
import serviceUrlArgs, {
  argTypes as serviceUrlArgTypes
} from "../../core/storybook/serviceUrlArgs";
import globalTextArgs, {
  argTypes as globalTextArgTypes
} from "../../core/storybook/globalTextArgs";
import globalConfigArgs, {
  argTypes as globalConfigArgTypes
} from "../../core/storybook/globalConfigArgs";

const meta: Meta<typeof Cover> = {
  title: "Components / Cover",
  component: Cover,
  argTypes: {
    ...serviceUrlArgTypes,
    ...globalTextArgTypes,
    ...globalConfigArgTypes,
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
    url: {
      name: "URL",
      control: { type: "text" }
    },
    alt: {
      name: "Alt text",
      control: { type: "text" }
    }
  },
  args: {
    ...serviceUrlArgs,
    ...globalTextArgs,
    ...globalConfigArgs,
    size: "small",
    animate: true,
    tint: "120",
    url: new URL("/", getCurrentLocation()),
    alt: "alt text for the image"
  }
};

export default meta;

type Story = StoryObj<typeof Cover>;

export const Item: Story = {
  render: (args) => {
    const WrappedCover = withUrls(Cover);

    return <WrappedCover {...args} />;
  }
};
