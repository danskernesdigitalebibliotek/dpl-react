import React from "react";
import { Cover, CoverProps } from "../../cover/cover";

type CardListItemCoverProps = Omit<CoverProps, "animate" | "size">;
const CardListItemCover: React.FC<CardListItemCoverProps> = ({
  id,
  alt,
  url,
  tint,
  linkAriaLabelledBy
}) => {
  return (
    <Cover
      animate
      id={id}
      size="small"
      alt={String(alt)}
      url={url}
      tint={tint}
      linkAriaLabelledBy={linkAriaLabelledBy}
    />
  );
};

export default CardListItemCover;
