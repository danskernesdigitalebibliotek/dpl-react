import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import globalTextArgs, {
  argTypes as globalTextArgTypes
} from "../../core/storybook/globalTextArgs";
import serviceUrlArgs, {
  argTypes as serviceUrlArgTypes
} from "../../core/storybook/serviceUrlArgs";
import RecommendedMaterial from "./RecommendedMaterial.entry";
import RecommendedMaterialSkeleton from "./RecommendedMaterialSkeleton";
import DisplayMaterialTypeOptions from "./recommendedMaterialDisplayTypeData";

const meta: Meta<typeof RecommendedMaterial> = {
  title: "Apps / Recommended Material",
  component: RecommendedMaterial,
  argTypes: {
    ...globalTextArgTypes,
    ...serviceUrlArgTypes,
    wid: {
      control: { type: "text" }
    },
    materialType: {
      control: { type: "select", options: DisplayMaterialTypeOptions }
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

type Story = StoryObj<typeof RecommendedMaterial>;

export const Primary: Story = {
  args: {
    ...globalTextArgs,
    ...serviceUrlArgs,
    wid: "work-of:870970-basis:22383590",
    materialType: "bog",
    materialUrl: "/work/:workid",
    etAlText: "et al."
  }
};

export const Skeleton: Story = {
  args: {
    ...Primary.args
  },
  render: () => <RecommendedMaterialSkeleton />
};

export const materialWithoutType: Story = {
  args: {
    ...Primary.args,
    materialType: undefined
  }
};
