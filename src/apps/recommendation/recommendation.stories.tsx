import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import globalTextArgs, {
  argTypes as globalTextArgTypes
} from "../../core/storybook/globalTextArgs";
import serviceUrlArgs, {
  argTypes as serviceUrlArgTypes
} from "../../core/storybook/serviceUrlArgs";

import DisplayMaterialTypeOptions from "../recommended-material/recommendedMaterialDisplayTypeData";
import RecommendationSkeleton from "./RecommendationSkeleton";
import Recommendation from "./recommendation.entry";

const meta: Meta<typeof Recommendation> = {
  title: "Apps / Recommendation",
  component: Recommendation,
  argTypes: {
    ...globalTextArgTypes,
    ...serviceUrlArgTypes,
    wid: {
      control: { type: "text" }
    },
    materialType: {
      control: { type: "select", options: DisplayMaterialTypeOptions }
    },
    positionImageRight: {
      control: { type: "boolean" }
    },
    materialUrl: {
      control: { type: "text" }
    },
    etAlText: {
      description: "Et al. Text",
      control: { type: "text" }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Recommendation>;

export const Primary: Story = {
  args: {
    ...globalTextArgs,
    ...serviceUrlArgs,
    wid: "work-of:870970-basis:22383590",
    materialType: "bog",
    positionImageRight: false,
    materialUrl: "/work/:workid",
    etAlText: "et al."
  }
};

export const Skeleton: Story = {
  args: {
    ...Primary.args
  },
  render: (args) => <RecommendationSkeleton {...args} />
};
