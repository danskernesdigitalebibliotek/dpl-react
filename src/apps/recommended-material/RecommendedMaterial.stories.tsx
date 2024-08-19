import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import globalTextArgs, {
  GlobalEntryTextProps
} from "../../core/storybook/globalTextArgs";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import RecommendedMaterial, {
  RecommendedMaterialEntryProps
} from "./RecommendedMaterial.entry";
import RecommendedMaterialSkeleton from "./RecommendedMaterialSkeleton";
import DisplayMaterialTypeOptions from "./recommendedMaterialDisplayTypeData";

export default {
  title: "Apps / Recommended Material",
  component: RecommendedMaterial,
  argTypes: {
    wid: {
      defaultValue: "work-of:870970-basis:22383590",
      control: { type: "text" }
    },
    materialType: {
      defaultValue: "bog",
      control: { type: "select", options: DisplayMaterialTypeOptions }
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
} as Meta<typeof RecommendedMaterial>;

export const Default: StoryFn<typeof RecommendedMaterial> = (
  args: RecommendedMaterialEntryProps & GlobalEntryTextProps
) => <RecommendedMaterial {...args} />;

export const materialWithoutType = Default.bind({});

materialWithoutType.args = {
  materialType: undefined
};

const SkeletonTemplate: StoryFn<typeof RecommendedMaterialSkeleton> = () => {
  return <RecommendedMaterialSkeleton />;
};

export const Skeleton = SkeletonTemplate.bind({});
