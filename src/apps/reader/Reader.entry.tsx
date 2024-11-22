import React from "react";
import { withConfig } from "../../core/utils/config";
import { withUrls } from "../../core/utils/url";
import { withText } from "../../core/utils/text";
import Reader, { ReaderType } from "./Reader";

const ReaderEntry: React.FC<ReaderType> = ({ identifier, orderId }) => {
  return <Reader identifier={identifier} orderId={orderId} />;
};

export default withConfig(withUrls(withText(ReaderEntry)));
