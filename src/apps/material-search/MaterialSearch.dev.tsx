import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import globalConfigArgs from "../../core/storybook/globalConfigArgs";
import globalTextArgs, {
  GlobalEntryTextProps
} from "../../core/storybook/globalTextArgs";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import MaterialSearch, {
  MaterialSearchEntryProps,
  MaterialSearchEntryTextProps
} from "./MaterialSearch.entry";

// Can't use useId() here since this is not inside a functional component.
const uniqueIdentifier = Math.floor(Math.random() * 10000);

export default {
  title: "Apps / Material Search",
  component: MaterialSearch,
  argTypes: {
    uniqueIdentifier: {
      defaultValue: uniqueIdentifier,
      control: { type: "number" }
    },
    previouslySelectedWorkId: {
      defaultValue: "work-of:870970-basis:134320257",
      control: { type: "text" }
    },
    previouslySelectedMaterialType: {
      defaultValue: "bog",
      control: { type: "text" }
    },
    etAlText: {
      defaultValue: "et al.",
      control: { type: "text" }
    },
    materialSearchSearchInputText: {
      defaultValue: "Search for material",
      control: { type: "text" }
    },
    materialSearchMaterialTypeSelectorText: {
      defaultValue: "Select material type",
      control: { type: "text" }
    },
    materialSearchMaterialTypeSelectorNoneOptionText: {
      defaultValue: "Select material type",
      control: { type: "text" }
    },
    materialSearchNoMaterialSelectedText: {
      defaultValue: "No material selected",
      control: { type: "text" }
    },
    materialSearchPreviewTitle: {
      defaultValue: "Title",
      control: { type: "text" }
    },
    materialSearchPreviewAuthor: {
      defaultValue: "Author",
      control: { type: "text" }
    },
    materialSearchPreviewPublicationYear: {
      defaultValue: "Publication year",
      control: { type: "text" }
    },
    materialSearchPreviewSource: {
      defaultValue: "Source",
      control: { type: "text" }
    },
    materialSearchPreviewWorkId: {
      defaultValue: "Work ID",
      control: { type: "text" }
    },
    materialSearchLoadingText: {
      defaultValue: "Loading...",
      control: { type: "text" }
    },
    materialSearchAmountOfResultsText: {
      defaultValue: "Amount of hits",
      control: { type: "text" }
    },
    materialSearchNoResultsText: {
      defaultValue: "No results",
      control: { type: "text" }
    },
    materialSearchAriaButtonSelectWorkWithText: {
      defaultValue: "Select work with title @title",
      control: { type: "text" }
    },
    materialSearchSearchInputPlaceholderText: {
      defaultValue: "Enter search terms",
      control: { type: "text" }
    },
    materialSearchPreviewTitleText: {
      defaultValue: "Title",
      control: { type: "text" }
    },
    materialSearchPreviewAuthorText: {
      defaultValue: "Author",
      control: { type: "text" }
    },
    materialSearchPreviewPublicationYearText: {
      defaultValue: "Publication year",
      control: { type: "text" }
    },
    materialSearchPreviewSourceText: {
      defaultValue: "Source",
      control: { type: "text" }
    },
    materialSearchPreviewWorkIdText: {
      defaultValue: "Work ID",
      control: { type: "text" }
    },
    ...globalTextArgs,
    ...serviceUrlArgs,
    ...globalConfigArgs
  }
} as ComponentMeta<typeof MaterialSearch>;

export const Default: ComponentStory<typeof MaterialSearch> = (
  args: MaterialSearchEntryProps &
    MaterialSearchEntryTextProps &
    GlobalEntryTextProps
) => (
  <div className="material-search">
    <span>
      Input fields only shown in storybook. They are used to reflect how the
      hidden workId and materialType fields are updated.
    </span>
    <div className="material-search__inputs-container">
      <label className="material-search__label" htmlFor="material-search-input">
        Work id
        <input
          data-field-input-work-id={uniqueIdentifier}
          type="text"
          placeholder="Enter search terms"
          className="material-search__input"
          tabIndex={-1}
        />
      </label>
      <label
        className="material-search__label"
        htmlFor="material-type-selector"
      >
        Material type
        <input
          data-field-input-material-type-id={uniqueIdentifier}
          type="text"
          className="material-search__selector"
          tabIndex={-1}
        />
      </label>
    </div>
    <MaterialSearch {...args} />
  </div>
);

export const materialWithoutType = Default.bind({});
