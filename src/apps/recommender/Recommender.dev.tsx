import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import Recommender from "./Recommender.entry";

export default {
  title: "Apps / Recommender",
  component: Recommender,
  argTypes: {
    ...serviceUrlArgs,
    emptyRecommenderSearchConfig: {
      defaultValue: "Mimbo jimbo",
      control: { type: "text" }
    },
    recommenderTitleLoansText: {
      control: {
        type: "text"
      },
      defaultValue: "Because you have borrowed @title you may also like"
    },
    recommenderTitleReservationsText: {
      control: {
        type: "text"
      },
      defaultValue: "Because you have reserved @title you may also like"
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
    recommenderTitleInspirationText: {
      control: {
        type: "text"
      },
      defaultValue: "For your inspiration"
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
    },
    materialUrl: {
      defaultValue: "/work/:workid",
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof Recommender>;

const Template: ComponentStory<typeof Recommender> = (props) => (
  <Recommender {...props} />
);
export const RecommenderEntry = Template.bind({});
RecommenderEntry.args = {};
