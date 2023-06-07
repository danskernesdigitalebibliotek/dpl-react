import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { withQuery } from "@storybook/addon-queryparams";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import FavoritesListMaterialComponent from "./FavoritesListMaterialComponent.entry";

export default {
  title: "Apps / Favorites list material component",
  component: FavoritesListMaterialComponent,
  decorators: [withQuery],
  argTypes: {
    ...serviceUrlArgs,
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
    },
    addToFavoritesAriaLabelText: {
      control: {
        type: "text"
      },
      defaultValue: "Add @title to favorites list"
    },
    removeFromFavoritesAriaLabelText: {
      control: {
        type: "text"
      },
      defaultValue: "Remove @title from favorites list"
    }
  }
} as ComponentMeta<typeof FavoritesListMaterialComponent>;

const Template: ComponentStory<typeof FavoritesListMaterialComponent> = (
  props
) => <FavoritesListMaterialComponent {...props} />;
export const FavoritesListMaterialComponentEntry = Template.bind({});
