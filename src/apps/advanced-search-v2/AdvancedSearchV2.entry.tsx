import React from "react";
import { withUrls } from "../../core/utils/url";
import AdvancedSearchV2 from "./AdvancedSearchV2";
import { NuqsAdapter } from "nuqs/adapters/react";

const WrappedAdvancedSearchV2 = () => (
  <NuqsAdapter>
    <AdvancedSearchV2 />
  </NuqsAdapter>
);

export default withUrls(WrappedAdvancedSearchV2);
