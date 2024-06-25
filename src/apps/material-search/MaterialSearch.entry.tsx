import React from "react";
import { GlobalEntryTextProps } from "../../core/storybook/globalTextArgs";
import { withConfig } from "../../core/utils/config";
import { withText } from "../../core/utils/text";
import { WorkId } from "../../core/utils/types/ids";
import { withUrls } from "../../core/utils/url";
import MaterialSearch from "./MaterialSearch";
import { ManifestationMaterialType } from "../../core/utils/types/material-type";

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
}

export interface MaterialSearchEntryProps {
  previouslySelectedWorkId: WorkId | null;
  previouslySelectedMaterialType: ManifestationMaterialType | null;
  uniqueIdentifier: string;
}

const MaterialSearchEntry: React.FC<
  MaterialSearchEntryProps & MaterialSearchEntryTextProps & GlobalEntryTextProps
> = ({
  previouslySelectedWorkId,
  previouslySelectedMaterialType,
  uniqueIdentifier
}) => (
  <MaterialSearch
    previouslySelectedWorkId={previouslySelectedWorkId}
    previouslySelectedMaterialType={previouslySelectedMaterialType}
    uniqueIdentifier={uniqueIdentifier}
  />
);

export default withConfig(withUrls(withText(MaterialSearchEntry)));
