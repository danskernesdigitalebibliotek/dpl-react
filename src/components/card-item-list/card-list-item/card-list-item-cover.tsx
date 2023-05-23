import React from "react";
import { Cover, CoverProps } from "../../cover/cover";

type CardListItemCoverProps = Omit<CoverProps, "animate" | "size">;
const CardListItemCover: React.FC<CardListItemCoverProps> = ({
  id,
  description,
  url,
  tint,
  linkAriaLabelledBy
}) => {
  return (
    <Cover
      animate
      id={id}
      size="small"
      description={String(description)}
      url={url}
      tint={tint}
      linkAriaLabelledBy={linkAriaLabelledBy}
    />
  );
};

export default CardListItemCover;
