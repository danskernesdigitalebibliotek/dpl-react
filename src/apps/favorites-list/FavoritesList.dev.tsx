import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { withQuery } from "@storybook/addon-queryparams";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import FavoritesListEntry, {
  FavoritesListEntryProps
} from "./FavoritesList.entry";
import globalTextArgs from "../../core/storybook/globalTextArgs";

export default {
  title: "Apps / Favorite list",
  component: FavoritesListEntry,
  argTypes: {
    ...serviceUrlArgs,
    ...globalTextArgs,
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
    availabilityAvailableText: {
      name: "Availability: available text",
      defaultValue: "Available",
      control: { type: "text" }
    },
    availabilityUnavailableText: {
      name: "Availability: unavailable text",
      defaultValue: "Unavailable",
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
  },
  decorators: [withQuery]
} as ComponentMeta<typeof FavoritesListEntry>;

export const FavoritesList: ComponentStory<typeof FavoritesListEntry> = (
  args: FavoritesListEntryProps
) => <FavoritesListEntry {...args} />;
