import React, { FC } from "react";
import { withText } from "../../core/utils/text";
import { withConfig } from "../../core/utils/config";
import { withUrls } from "../../core/utils/url";
import { GlobalEntryTextProps } from "../../core/storybook/globalTextArgs";
import ButtonShare from "../../components/button-share/button-share";

export interface ShareButtonsEntryTextProps {
  shareOnFacebookText: string;
  shareOnFacebookAriaLabelText: string;
  copyLinkText: string;
  copyLinkAriaLabelText: string;
}

const ShareButtonsEntry: FC<
  ShareButtonsEntryTextProps & GlobalEntryTextProps
> = () => {
  return <ButtonShare />;
};

export default withConfig(withUrls(withText(ShareButtonsEntry)));
