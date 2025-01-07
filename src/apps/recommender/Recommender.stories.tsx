import type { Meta, StoryObj } from "@storybook/react";
import serviceUrlArgs, {
  argTypes as serviceUrlArgTypes
} from "../../core/storybook/serviceUrlArgs";
import Recommender from "./Recommender.entry";
import globalTextArgs, {
  argTypes as globalTextArgTypes
} from "../../core/storybook/globalTextArgs";
import globalConfigArgs, {
  argTypes as globalConfigArgTypes
} from "../../core/storybook/globalConfigArgs";

const meta: Meta<typeof Recommender> = {
  title: "Apps / Recommender",
  component: Recommender,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: can't figure out how to type serviceUrlArgTypes and globalTextArgTypes
  argTypes: {
    ...serviceUrlArgTypes,
    ...globalTextArgTypes,
    ...globalConfigArgTypes,
    emptyRecommenderSearchConfig: {
      control: { type: "text" }
    },
    recommenderTitleLoansText: {
      control: { type: "text" }
    },
    recommenderTitleReservationsText: {
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
    recommenderTitleInspirationText: {
      control: { type: "text" }
    },
    materialUrl: {
      control: { type: "text" }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Recommender>;

export const Primary: Story = {
  args: {
    ...serviceUrlArgs,
    ...globalTextArgs,
    ...globalConfigArgs,
    emptyRecommenderSearchConfig: "Mimbo jimbo",
    recommenderTitleLoansText:
      "Because you have borrowed @title you may also like",
    recommenderTitleReservationsText:
      "Because you have reserved @title you may also like",
    materialByAuthorText: "By",
    materialAndAuthorText: "and",
    etAlText: "et al.",
    recommenderTitleInspirationText: "For your inspiration",
    materialUrl: "/work/:workid"
  }
};
