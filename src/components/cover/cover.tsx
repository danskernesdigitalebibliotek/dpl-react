import React, { useState } from "react";
import clsx from "clsx";
import { useGetCoverCollection } from "../../core/cover-service-api/cover-service";
import { GetCoverCollectionType } from "../../core/cover-service-api/model";
import { Pid } from "../../core/utils/types/ids";
import LinkNoStyle from "../atoms/links/LinkNoStyle";
import CoverImage from "./cover-image";

export type CoverProps = {
  animate: boolean;
  size: "xsmall" | "small" | "medium" | "large" | "xlarge" | "original";
  tint?: "20" | "40" | "80" | "100" | "120";
  id: Pid | string;
  description?: string;
  url?: URL;
  idType?: GetCoverCollectionType;
  shadow?: boolean;
};

export const Cover = ({
  url,
  description,
  size,
  animate,
  tint,
  id,
  idType,
  shadow
}: CoverProps) => {
  const [imageLoaded, setImageLoaded] = useState<boolean | null>(null);
  const handleSetImageLoaded = () => setImageLoaded(true);

  let dataSize: CoverProps["size"] = size;
  if (dataSize === "xsmall") {
    dataSize = "small";
  } else if (dataSize === "xlarge") {
    dataSize = "large";
  }

  const { data } = useGetCoverCollection({
    type: idType || "pid",
    identifiers: [id],
    sizes: [dataSize]
  });

  const coverSrc = data?.[0]?.imageUrls?.[`${dataSize}`]?.url;

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
      `cover--size-${size}`,
      `cover--aspect-${size}`,
      imageLoaded || tintClasses[tint || "default"]
    )
  };

  if (url && description) {
    // Images inside links must have an non-empty alt text to meet accessibility requirements.
    // Only render the cover as a link if we have both an url and a description.
    return (
      <LinkNoStyle className={classes.wrapper} url={url}>
        {coverSrc && (
          <CoverImage
            setImageLoaded={handleSetImageLoaded}
            src={coverSrc}
            description={description}
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
          description={description}
          animate={animate}
          shadow={shadow}
        />
      )}
    </div>
  );
};
