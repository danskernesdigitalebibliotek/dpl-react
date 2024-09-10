import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ButtonFavourite, { ButtonFavouriteProps } from "./button-favourite";
import { withUrls } from "../../core/utils/url";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import { withText } from "../../core/utils/text";
import globalTextArgs from "../../core/storybook/globalTextArgs";
import globalConfigArgs from "../../core/storybook/globalConfigArgs";

const WrappedButtonFavourite = withText(withUrls(ButtonFavourite));

const meta: Meta<typeof WrappedButtonFavourite> = {
  title: "Components  / Button Favourite",
  component: WrappedButtonFavourite,
  argTypes: {
    ...serviceUrlArgs,
    ...globalTextArgs,
    ...globalConfigArgs,
    id: {
      control: "text",
      defaultValue: "work-of:870970-basis:45234401"
    },
    title: {
      control: {
        type: "text"
      },
      defaultValue: "title"
    }
  }
};

export default meta;

type Story = StoryObj<typeof WrappedButtonFavourite>;

export const favourite: Story = {
  // eslint-disable-next-line react/jsx-props-no-spreading
  render: (args: ButtonFavouriteProps) => {
    const addToListRequest = () => {};

    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <WrappedButtonFavourite {...args} addToListRequest={addToListRequest} />
    );
  }
};
