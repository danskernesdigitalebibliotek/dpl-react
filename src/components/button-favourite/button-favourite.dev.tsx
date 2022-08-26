import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import ButtonFavourite, {
  ButtonFavouriteId,
  ButtonFavouriteProps
} from "./button-favourite";

export default {
  title: "Components  / Button Favourite",
  component: ButtonFavourite,

  argTypes: {
    id: {
      control: "text",
      defaultValue: "work-of:870970-basis:45234401"
    }
  }
} as ComponentMeta<typeof ButtonFavourite>;

const Template: ComponentStory<typeof ButtonFavourite> = (
  args: ButtonFavouriteProps
) => {
  // This is a fake situation where we just need to give the button a handler.
  // The handler does nothing.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const addToListRequest = (id: ButtonFavouriteId) => {};

  return <ButtonFavourite {...args} addToListRequest={addToListRequest} />;
};

export const favourite = Template.bind({});
favourite.args = {};
