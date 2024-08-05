import { ComponentMeta } from "@storybook/react";
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
const uniqueIdentifierValue = Math.floor(Math.random() * 10000);

const previouslySelectedWorkId = "work-of:800010-katalog:99122475830405763";
const previouslySelectedMaterialType = "lydbog (cd-mp3)";

interface MaterialSearchHiddenInputsProps
  extends MaterialSearchEntryProps,
    MaterialSearchEntryTextProps,
    GlobalEntryTextProps {
  defaultWorkId: string;
  defaultMaterialType: string;
  uniqueIdentifier: string;
}

const MaterialSearchHiddenInputs = ({
  defaultWorkId,
  defaultMaterialType,
  uniqueIdentifier,
  ...args
}: MaterialSearchHiddenInputsProps) => {
  return (
    <div className="material-search">
      <span>
        Input fields only shown in storybook. They are used to reflect how the
        hidden workId and materialType fields are updated.
      </span>
      <div className="material-search__inputs-container">
        <label
          className="material-search__label"
          htmlFor="material-search-input"
        >
          Work id
          <input
            data-field-input-work-id={uniqueIdentifier}
            type="text"
            placeholder="Enter search terms"
            className="material-search__input"
            tabIndex={-1}
            defaultValue={defaultWorkId}
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
            defaultValue={defaultMaterialType}
          />
        </label>
      </div>
      <MaterialSearch uniqueIdentifier={uniqueIdentifier} {...args} />
    </div>
  );
};

export default {
  title: "Apps / Material Search",
  component: MaterialSearchHiddenInputs,
  argTypes: {
    uniqueIdentifier: {
      defaultValue: uniqueIdentifierValue,
      control: { type: "number" }
    },
    previouslySelectedWorkId: {
      defaultValue: previouslySelectedWorkId,
      control: { type: "text" }
    },
    previouslySelectedMaterialType: {
      defaultValue: previouslySelectedMaterialType,
      control: { type: "text" }
    },
    etAlText: {
      defaultValue: "et al.",
      control: { type: "text" }
    },
    materialUrl: {
      defaultValue: "/work/:workid",
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
    materialSearchErrorTitleText: {
      defaultValue: "Title",
      control: { type: "text" }
    },
    materialSearchErrorAuthorText: {
      defaultValue: "Author",
      control: { type: "text" }
    },
    materialSearchErrorLinkText: {
      defaultValue: "Link",
      control: { type: "text" }
    },
    materialSearchErrorHeaderText: {
      defaultValue: "This material needs to be updated.",
      control: { type: "text" }
    },
    materialSearchErrorMaterialTypeNotFoundText: {
      defaultValue:
        "The currently selected type of the material is no longer available in the system. As a result of this, the link is likely broken. Use the title or link underneath to find and update the material and its type, or replace / delete it.",
      control: { type: "text" }
    },
    materialSearchErrorWorkNotFoundText: {
      defaultValue:
        "The material that was previously selected is no longer available in the system. Either delete this entry or search for a new material to replace it.",
      control: { type: "text" }
    },
    materialSearchErrorHiddenInputsNotFoundHeadingText: {
      defaultValue: "Error retrieving saved data. Inputs not found.",
      control: { type: "text" }
    },
    materialSearchErrorHiddenInputsNotFoundDescriptionText: {
      defaultValue:
        "Something went wrong when trying to find the previously saved values. Please try again. If the problem persists, something could be wrong with the app.",
      control: { type: "text" }
    },
    ...globalTextArgs,
    ...serviceUrlArgs,
    ...globalConfigArgs
  }
} as ComponentMeta<typeof MaterialSearchHiddenInputs>;

const createStory =
  (defaultWorkId: string, defaultMaterialType: string) =>
  (
    args: MaterialSearchEntryProps &
      MaterialSearchEntryTextProps &
      GlobalEntryTextProps
  ) =>
    (
      <MaterialSearchHiddenInputs
        defaultWorkId={defaultWorkId}
        defaultMaterialType={defaultMaterialType}
        {...args}
      />
    );

export const Default = createStory("", "");

export const WithPreviouslySelectedValues = createStory(
  previouslySelectedWorkId,
  previouslySelectedMaterialType
);

export const materialWithInvalidType = createStory(
  previouslySelectedWorkId,
  "invalid-type"
);

export const materialWithInvalidWorkId = createStory(
  "invalid-work-id",
  previouslySelectedMaterialType
);
