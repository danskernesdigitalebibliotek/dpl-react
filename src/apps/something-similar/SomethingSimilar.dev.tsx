import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { withQuery } from "@storybook/addon-queryparams";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import SomethingSimilar from "./SomethingSimilar.entry";

export default {
  title: "Apps / Something similar",
  component: SomethingSimilar,
  decorators: [withQuery],
  argTypes: {
    ...serviceUrlArgs,
    somethingSimilarTitleText: {
      control: {
        type: "text"
      },
      defaultValue: "Other materials"
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
    somethingSimilarByTheSameAuthorText: {
      control: {
        type: "text"
      },
      defaultValue: "By the same author"
    },
    faust: {
      control: {
        type: "text"
      },
      defaultValue: "48953786"
    },
    somethingSimilarSomethingSimilarAuthorText: {
      control: {
        type: "text"
      },
      defaultValue: "Something similar"
    }
  }
} as ComponentMeta<typeof SomethingSimilar>;

const Template: ComponentStory<typeof SomethingSimilar> = (props) => (
  <SomethingSimilar {...props} />
);
export const SomethingSimilarEntry = Template.bind({});
