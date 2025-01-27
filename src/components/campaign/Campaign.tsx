import * as React from "react";
import { FC } from "react";
import { CampaignMatchPOST200Data } from "../../core/dpl-cms/model";
import { statistics } from "../../core/statistics/statistics";
import { useStatistics } from "../../core/statistics/useStatistics";
import { redirectTo } from "../../core/utils/helpers/url";

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
    return track("click", {
      id: statistics.campaignClick.id,
      name: statistics.campaignClick.name,
      trackedData: campaignData.title as string
    });
  };

  const onClick = () => {
    if (campaignData.url) {
      const url = new URL(campaignData.url);
      trackClick().then(() => redirectTo(url, true));
    }
  };

  const onKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      onClick();
    }
  };

  return (
    <section
      className="campaign mt-35"
      data-cy="campaign-body"
      onClick={onClick}
      onKeyUp={onKeyUp}
      role="link"
      tabIndex={campaignData.url ? 0 : undefined}
    >
      {campaignData.image && campaignData.image.url && (
        <img
          data-cy="campaign-image"
          className={`campaign__image ${
            !campaignData.text ? "campaign__image--full-width" : ""
          }`}
          src={campaignData.image.url}
          alt={campaignData.image.alt}
        />
      )}
      {campaignData.text && (
        <h4 className="campaign__title campaign__title--ellipsis">
          {campaignData.text}
        </h4>
      )}
    </section>
  );
};

export default Campaign;
