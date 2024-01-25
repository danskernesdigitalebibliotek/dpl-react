import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import globalTextArgs, {
  GlobalEntryTextProps
} from "../../core/storybook/globalTextArgs";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import RecommendedMaterial, {
  RecommendedMaterialEntryProps
} from "./RecommendedMaterial.entry";
import RecommendedMaterialSkeleton from "./RecommendedMaterialSkeleton";

export default {
  title: "Apps / Recommended Material",
  component: RecommendedMaterial,
  argTypes: {
    wid: {
      defaultValue: "work-of:870970-basis:136336282",
      control: { type: "text" }
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
} as ComponentMeta<typeof RecommendedMaterial>;

export const Default: ComponentStory<typeof RecommendedMaterial> = (
  args: RecommendedMaterialEntryProps & GlobalEntryTextProps
) => <RecommendedMaterial {...args} />;

const SkeletonTemplate: ComponentStory<
  typeof RecommendedMaterialSkeleton
> = () => {
  return <RecommendedMaterialSkeleton />;
};
export const Skeleton = SkeletonTemplate.bind({});
