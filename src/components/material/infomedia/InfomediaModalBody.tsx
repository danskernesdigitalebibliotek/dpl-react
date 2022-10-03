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
          className=""
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: infomediaArticle.text }}
        />
      )}
    </article>
  );
};

export default InfomediaModalBody;
