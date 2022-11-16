import * as React from "react";
import { FC } from "react";
import { CampaignMatchPOST200Data } from "../../core/dpl-cms/model";
import { LinkNoStyle } from "../atoms/link-no-style";
import CampaignBody from "./CampaignBody";

export interface CampaignProps {
  campaignData: CampaignMatchPOST200Data;
}

// In order to see campaigns in development mode, you will most likely need a
// browser plugin such as Chrome's "Allow CORS: Access-Control-Allow-Origin"
// in order to bypass CORS policy for dpl-cms data calls
const Campaign: FC<CampaignProps> = ({ campaignData }) => {
  if (campaignData.url) {
    return (
      <LinkNoStyle url={new URL(campaignData.url)}>
        <CampaignBody campaignData={campaignData} />
      </LinkNoStyle>
    );
  }
  return <CampaignBody campaignData={campaignData} />;
};

export default Campaign;
