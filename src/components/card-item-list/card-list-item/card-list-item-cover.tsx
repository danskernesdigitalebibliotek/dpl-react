import React from "react";
import { Cover, CoverProps } from "../../cover/cover";

type CardListItemCoverProps = Omit<CoverProps, "animate" | "size">;
const CardListItemCover: React.FC<CardListItemCoverProps> = ({
  ids,
  manifestation,
  alt,
  url,
  tint,
  linkAriaLabelledBy
}) => {
  return (
    <Cover
      animate
      ids={ids}
      manifestation={manifestation}
      size="small"
      alt={String(alt)}
      url={url}
      tint={tint}
      linkAriaLabelledBy={linkAriaLabelledBy}
    />
  );
};

export default CardListItemCover;
