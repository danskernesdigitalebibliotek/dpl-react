import * as React from "react";
import { FC } from "react";
import { CampaignMatchPOST200Data } from "../../core/dpl-cms/model";
import { useStatistics } from "../../core/statistics/useStatistics";
import { LinkNoStyle } from "../atoms/link-no-style";
import CampaignBody from "./CampaignBody";

export interface CampaignProps {
  campaignData: CampaignMatchPOST200Data;
}

// In order to see campaigns in development mode, you will most likely need a
// browser plugin such as Chrome's "Allow CORS: Access-Control-Allow-Origin"
// in order to bypass CORS policy for dpl-cms data calls
const Campaign: FC<CampaignProps> = ({ campaignData }) => {
  const { track } = useStatistics();
  const trackClick = () => {
    if (campaignData.title) {
      track("link", {
        id: 48,
        name: "Kampagneklik",
        trackedData: campaignData.title
      });
    }
  };
  if (campaignData.url) {
    return (
      <LinkNoStyle url={new URL(campaignData.url)} trackClick={trackClick}>
        <CampaignBody campaignData={campaignData} />
      </LinkNoStyle>
    );
  }
  return <CampaignBody campaignData={campaignData} />;
};

export default Campaign;
