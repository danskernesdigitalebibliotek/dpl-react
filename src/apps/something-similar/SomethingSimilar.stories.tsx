import type { Meta, StoryObj } from "@storybook/react";
import serviceUrlArgs, {
  argTypes as serviceUrlArgTypes
} from "../../core/storybook/serviceUrlArgs";
import SomethingSimilar from "./SomethingSimilar.entry";
import globalTextArgs, {
  argTypes as globalTextArgTypes
} from "../../core/storybook/globalTextArgs";
import globalConfigArgs, {
  argTypes as globalConfigArgTypes
} from "../../core/storybook/globalConfigArgs";

const meta: Meta<typeof SomethingSimilar> = {
  title: "Apps / Something similar",
  component: SomethingSimilar,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: can't figure out how to type serviceUrlArgTypes and globalTextArgTypes
  argTypes: {
    ...serviceUrlArgTypes,
    ...globalTextArgTypes,
    ...globalConfigArgTypes,
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
