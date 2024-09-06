import type { Meta, StoryObj } from "@storybook/react";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import SomethingSimilar from "./SomethingSimilar.entry";
import globalTextArgs from "../../core/storybook/globalTextArgs";
import globalConfigArgs from "../../core/storybook/globalConfigArgs";

const meta: Meta<typeof SomethingSimilar> = {
  title: "Apps / Something similar",
  component: SomethingSimilar,
  argTypes: {
    ...serviceUrlArgs,
    ...globalTextArgs,
    ...globalConfigArgs,
    somethingSimilarTitleText: {
      control: { type: "text" }
    },
    materialUrl: {
      control: { type: "text" }
    },
    materialByAuthorText: {
      control: { type: "text" }
    },
    materialAndAuthorText: {
      control: { type: "text" }
    },
    etAlText: {
      control: { type: "text" }
    },
    somethingSimilarByTheSameAuthorText: {
      control: { type: "text" }
    },
    faust: {
      control: { type: "text" }
    },
    somethingSimilarSomethingSimilarAuthorText: {
      control: { type: "text" }
    }
  }
};

export default meta;

type Story = StoryObj<typeof SomethingSimilar>;

export const Primary: Story = {
  args: {
    ...serviceUrlArgs,
    ...globalTextArgs,
    ...globalConfigArgs,
    somethingSimilarTitleText: "Other materials",
    materialUrl: "/work/:workid",
    materialByAuthorText: "By",
    materialAndAuthorText: "and",
    etAlText: "et al.",
    somethingSimilarByTheSameAuthorText: "By the same author",
    faust: "48953786",
    somethingSimilarSomethingSimilarAuthorText: "Something similar"
  }
};
