import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import Recommender from "./Recommender.entry";
import globalTextArgs from "../../core/storybook/globalTextArgs";

export default {
  title: "Apps / Recommender",
  component: Recommender,
  argTypes: {
    ...serviceUrlArgs,
    ...globalTextArgs,
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
    etAlText: {
      control: {
        type: "text"
      },
      defaultValue: "et al."
    },
    recommenderTitleInspirationText: {
      control: {
        type: "text"
      },
      defaultValue: "For your inspiration"
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
