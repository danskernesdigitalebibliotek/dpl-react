import * as React from "react";
import { FC } from "react";
import { CampaignMatchPOST200Data } from "../../core/dpl-cms/model";
import { statistics } from "../../core/statistics/statistics";
import { useStatistics } from "../../core/statistics/useStatistics";
import { LinkNoStyle } from "../atoms/link-no-style";
import CampaignBody from "./CampaignBody";

export interface CampaignProps {
  campaignData: CampaignMatchPOST200Data;
}

const Campaign: FC<CampaignProps> = ({ campaignData }) => {
  const { track } = useStatistics();
  if (!campaignData.title) {
    return null;
  }
  // campaignData.title will always be defined because we exit the component if
  // not, but Typescript still thinks it might so we assign it with "as string"
  const trackClick = () => {
    return track("link", {
      id: statistics.campaignClick.id,
      name: statistics.campaignClick.name,
      trackedData: campaignData.title as string
    });
  };
  if (campaignData.url) {
    return (
      <LinkNoStyle
        url={new URL(campaignData.url)}
        trackClick={trackClick}
        className="cursor-pointer"
      >
        <CampaignBody campaignData={campaignData} />
      </LinkNoStyle>
    );
  }
  return <CampaignBody campaignData={campaignData} />;
};

export default Campaign;
