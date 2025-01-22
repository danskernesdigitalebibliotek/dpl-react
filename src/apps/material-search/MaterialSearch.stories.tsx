import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import globalTextArgs, {
  GlobalEntryTextProps,
  argTypes as globalTextArgTypes
} from "../../core/storybook/globalTextArgs";
import serviceUrlArgs, {
  argTypes as serviceUrlArgTypes
} from "../../core/storybook/serviceUrlArgs";
import globalConfigArgs, {
  argTypes as globalConfigArgTypes
} from "../../core/storybook/globalConfigArgs";
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
  previouslySelectedWorkId: string;
  previouslySelectedMaterialType: string;
  materialUrl: string;
  etAlText: string;
  buttonText: string;
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
      {/* TODO: Explicitly define prop types for better clarity */}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <MaterialSearch uniqueIdentifier={uniqueIdentifier} {...args} />
    </div>
  );
};

const meta: Meta<typeof MaterialSearchHiddenInputs> = {
  title: "Apps / Material Search",
  component: MaterialSearchHiddenInputs,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: can't figure out how to type this
  argTypes: {
    ...globalTextArgTypes,
    ...serviceUrlArgTypes,
    ...globalConfigArgTypes,
    uniqueIdentifier: {
      control: { type: "number" }
    },
    previouslySelectedWorkId: {
      control: { type: "text" }
    },
    previouslySelectedMaterialType: {
      control: { type: "text" }
    },
    etAlText: {
      control: { type: "text" }
    },
    materialUrl: {
      control: { type: "text" }
    },
    materialSearchSearchInputText: {
      control: { type: "text" }
    },
    materialSearchMaterialTypeSelectorText: {
      control: { type: "text" }
    },
    materialSearchMaterialTypeSelectorNoneOptionText: {
      control: { type: "text" }
    },
    materialSearchNoMaterialSelectedText: {
      control: { type: "text" }
    },
    materialSearchPreviewTitle: {
      control: { type: "text" }
    },
    materialSearchPreviewAuthor: {
      control: { type: "text" }
    },
    materialSearchPreviewPublicationYear: {
      control: { type: "text" }
    },
    materialSearchPreviewSource: {
      control: { type: "text" }
    },
    materialSearchPreviewWorkId: {
      control: { type: "text" }
    },
    materialSearchLoadingText: {
      control: { type: "text" }
    },
    materialSearchAmountOfResultsText: {
      control: { type: "text" }
    },
    materialSearchNoResultsText: {
      control: { type: "text" }
    },
    materialSearchAriaButtonSelectWorkWithText: {
      control: { type: "text" }
    },
    materialSearchSearchInputPlaceholderText: {
      control: { type: "text" }
    },
    materialSearchPreviewTitleText: {
      control: { type: "text" }
    },
    materialSearchPreviewAuthorText: {
      control: { type: "text" }
    },
    materialSearchPreviewPublicationYearText: {
      control: { type: "text" }
    },
    materialSearchPreviewSourceText: {
      control: { type: "text" }
    },
    materialSearchPreviewWorkIdText: {
      control: { type: "text" }
    },
    materialSearchErrorTitleText: {
      control: { type: "text" }
    },
    materialSearchErrorAuthorText: {
      control: { type: "text" }
    },
    materialSearchErrorLinkText: {
      control: { type: "text" }
    },
    materialSearchErrorHeaderText: {
      control: { type: "text" }
    },
    materialSearchErrorMaterialTypeNotFoundText: {
      control: { type: "text" }
    },
    materialSearchErrorWorkNotFoundText: {
      control: { type: "text" }
    },
    materialSearchErrorHiddenInputsNotFoundHeadingText: {
      control: { type: "text" }
    },
    materialSearchErrorHiddenInputsNotFoundDescriptionText: {
      control: { type: "text" }
    }
  }
};

export default meta;

type Story = StoryObj<typeof MaterialSearchHiddenInputs>;

export const Primary: Story = {
  args: {
    ...globalTextArgs,
    ...serviceUrlArgs,
    ...globalConfigArgs,
    uniqueIdentifier: uniqueIdentifierValue.toString(),
    previouslySelectedWorkId,
    previouslySelectedMaterialType,
    etAlText: "et al.",
    materialUrl: "/work/:workid",
    materialSearchSearchInputText: "Search for material",
    materialSearchMaterialTypeSelectorText: "Select material type",
    materialSearchMaterialTypeSelectorNoneOptionText: "Select material type",
    materialSearchNoMaterialSelectedText: "No material selected",
    materialSearchPreviewTitle: "Title",
    materialSearchPreviewAuthor: "Author",
    materialSearchPreviewPublicationYear: "Publication year",
    materialSearchPreviewSource: "Source",
    materialSearchPreviewWorkId: "Work ID",
    materialSearchLoadingText: "Loading...",
    materialSearchAmountOfResultsText: "Amount of hits",
    materialSearchNoResultsText: "No results",
    materialSearchAriaButtonSelectWorkWithText: "Select work with title @title",
    materialSearchSearchInputPlaceholderText: "Enter search terms",
    materialSearchPreviewTitleText: "Title",
    materialSearchPreviewAuthorText: "Author",
    materialSearchPreviewPublicationYearText: "Publication year",
    materialSearchPreviewSourceText: "Source",
    materialSearchPreviewWorkIdText: "Work ID",
    materialSearchErrorTitleText: "Title",
    materialSearchErrorAuthorText: "Author",
    materialSearchErrorLinkText: "Link",
    materialSearchErrorHeaderText: "This material needs to be updated.",
    materialSearchErrorMaterialTypeNotFoundText:
      "The currently selected type of the material is no longer available in the system. As a result of this, the link is likely broken. Use the title or link underneath to find and update the material and its type, or replace / delete it.",
    materialSearchErrorWorkNotFoundText:
      "The material that was previously selected is no longer available in the system. Either delete this entry or search for a new material to replace it.",
    materialSearchErrorHiddenInputsNotFoundHeadingText:
      "Error retrieving saved data. Inputs not found.",
    materialSearchErrorHiddenInputsNotFoundDescriptionText:
      "Something went wrong when trying to find the previously saved values. Please try again. If the problem persists, something could be wrong with the app."
  }
};

export const WithPreviouslySelectedValues: Story = {
  args: {
    ...Primary.args
  },
  render: (args) => {
    const defaultWorkId = previouslySelectedWorkId;
    const defaultMaterialType = previouslySelectedMaterialType;
    const modifiedProps = { ...args, defaultWorkId, defaultMaterialType };

    // TODO: Explicitly define prop types for better clarity
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <MaterialSearchHiddenInputs {...modifiedProps} />;
  }
};

export const materialWithInvalidType: Story = {
  args: {
    ...Primary.args
  },
  render: (args) => {
    const defaultWorkId = previouslySelectedWorkId;
    const defaultMaterialType = "invalid-type";
    const modifiedProps = { ...args, defaultWorkId, defaultMaterialType };

    // TODO: Explicitly define prop types for better clarity
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <MaterialSearchHiddenInputs {...modifiedProps} />;
  }
};

export const materialWithInvalidWorkId: Story = {
  args: {
    ...Primary.args
  },
  render: (args) => {
    const defaultWorkId = "invalid-work-id";
    const defaultMaterialType = previouslySelectedMaterialType;
    const modifiedProps = { ...args, defaultWorkId, defaultMaterialType };

    // TODO: Explicitly define prop types for better clarity
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <MaterialSearchHiddenInputs {...modifiedProps} />;
  }
};
