import clsx from "clsx";
import React, { useCallback, useState } from "react";
import { useGetCoverByPidQuery } from "../../core/dbc-gateway/generated/graphql";
import { Pid } from "../../core/utils/types/ids";
import LinkNoStyle from "../atoms/links/LinkNoStyle";
import CoverImage from "./cover-image";
import { CoverSizes, getUseableCover } from "./helper";

type Sizes = CoverSizes;
type DisplaySizes = "2xsmall" | "xsmall" | "small" | Sizes;
export type CoverProps = {
  animate: boolean;
  pid: Pid;
  size: Sizes;
  displaySize?: DisplaySizes;
  tint?: "20" | "40" | "80" | "100" | "120";
  alt?: string;
  url?: URL;
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
  shadow,
  linkAriaLabelledBy,
  pid
}: CoverProps) => {
  const [imageLoaded, setImageLoaded] = useState<boolean | null>(null);
  const handleSetImageLoaded = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const { data: coverData } = useGetCoverByPidQuery({ pid: pid });

  const cover = coverData?.manifestation?.cover;

  const selectedCover = getUseableCover(cover, size);

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
        {selectedCover?.url && (
          <CoverImage
            setImageLoaded={handleSetImageLoaded}
            src={selectedCover.url}
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
      {selectedCover?.url && (
        <CoverImage
          setImageLoaded={handleSetImageLoaded}
          src={selectedCover.url}
          altText={alt}
          animate={animate}
          shadow={shadow}
        />
      )}
    </div>
  );
};
