import React from "react";
import { GlobalEntryTextProps } from "../../core/storybook/globalTextArgs";
import { withConfig } from "../../core/utils/config";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import MaterialSearch from "./MaterialSearch";

export interface MaterialSearchEntryTextProps {
  materialSearchSearchInputText: string;
  materialSearchMaterialTypeSelectorText: string;
  materialSearchMaterialTypeSelectorNoneOptionText: string;
  materialSearchNoMaterialSelectedText: string;
  materialSearchPreviewTitle: string;
  materialSearchPreviewAuthor: string;
  materialSearchPreviewPublicationYear: string;
  materialSearchPreviewSource: string;
  materialSearchPreviewWorkId: string;
  materialSearchLoadingText: string;
  materialSearchAmountOfResultsText: string;
  materialSearchSearchInputPlaceholderText: string;
  materialSearchPreviewTitleText: string;
  materialSearchPreviewAuthorText: string;
  materialSearchPreviewPublicationYearText: string;
  materialSearchPreviewSourceText: string;
  materialSearchPreviewWorkIdText: string;
  materialSearchErrorTitleText: string;
  materialSearchErrorAuthorText: string;
  materialSearchErrorLinkText: string;
  materialSearchErrorHeaderText: string;
  materialSearchErrorMaterialTypeNotFoundText: string;
  materialSearchErrorWorkNotFoundText: string;
  materialSearchErrorHiddenInputsNotFoundHeadingText: string;
  materialSearchErrorHiddenInputsNotFoundDescriptionText: string;
  materialSearchAriaButtonSelectWorkWithText: string;
  materialSearchNoResultsText: string;
}

export interface MaterialSearchEntryProps {
  uniqueIdentifier: string;
}

const MaterialSearchEntry: React.FC<
  MaterialSearchEntryProps & MaterialSearchEntryTextProps & GlobalEntryTextProps
> = ({ uniqueIdentifier }) => (
  <MaterialSearch uniqueIdentifier={uniqueIdentifier} />
);

export default withConfig(withUrls(withText(MaterialSearchEntry)));
