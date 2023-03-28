import React from "react";
import { Cover, CoverProps } from "../../cover/cover";

type SearchResultListItemCoverProps = Omit<CoverProps, "animate" | "size">;
const SearchResultListItemCover: React.FC<SearchResultListItemCoverProps> = ({
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
      description={description}
      url={url}
      tint={tint}
      linkAriaLabelledBy={linkAriaLabelledBy}
    />
  );
};

export default SearchResultListItemCover;
