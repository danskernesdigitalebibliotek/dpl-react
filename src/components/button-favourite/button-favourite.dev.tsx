import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import ButtonFavourite, {
  ButtonFavouriteId,
  ButtonFavouriteProps
} from "./button-favourite";
import { withUrls } from "../../core/utils/url";
import { serviceUrlKeys } from "../../core/utils/reduxMiddleware/extractServiceBaseUrls";

const WrappedButtonFavourite = withUrls(ButtonFavourite);

export default {
  title: "Components  / Button Favourite",
  component: WrappedButtonFavourite,

  argTypes: {
    id: {
      control: "text",
      defaultValue: "work-of:870970-basis:45234401"
    },
    [serviceUrlKeys.materialList]: {
      name: "Base url for the material list service",
      defaultValue: "https://prod.materiallist.dandigbib.org",
      control: { type: "text" }
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
