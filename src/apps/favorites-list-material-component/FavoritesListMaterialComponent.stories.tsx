import type { Meta, StoryObj } from "@storybook/react";
import serviceUrlArgs, {
  argTypes as serviceUrlArgTypes
} from "../../core/storybook/serviceUrlArgs";
import FavoritesListMaterialComponent from "./FavoritesListMaterialComponent.entry";
import globalTextArgs, {
  argTypes as globalTextArgTypes
} from "../../core/storybook/globalTextArgs";
import globalConfigArgs, {
  argTypes as globalConfigArgTypes
} from "../../core/storybook/globalConfigArgs";

const meta: Meta<typeof FavoritesListMaterialComponent> = {
  title: "Apps / Favorites list material component",
  component: FavoritesListMaterialComponent,

  // @ts-ignore: can't figure out how to type serviceUrlArgTypes and globalTextArgTypes
  argTypes: {
    ...serviceUrlArgTypes,
    ...globalTextArgTypes,
    ...globalConfigArgTypes,
    favoritesListMaterialComponentTitleText: {
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
    favoritesListMaterialComponentGoToListText: {
      control: { type: "text" }
    },
    favoritesListMaterialComponentGoToListUrl: {
      control: { type: "text" }
    }
  }
};

export default meta;

type Story = StoryObj<typeof FavoritesListMaterialComponent>;

export const Primary: Story = {
  args: {
    ...serviceUrlArgs,
    ...globalTextArgs,
    ...globalConfigArgs,
    favoritesListMaterialComponentTitleText: "Your list",
    materialUrl: "/work/:workid",
    materialByAuthorText: "By",
    materialAndAuthorText: "and",
    etAlText: "et al.",
    favoritesListMaterialComponentGoToListText: "Go to My list",
    favoritesListMaterialComponentGoToListUrl:
      "https://unsplash.com/photos/wd6YQy0PJt8" // open source image of a red panda
  }
};
