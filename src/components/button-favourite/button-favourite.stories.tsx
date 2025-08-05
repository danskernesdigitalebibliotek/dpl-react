import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import ButtonFavourite, { ButtonFavouriteProps } from "./button-favourite";
import { withUrls } from "../../core/utils/url";
import serviceUrlArgs, {
  argTypes as serviceUrlArgTypes
} from "../../core/storybook/serviceUrlArgs";
import { withText } from "../../core/utils/text";
import globalTextArgs, {
  argTypes as globalTextArgTypes
} from "../../core/storybook/globalTextArgs";
import globalConfigArgs, {
  argTypes as globalConfigArgTypes
} from "../../core/storybook/globalConfigArgs";

const WrappedButtonFavourite = withText(withUrls(ButtonFavourite));

const meta: Meta<typeof WrappedButtonFavourite> = {
  title: "Components  / Button Favourite",
  component: WrappedButtonFavourite,
  argTypes: {
    ...serviceUrlArgTypes,
    ...globalTextArgTypes,
    ...globalConfigArgTypes,
    id: {
      control: "text"
    },
    title: {
      control: {
        type: "text"
      }
    }
  },
  args: {
    ...serviceUrlArgs,
    ...globalTextArgs,
    ...globalConfigArgs,
    id: "work-of:870970-basis:45234401",
    title: "title"
  }
};

export default meta;

type Story = StoryObj<typeof WrappedButtonFavourite>;

export const favourite: Story = {
  render: (args: ButtonFavouriteProps) => {
    const addToListRequest = () => {};

    return (
      <WrappedButtonFavourite {...args} addToListRequest={addToListRequest} />
    );
  }
};
