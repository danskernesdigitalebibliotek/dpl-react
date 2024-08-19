import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import FavoritesListEntry, {
  FavoritesListEntryProps
} from "./FavoritesList.entry";
import globalTextArgs from "../../core/storybook/globalTextArgs";
import globalConfigArgs from "../../core/storybook/globalConfigArgs";

export default {
  title: "Apps / Favorite list",
  component: FavoritesListEntry,
  argTypes: {
    ...serviceUrlArgs,
    ...globalTextArgs,
    ...globalConfigArgs,
    pageSizeDesktop: {
      name: "Number of favorite items on desktop",
      defaultValue: 50,
      control: { type: "number" }
    },
    blacklistedAvailabilityBranchesConfig: {
      name: "Blacklisted Availability branches",
      defaultValue: "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
      control: { type: "text" }
    },
    searchUrl: {
      name: "Path to the search result page",
      defaultValue: "/search",
      control: { type: "text" }
    },
    pageSizeMobile: {
      name: "Number of favorite items on mobile",
      defaultValue: 20,
      control: { type: "number" }
    },
    showMoreText: {
      name: "Show more Text",
      defaultValue: "show more",
      control: { type: "text" }
    },
    resultPagerStatusText: {
      name: "Result pager status text",
      defaultValue: "Showing @itemsShown out of @hitcount results",
      control: { type: "text" }
    },
    materialUrl: {
      name: "Path to the material page",
      defaultValue: "/work/:workid",
      control: { type: "text" }
    },
    favoritesListMaterialsText: {
      defaultValue: "@count materials",
      control: { type: "text" }
    },
    favoritesListHeaderText: {
      defaultValue: "Favorites",
      control: { type: "text" }
    },
    byAuthorText: {
      defaultValue: "By",
      control: { type: "text" }
    },
    etAlText: {
      defaultValue: "...",
      control: { type: "text" }
    },
    favoritesListEmptyText: {
      defaultValue: "Your favorites list is empty",
      control: { type: "text" }
    },
    numberDescriptionText: {
      name: "Number description",
      defaultValue: "Nr.",
      control: { type: "text" }
    },
    inSeriesText: {
      name: "In series",
      defaultValue: "in series",
      control: { type: "text" }
    }
  }
} as Meta<typeof FavoritesListEntry>;

export const FavoritesList: StoryFn<typeof FavoritesListEntry> = (
  args: FavoritesListEntryProps
) => <FavoritesListEntry {...args} />;
