import React, { useCallback, useState } from "react";
import clsx from "clsx";
import { useGetCoverCollection } from "../../core/cover-service-api/cover-service";
import { GetCoverCollectionType } from "../../core/cover-service-api/model";
import { Pid } from "../../core/utils/types/ids";
import LinkNoStyle from "../atoms/links/LinkNoStyle";
import CoverImage from "./cover-image";
import { Manifestation } from "../../core/utils/types/entities";
import { getCoverUrl } from "./helper";

type Sizes = "xsmall" | "small" | "medium" | "large" | "xlarge" | "original";
type DisplaySizes = "2xsmall" | Sizes;

export type CoverProps = {
  animate: boolean;
  size: Sizes;
  displaySize?: DisplaySizes;
  tint?: "20" | "40" | "80" | "100" | "120";
  ids: (Pid | string)[];
  bestRepresentation?: Manifestation;
  alt?: string;
  url?: URL;
  idType?: GetCoverCollectionType;
  shadow?: "small" | "medium";
  linkAriaLabelledBy?: string;
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
  linkAriaLabelledBy
}: CoverProps) => {
  const [imageLoaded, setImageLoaded] = useState<boolean | null>(null);
  const handleSetImageLoaded = useCallback(() => {
    setImageLoaded(true);
  }, []);

  let dataSize: CoverProps["size"] = size;
  if (dataSize === "xsmall") {
    dataSize = "small";
  } else if (dataSize === "xlarge") {
    dataSize = "large";
  }

  const { data } = useGetCoverCollection({
    type: idType,
    identifiers: ids,
    sizes: [dataSize]
  });

  const coverSrc = getCoverUrl({
    coverData: data,
    bestRepresentation,
    size: dataSize
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

  const coverDisplaySize = displaySize || size;

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
