import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import StoryHeader from "../../components/search-bar/story-header.dev.inc";
import serviceUrlArgs, {
  argTypes as serviceUrlArgTypes
} from "../../core/storybook/serviceUrlArgs";
import SearchHeaderEntry, {
  SearchHeaderEntryProps
} from "./search-header.entry";
import globalTextArgs, {
  argTypes as globalTextArgTypes
} from "../../core/storybook/globalTextArgs";
import globalConfigArgs, {
  argTypes as globalConfigArgTypes
} from "../../core/storybook/globalConfigArgs";

const meta: Meta<typeof SearchHeaderEntry> = {
  title: "Apps / Header",
  component: SearchHeaderEntry,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: can't figure out how to type globalConfigArgTypes, serviceUrlArgTypes and globalTextArgTypes
  argTypes: {
    ...serviceUrlArgTypes,
    ...globalTextArgTypes,
    ...globalConfigArgTypes,
    etAlText: {
      description: "Et al. Text",
      control: { type: "text" }
    },
    searchHeaderIconAltText: {
      description: "Alt text for search button image",
      control: { type: "text" }
    },
    searchHeaderInputLabelText: {
      description: "Search header input label",
      control: { type: "text" }
    },
    inputPlaceholderText: {
      description: "Input field placeholder",
      control: { type: "text" }
    },
    stringSuggestionAuthorText: {
      description: "String suggestion spec - author",
      control: { type: "text" }
    },
    stringSuggestionWorkText: {
      description: "String suggestion spec - work",
      control: { type: "text" }
    },
    stringSuggestionTopicText: {
      description: "String suggestion spec - topic",
      control: { type: "text" }
    },
    searchUrl: {
      description: "Base search url",
      control: { type: "text" }
    },
    advancedSearchUrl: {
      description: "Advanced search url",
      control: { type: "text" }
    },
    searchHeaderDropdownText: {
      description: "Search header advanced search icon label",
      control: { type: "text" }
    },
    materialUrl: {
      description: "Base material page url",
      control: { type: "text" }
    },
    autosuggestBookCategoryText: {
      description: "Book category",
      control: { type: "text" }
    },
    autosuggestEbookCategoryText: {
      description: "Ebook category",
      control: { type: "text" }
    },
    autosuggestFilmCategoryText: {
      description: "Movie category",
      control: { type: "text" }
    },
    autosuggestAudioBookCategoryText: {
      description: "Audio book category",
      control: { type: "text" }
    },
    autosuggestMusicCategoryText: {
      description: "Music category",
      control: { type: "text" }
    },
    autosuggestGameCategoryText: {
      description: "Game category",
      control: { type: "text" }
    },
    autosuggestAnimatedSeriesCategoryText: {
      description: "Animated series category",
      control: { type: "text" }
    },
    inText: {
      description: "x 'in' y",
      control: { type: "text" }
    },
    loadingText: {
      description: "Loading",
      control: { type: "text" }
    },
    searchNoValidCharactersErrorText: {
      description: "Search non-whitespace character error",
      control: { type: "text" }
    },
    headerDropdownItemAdvancedSearchText: {
      description: "Advanced search menu text",
      control: { type: "text" }
    }
  }
};

export default meta;

type Story = StoryObj<typeof SearchHeaderEntry>;

export const Search: Story = {
  args: {
    ...serviceUrlArgs,
    ...globalTextArgs,
    ...globalConfigArgs,
    etAlText: "et al.",
    searchHeaderIconAltText: "search icon",
    searchHeaderInputLabelText: "The main search field.",
    inputPlaceholderText: "Search among the library's materials",
    stringSuggestionAuthorText: "author",
    stringSuggestionWorkText: "material",
    stringSuggestionTopicText: "topic",
    searchUrl: "/search",
    advancedSearchUrl: "/advanced-search",
    searchHeaderDropdownText: "Dropdown with additional search functions",
    materialUrl: "/work/:workid",
    autosuggestBookCategoryText: "Books",
    autosuggestEbookCategoryText: "E-books",
    autosuggestFilmCategoryText: "Movies",
    autosuggestAudioBookCategoryText: "Audio books",
    autosuggestMusicCategoryText: "Music",
    autosuggestGameCategoryText: "Games",
    autosuggestAnimatedSeriesCategoryText: "Animated series",
    inText: "in",
    loadingText: "Loading",
    searchNoValidCharactersErrorText:
      "Input must contain at least one non-whitespace character.",
    headerDropdownItemAdvancedSearchText: "Advanced search"
  },
  // We use the Header component as context to the search bar.
  // It is the Header that creates the Search bar's design -
  // - without it, the Search bar loses its shape.
  render: (args: SearchHeaderEntryProps) => (
    <StoryHeader search={<SearchHeaderEntry {...args} />} />
  )
};
