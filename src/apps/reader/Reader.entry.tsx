import React from "react";
import { withConfig } from "../../core/utils/config";
import { withUrls } from "../../core/utils/url";
import { withText } from "../../core/utils/text";
import Reader, { ReaderType } from "../../components/reader-player/Reader";

const ReaderEntry: React.FC<ReaderType> = ({ identifier, orderid }) => {
  return <Reader identifier={identifier} orderid={orderid} />;
};

export default withConfig(withUrls(withText(ReaderEntry)));
