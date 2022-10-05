import React from "react";

export interface InfomediaModalBodyProps {
  headline: string;
  text: string;
}

const InfomediaModalBody: React.FunctionComponent<InfomediaModalBodyProps> = ({
  headline,
  text
}) => {
  return (
    <article>
      <h2>{headline}</h2>
      <div
        // Only trusted editors from infomedia have access to write infomedia articles
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </article>
  );
};

export default InfomediaModalBody;
