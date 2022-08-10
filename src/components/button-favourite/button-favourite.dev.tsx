import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import ButtonFavourite, { ButtonFavouriteProps } from "./button-favourite";

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
) => <ButtonFavourite {...args} />;

export const favourite = Template.bind({});
favourite.args = {};
