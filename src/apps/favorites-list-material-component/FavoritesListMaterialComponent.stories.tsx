import type { Meta, StoryFn } from "@storybook/react";
import React from "react";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import FavoritesListMaterialComponent from "./FavoritesListMaterialComponent.entry";
import globalTextArgs from "../../core/storybook/globalTextArgs";
import globalConfigArgs from "../../core/storybook/globalConfigArgs";

export default {
  title: "Apps / Favorites list material component",
  component: FavoritesListMaterialComponent,
  argTypes: {
    ...serviceUrlArgs,
    ...globalTextArgs,
    ...globalConfigArgs,
    favoritesListMaterialComponentTitleText: {
      control: {
        type: "text"
      },
      defaultValue: "Your list"
    },
    materialUrl: {
      defaultValue: "/work/:workid",
      control: { type: "text" }
    },
    materialByAuthorText: {
      control: {
        type: "text"
      },
      defaultValue: "By"
    },
    materialAndAuthorText: {
      control: {
        type: "text"
      },
      defaultValue: "and"
    },
    etAlText: {
      control: {
        type: "text"
      },
      defaultValue: "et al."
    },
    favoritesListMaterialComponentGoToListText: {
      control: {
        type: "text"
      },
      defaultValue: "Go to My list"
    },
    favoritesListMaterialComponentGoToListUrl: {
      control: {
        type: "text"
      },
      defaultValue: "https://unsplash.com/photos/wd6YQy0PJt8" // open source image of a red panda
    }
  }
} as Meta<typeof FavoritesListMaterialComponent>;

const Template: StoryFn<typeof FavoritesListMaterialComponent> = (props) => (
  <FavoritesListMaterialComponent {...props} />
);
export const FavoritesListMaterialComponentEntry = Template.bind({});
