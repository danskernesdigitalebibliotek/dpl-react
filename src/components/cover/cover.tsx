import clsx from "clsx";
import React, { useCallback, useState } from "react";
import { useGetCoverByPidQuery } from "../../core/dbc-gateway/generated/graphql";
import { Pid } from "../../core/utils/types/ids";
import LinkNoStyle from "../atoms/links/LinkNoStyle";
import CoverImage from "./cover-image";
import { CoverImageSizeKey, DisplaySize } from "./cover.types";
import { getCoverDisplaySize, getCoverUrl } from "./helper";

export type CoverProps = {
  animate: boolean;
  pid: Pid;
  size: CoverImageSizeKey;
  displaySize?: DisplaySize;
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

  if (!coverData) return null;
  const cover = coverData?.manifestation?.cover ?? null;

  const coverUrl = getCoverUrl(cover, size);
  const coverDisplaySize = getCoverDisplaySize({
    displaySize,
    size
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
      >
        {coverUrl && (
          <CoverImage
            setImageLoaded={handleSetImageLoaded}
            src={coverUrl}
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
      {coverUrl && (
        <CoverImage
          setImageLoaded={handleSetImageLoaded}
          src={coverUrl}
          altText={alt}
          animate={animate}
          shadow={shadow}
        />
      )}
    </div>
  );
};
