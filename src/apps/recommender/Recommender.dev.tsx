import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import Recommender from "./Recommender.entry";

export default {
  title: "Apps / Recommender",
  component: Recommender,
  argTypes: {
    ...serviceUrlArgs
  }
} as ComponentMeta<typeof Recommender>;

const Template: ComponentStory<typeof Recommender> = (props) => (
  <Recommender {...props} />
);
export const RecommenderEntry = Template.bind({});
RecommenderEntry.args = {};
