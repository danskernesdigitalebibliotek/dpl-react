import React from "react";
import { withConfig } from "../../core/utils/config";
import { withUrls } from "../../core/utils/url";
import { withText } from "../../core/utils/text";
import Reader from "./Reader";

// interface ReaderEntryTextProps {}
// interface ReaderEntryConfigProps {}

const ReaderEntry: React.FC = () => {
  return <Reader />;
};

export default withConfig(withUrls(withText(ReaderEntry)));
