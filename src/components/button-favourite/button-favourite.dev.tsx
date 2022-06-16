import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ButtonFavourite } from "./button-favourite";

type ButtonFavouriteProps = typeof ButtonFavourite;

export default {
  title: "Components  / Button Favourite",
  component: ButtonFavourite,

  argTypes: {
    id: {
      control: "text",
      defaultValue: "870970-basis:45234401"
    }
  }
} as ComponentMeta<typeof ButtonFavourite>;

const Template: ComponentStory<typeof ButtonFavourite> = (args) => (
  <ButtonFavourite {...args} />
);

export const favourite = Template.bind({});
favourite.args = {};
