import React from "react";
import { Pid } from "../../../core/utils/types/ids";
import { Cover, CoverProps } from "../../cover/cover";

type SearchResultListItemCoverProps = Omit<CoverProps, "animate" | "size">;
const SearchResultListItemCover: React.FC<SearchResultListItemCoverProps> = ({
  pid,
  description,
  url,
  tint
}) => {
  return (
    <Cover
      animate
      pid={pid as Pid}
      size="small"
      description={String(description)}
      url={url}
      tint={tint}
    />
  );
};

export default SearchResultListItemCover;
