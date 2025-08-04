import clsx from "clsx";
import React, { useCallback, useState } from "react";
import {
  useGetBestRepresentationPidByIsbnQuery,
  useGetCoversByPidsQuery
} from "../../core/dbc-gateway/generated/graphql";
import { Manifestation } from "../../core/utils/types/entities";
import { Pid } from "../../core/utils/types/ids";
import LinkNoStyle from "../atoms/links/LinkNoStyle";
import CoverImage from "./cover-image";
import { CoverIdType, FbiCoverImageSizeKey, DisplaySize } from "./cover.types";
import {
  createIsbnCql,
  filterNonNullManifestations,
  getCoverDisplaySize,
  getCoverUrl,
  resolveCoverPidValues
} from "./helper";

export type CoverProps = {
  animate: boolean;
  size: FbiCoverImageSizeKey;
  displaySize?: DisplaySize;
  tint?: "20" | "40" | "80" | "100" | "120";
  ids: (Pid | string)[];
  bestRepresentation?: Manifestation;
  alt?: string;
  url?: URL;
  idType?: CoverIdType;
  shadow?: "small" | "medium";
  linkAriaLabelledBy?: string;
  trackClick?: () => Promise<unknown>;
};

export const Cover = ({
  url,
  alt,
  size,
  displaySize,
  animate,
  tint,
  ids,
  bestRepresentation,
  idType = "pid",
  shadow,
  linkAriaLabelledBy,
  trackClick
}: CoverProps) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const handleSetImageLoaded = useCallback(() => {
    setImageLoaded(true);
  }, []);
  const isIsbn = idType === "isbn";
  const hasIds = ids && ids.length > 0;

  const { data: isbnData } = useGetBestRepresentationPidByIsbnQuery(
    {
      cql: createIsbnCql(ids),
      offset: 0,
      limit: 1,
      filters: {}
    },

    { enabled: isIsbn && hasIds }
  );

  const resolvedIsbnPid =
    isbnData?.complexSearch?.works?.[0]?.manifestations?.bestRepresentation
      ?.pid;

  const pidsToQuery = resolveCoverPidValues({ idType, ids, resolvedIsbnPid });

  const { data: coverResult } = useGetCoversByPidsQuery(
    { pids: pidsToQuery },
    { enabled: pidsToQuery.length > 0 }
  );

  const coverData = filterNonNullManifestations(coverResult?.manifestations);

  // Convert display size to valid GraphQL key like "xSmall"
  // This ensures we get the right image AND apply the right layout class
  const coverDisplaySize = getCoverDisplaySize({ displaySize, size });

  const coverSrc = getCoverUrl({
    coverData,
    bestRepresentation,
    size: size
  });

  type TintClassesType = {
    [key: string]: string;
  };

  const tintClasses: TintClassesType = {
    default: "bg-identity-tint-120",
    "120": "bg-identity-tint-120",
    "100": "bg-identity-tint-100",
    "80": "bg-identity-tint-80",
    "40": "bg-identity-tint-40",
    "20": "bg-identity-tint-20"
  };

  const classes = {
    wrapper: clsx(
      "cover",
      `cover--size-${coverDisplaySize}`,
      `cover--aspect-${coverDisplaySize}`,
      imageLoaded || tintClasses[tint || "default"]
    )
  };

  if (url) {
    return (
      <LinkNoStyle
        className={classes.wrapper}
        url={url}
        ariaLabelledBy={linkAriaLabelledBy}
        isHiddenFromScreenReaders={!alt}
        trackClick={trackClick}
      >
        {coverSrc && (
          <CoverImage
            setImageLoaded={handleSetImageLoaded}
            src={coverSrc}
            altText={alt}
            animate={animate}
            shadow={shadow}
          />
        )}
      </LinkNoStyle>
    );
  }

  return (
    <div className={classes.wrapper}>
      {coverSrc && (
        <CoverImage
          setImageLoaded={handleSetImageLoaded}
          src={coverSrc}
          altText={alt}
          animate={animate}
          shadow={shadow}
        />
      )}
    </div>
  );
};
