import * as React from "react";
import { FC } from "react";

export interface CampaignProps {
  test: string;
}

const Campaign: FC<CampaignProps> = ({ test }) => {
  return (
    <section className="campaign">
      <img
        className="campaign__image"
        src="https://picsum.photos/id/777/300/200"
        alt=""
      />
      <h4 className="campaign__title">{test}</h4>
    </section>
  );
};

export default Campaign;
