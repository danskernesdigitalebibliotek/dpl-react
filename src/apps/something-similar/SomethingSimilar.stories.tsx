import type { Meta, StoryFn } from "@storybook/react";
import React from "react";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import SomethingSimilar from "./SomethingSimilar.entry";
import globalTextArgs from "../../core/storybook/globalTextArgs";
import globalConfigArgs from "../../core/storybook/globalConfigArgs";

export default {
  title: "Apps / Something similar",
  component: SomethingSimilar,
  argTypes: {
    ...serviceUrlArgs,
    ...globalTextArgs,
    ...globalConfigArgs,
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
    etAlText: {
      control: {
        type: "text"
      },
      defaultValue: "et al."
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
} as Meta<typeof SomethingSimilar>;

const Template: StoryFn<typeof SomethingSimilar> = (props) => (
  <SomethingSimilar {...props} />
);
export const SomethingSimilarEntry = Template.bind({});
