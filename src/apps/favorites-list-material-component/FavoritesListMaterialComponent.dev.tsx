import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { withQuery } from "@storybook/addon-queryparams";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import FavoritesListMaterialComponent from "./FavoritesListMaterialComponent.entry";
import globalTextArgs from "../../core/storybook/globalTextArgs";
import globalConfigArgs from "../../core/storybook/globalConfigArgs";

export default {
  title: "Apps / Favorites list material component",
  component: FavoritesListMaterialComponent,
  decorators: [withQuery],
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
} as ComponentMeta<typeof FavoritesListMaterialComponent>;

const Template: ComponentStory<typeof FavoritesListMaterialComponent> = (
  props
) => <FavoritesListMaterialComponent {...props} />;
export const FavoritesListMaterialComponentEntry = Template.bind({});
