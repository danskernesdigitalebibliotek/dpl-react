import * as React from "react";
import { FC } from "react";
import { CampaignMatchPOST200Data } from "../../core/dpl-cms/model";

export interface CampaignBodyProps {
  campaignData: CampaignMatchPOST200Data;
}

const CampaignBody: FC<CampaignBodyProps> = ({ campaignData }) => {
  return (
    <section className="campaign">
      {campaignData.image && campaignData.image.url && (
        <img
          className={`campaign__image ${
            !campaignData.text ? "campaign__image--full-width" : ""
          }`}
          src={campaignData.image.url}
          alt={campaignData.image.alt}
        />
      )}
      <h4 className="campaign__title campaign__title--ellipsis">
        {campaignData.text}
      </h4>
    </section>
  );
};

export default CampaignBody;
