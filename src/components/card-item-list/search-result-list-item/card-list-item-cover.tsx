import React from "react";
import { Cover, CoverProps } from "../../cover/cover";

type SearchResultListItemCoverProps = Omit<CoverProps, "animate" | "size">;
const SearchResultListItemCover: React.FC<SearchResultListItemCoverProps> = ({
  id,
  description,
  url,
  tint
}) => {
  return (
    <Cover
      animate
      id={id}
      size="small"
      description={String(description)}
      url={url}
      tint={tint}
    />
  );
};

export default SearchResultListItemCover;
