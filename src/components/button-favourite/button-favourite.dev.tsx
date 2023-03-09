import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import ButtonFavourite, {
  ButtonFavouriteId,
  ButtonFavouriteProps
} from "./button-favourite";
import { withUrls } from "../../core/utils/url";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import { withText } from "../../core/utils/text";

const WrappedButtonFavourite = withText(withUrls(ButtonFavourite));

export default {
  title: "Components  / Button Favourite",
  component: WrappedButtonFavourite,

  argTypes: {
    ...serviceUrlArgs,
    id: {
      control: "text",
      defaultValue: "work-of:870970-basis:45234401"
    },
    addToFavoritesAriaLabelText: {
      control: {
        type: "text"
      },
      defaultValue: "Add element to favorites list"
    },
    removeFromFavoritesAriaLabelText: {
      control: {
        type: "text"
      },
      defaultValue: "Remove element from favorites list"
    }
  }
} as ComponentMeta<typeof WrappedButtonFavourite>;

const Template: ComponentStory<typeof WrappedButtonFavourite> = (
  args: ButtonFavouriteProps
) => {
  // This is a fake situation where we just need to give the button a handler.
  // The handler does nothing.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const addToListRequest = (id: ButtonFavouriteId) => {};

  return (
    <WrappedButtonFavourite {...args} addToListRequest={addToListRequest} />
  );
};

export const favourite = Template.bind({});
favourite.args = {};
