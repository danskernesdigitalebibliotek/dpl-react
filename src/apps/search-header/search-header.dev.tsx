import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import StoryHeader from "../../components/search-bar/story-header.dev.inc";
import SearchHeaderEntry, {
  SearchHeaderEntryProps
} from "./search-header.entry";

export default {
  title: "Apps / Search Header",
  component: SearchHeaderEntry,
  argTypes: {
    altText: {
      name: "Alt text for search button image",
      defaultValue: "søgeikon",
      control: { type: "text" }
    },
    inputPlaceholderText: {
      name: "Input field placeholder",
      defaultValue: "Søg blandt bibliotekets materialer",
      control: { type: "text" }
    },
    stringSuggestionAuthorText: {
      name: "String suggestion spec - author",
      defaultValue: "forfatter",
      control: { type: "text" }
    },
    stringSuggestionWorkText: {
      name: "String suggestion spec - work",
      defaultValue: "materiale",
      control: { type: "text" }
    },
    stringSuggestionTopicText: {
      name: "String suggestion spec - topic",
      defaultValue: "emne",
      control: { type: "text" }
    },
    searchUrl: {
      name: "Base search url",
      defaultValue: "/search",
      control: { type: "text" }
    },
    materialUrl: {
      name: "Base material page url",
      defaultValue: "/work/:workid",
      control: { type: "text" }
    },
    autosuggestBookCategoryText: {
      name: "Book category",
      defaultValue: "Bøger",
      control: { type: "text" }
    },
    autosuggestEbookCategoryText: {
      name: "Ebook category",
      defaultValue: "Ebøger",
      control: { type: "text" }
    },
    autosuggestFilmCategoryText: {
      name: "Movie category",
      defaultValue: "Film",
      control: { type: "text" }
    },
    autosuggestAudioBookCategoryText: {
      name: "Audio book category",
      defaultValue: "Lydbøger",
      control: { type: "text" }
    },
    autosuggestMusicCategoryText: {
      name: "Music category",
      defaultValue: "Musik",
      control: { type: "text" }
    },
    autosuggestGameCategoryText: {
      name: "Game category",
      defaultValue: "Spil",
      control: { type: "text" }
    },
    autosuggestAnimatedSeriesCategoryText: {
      name: "Animated series category",
      defaultValue: "Tegneserier",
      control: { type: "text" }
    },
    inText: {
      name: "x 'in' y",
      defaultValue: "i",
      control: { type: "text" }
    },
    LoadingText: {
      name: "Loading",
      defaultValue: "Indlæsesr",
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof SearchHeaderEntry>;

export const Default: ComponentStory<typeof SearchHeaderEntry> = (
  args: SearchHeaderEntryProps
) => (
  // We use the Header component as context to the search bar.
  // It is the Header that creates the Search bar's design -
  // - without it, the Search bar loses its shape.
  <StoryHeader>
    <SearchHeaderEntry {...args} />
  </StoryHeader>
);
