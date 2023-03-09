import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { withQuery } from "@storybook/addon-queryparams";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import FavoritesMaterialComponent from "./FavoritesMaterialComponent.entry";

export default {
  title: "Apps / Favorites Material Component",
  component: FavoritesMaterialComponent,
  decorators: [withQuery],
  argTypes: {
    ...serviceUrlArgs,
    favoritesMaterialComponentTitleText: {
      control: {
        type: "text"
      },
      defaultValue: "Your favoritelist :)"
    },
    goToYourFavoritesListText: {
      control: {
        type: "text"
      },
      defaultValue: "GOTO your favorites list"
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

    somethingSimilarSomethingSimilarAuthorText: {
      control: {
        type: "text"
      },
      defaultValue: "Something similar"
    }
  }
} as ComponentMeta<typeof FavoritesMaterialComponent>;

const Template: ComponentStory<typeof FavoritesMaterialComponent> = (props) => (
  <FavoritesMaterialComponent {...props} />
);
export const SomethingSimilarEntry = Template.bind({});

SomethingSimilarEntry.parameters = {
  query: {
    modal: "/work/work-of:870970-basis:54129807"
  }
};
