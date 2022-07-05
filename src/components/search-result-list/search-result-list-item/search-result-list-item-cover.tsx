import React from "react";
import { Cover, CoverProps } from "../../cover/cover";

type SearchResultListItemCoverProps = Omit<CoverProps, "animate" | "size">;
const SearchResultListItemCover: React.FC<SearchResultListItemCoverProps> = ({
  materialId,
  description,
  url,
  tint
}) => {
  return (
    <Cover
      animate
      materialId={materialId}
      size="small"
      description={String(description)}
      url={url}
      tint={tint}
    />
  );
};

export default SearchResultListItemCover;
