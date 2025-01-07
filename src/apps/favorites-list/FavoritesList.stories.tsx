import type { Meta, StoryObj } from "@storybook/react";
import serviceUrlArgs, {
  argTypes as serviceUrlArgTypes
} from "../../core/storybook/serviceUrlArgs";
import FavoritesListEntry from "./FavoritesList.entry";
import globalTextArgs, {
  argTypes as globalTextArgTypes
} from "../../core/storybook/globalTextArgs";
import globalConfigArgs, {
  argTypes as globalConfigArgTypes
} from "../../core/storybook/globalConfigArgs";

const meta: Meta<typeof FavoritesListEntry> = {
  title: "Apps / Favorite list",
  component: FavoritesListEntry,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: can't figure out how to type serviceUrlArgTypes and globalTextArgTypes
  argTypes: {
    ...serviceUrlArgTypes,
    ...globalTextArgTypes,
    ...globalConfigArgTypes,
    pageSizeDesktop: {
      description: "Number of favorite items on desktop",
      control: { type: "number" }
    },
    blacklistedAvailabilityBranchesConfig: {
      description: "Blacklisted Availability branches",
      control: { type: "text" }
    },
    searchUrl: {
      description: "Path to the search result page",
      control: { type: "text" }
    },
    pageSizeMobile: {
      description: "Number of favorite items on mobile",
      control: { type: "number" }
    },
    showMoreText: {
      description: "Show more Text",
      control: { type: "text" }
    },
    resultPagerStatusText: {
      description: "Result pager status text",
      control: { type: "text" }
    },
    materialUrl: {
      description: "Path to the material page",
      control: { type: "text" }
    },
    favoritesListMaterialsText: {
      control: { type: "text" }
    },
    favoritesListHeaderText: {
      control: { type: "text" }
    },
    byAuthorText: {
      control: { type: "text" }
    },
    etAlText: {
      control: { type: "text" }
    },
    favoritesListEmptyText: {
      control: { type: "text" }
    },
    numberDescriptionText: {
      description: "Number description",
      control: { type: "text" }
    },
    inSeriesText: {
      description: "In series",
      control: { type: "text" }
    }
  }
};

export default meta;

type Story = StoryObj<typeof FavoritesListEntry>;

export const Primary: Story = {
  args: {
    ...serviceUrlArgs,
    ...globalTextArgs,
    ...globalConfigArgs,
    pageSizeDesktop: 50,
    blacklistedAvailabilityBranchesConfig:
      "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
    searchUrl: "/search",
    pageSizeMobile: 20,
    showMoreText: "show more",
    resultPagerStatusText: "Showing @itemsShown out of @hitcount results",
    materialUrl: "/work/:workid",
    favoritesListMaterialsText: "@count materials",
    favoritesListHeaderText: "Favorites",
    byAuthorText: "By",
    etAlText: "...",
    favoritesListEmptyText: "Your favorites list is empty",
    numberDescriptionText: "Nr.",
    inSeriesText: "in series"
  }
};
