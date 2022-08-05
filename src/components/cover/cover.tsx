import React from "react";
import clsx from "clsx";
import { useGetCoverCollection } from "../../core/cover-service-api/cover-service";
import { Pid } from "../../core/utils/types/ids";
import { LinkNoStyle } from "../atoms/link-no-style";

export type CoverProps = {
  animate: boolean;
  size: "xsmall" | "small" | "medium" | "large" | "xlarge" | "original";
  tint?: "20" | "40" | "80" | "100" | "120";
  pid: Pid;
  description?: string;
  url?: string;
};

export const Cover = ({
  url,
  description,
  size,
  animate,
  tint,
  pid
}: CoverProps) => {
  let dataSize: CoverProps["size"] = size;
  if (dataSize === "xsmall") {
    dataSize = "small";
  } else if (dataSize === "xlarge") {
    dataSize = "large";
  }
  const { data } = useGetCoverCollection({
    type: "pid",
    identifiers: [pid],
    sizes: [dataSize]
  });

  type TintClassesType = {
    [key: string]: string;
  };
  const tintClasses: TintClassesType = {
    default: "bg-identity-tint-120",
    "120": "bg-identity-tint-120",
    "80": "bg-identity-tint-80",
    "60": "bg-identity-tint-60",
    "40": "bg-identity-tint-40",
    "20": "bg-identity-tint-20"
  };

  const classes = {
    wrapper: clsx(
      `material material--${size}`,
      tintClasses[tint || "default"],
      {
        material__animate: animate
      }
    )
  };

  const coverUrl = data?.[0]?.imageUrls?.[`${dataSize}`]?.url;
  const image = coverUrl && <img src={coverUrl} alt={description || ""} />;

  return (
    <div className="material-container">
      {/**
       * Images inside links must have an non-empty alt text to meet accessibility requirements.
       * Only render the material as a link if we have both an url and a description.
       */}
      {url && description ? (
        <LinkNoStyle href={url} className={classes.wrapper}>
          {image}
        </LinkNoStyle>
      ) : (
        <span className={classes.wrapper}>{image}</span>
      )}
    </div>
  );
};
