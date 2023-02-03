import React from "react";
import { useGetCoverCollection } from "../../core/cover-service-api/cover-service";
import { GetCoverCollectionType } from "../../core/cover-service-api/model";
import { Pid } from "../../core/utils/types/ids";

const sizeMap = {
  xsmall: "small",
  small: "small",
  medium: "medium",
  large: "large",
  xlarge: "large",
  original: "original"
} as const;
type CoverSize = keyof typeof sizeMap;

export type CoverPreloadLinkProps = {
  size: CoverSize;
  id: Pid | string;
  idType?: GetCoverCollectionType;
};

export const CoverPreloadLink = ({
  size,
  id,
  idType = "pid"
}: CoverPreloadLinkProps) => {
  const coverServiceSize = sizeMap[size];

  const { data } = useGetCoverCollection({
    type: idType,
    identifiers: [id],
    sizes: [coverServiceSize]
  });

  const coverUrl = data?.[0]?.imageUrls?.[coverServiceSize]?.url;

  if (!coverUrl) {
    return null;
  }

  return <link rel="preload" as="image" href={coverUrl} />;
};
