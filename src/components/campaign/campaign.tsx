import * as React from "react";
import { FC } from "react";
import { CampaignMatchPOST200Data } from "../../core/dpl-cms/model";
import { LinkNoStyle } from "../atoms/link-no-style";
import CampaignBody from "./campaign-body";

export interface CampaignProps {
  campaignData: CampaignMatchPOST200Data;
}
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
