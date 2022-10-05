import React from "react";
import { GetInfomediaQuery } from "../../../core/dbc-gateway/generated/graphql";

export interface InfomediaModalBodyProps {
  infomediaArticle: GetInfomediaQuery["infomedia"]["article"];
}

const InfomediaModalBody: React.FunctionComponent<InfomediaModalBodyProps> = ({
  infomediaArticle
}) => {
  return (
    <article>
      {infomediaArticle?.headLine && <h2>{infomediaArticle?.headLine}</h2>}
      {infomediaArticle?.text && (
        <div
          // Only trusted editors from infomedia have access to write infomedia articles
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: infomediaArticle.text }}
        />
      )}
    </article>
  );
};

export default InfomediaModalBody;
