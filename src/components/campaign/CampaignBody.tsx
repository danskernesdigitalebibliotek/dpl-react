import * as React from "react";
import { FC } from "react";
import { CampaignMatchPOST200Data } from "../../core/dpl-cms/model";

export interface CampaignBodyProps {
  campaignData: CampaignMatchPOST200Data;
}

const CampaignBody: FC<CampaignBodyProps> = ({ campaignData }) => {
  return (
    <section className="campaign mt-35" data-cy="campaign-body">
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

export default CampaignBody;
