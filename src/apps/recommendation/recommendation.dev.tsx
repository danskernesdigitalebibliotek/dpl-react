import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Recommendation, {
  RecommendationEntryProps
} from "./recommendation.entry";
import globalTextArgs, {
  GlobalEntryTextProps
} from "../../core/storybook/globalTextArgs";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import RecommendationSkeleton from "./RecommendationSkeleton";

export default {
  title: "Apps / Recommendation",
  component: Recommendation,
  argTypes: {
    wid: {
      defaultValue: "work-of:870970-basis:136336282",
      control: { type: "text" }
    },
    positionImageRight: {
      defaultValue: false,
      control: { type: "boolean" }
    },
    materialUrl: {
      defaultValue: "/work/:workid",
      control: { type: "text" }
    },
    etAlText: {
      name: "Et al. Text",
      defaultValue: "et al.",
      control: { type: "text" }
    },
    ...globalTextArgs,
    ...serviceUrlArgs
  }
} as ComponentMeta<typeof Recommendation>;

export const App: ComponentStory<typeof Recommendation> = (
  args: RecommendationEntryProps & GlobalEntryTextProps
) => <Recommendation {...args} />;

const SkeletonTemplate: ComponentStory<typeof RecommendationSkeleton> = (
  args
) => {
  return <RecommendationSkeleton {...args} />;
};
export const Skeleton = SkeletonTemplate.bind({});

Skeleton.argTypes = {
  positionImageRight: {
    defaultValue: false,
    control: { type: "boolean" }
  }
};
