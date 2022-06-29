import React from "react";
import { Material, MaterialProps } from "../../material/material";

type SearchResultListItemCoverProps = Omit<MaterialProps, "animate" | "size">;
const SearchResultListItemCover: React.FC<SearchResultListItemCoverProps> = ({
  materialId,
  materialDescription,
  materialUrl,
  tint
}) => {
  return (
    <Material
      animate
      materialId={materialId}
      size="small"
      materialDescription={String(materialDescription)}
      materialUrl={materialUrl}
      tint={tint}
    />
  );
};

export default SearchResultListItemCover;
