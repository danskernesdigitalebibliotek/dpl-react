import React from "react";
import clsx from "clsx";
import { useGetCoverCollection } from "../../core/cover-service-api/cover-service";

export type MaterialProps = {
  animate: boolean;
  size: "xsmall" | "small" | "medium" | "large" | "original";
  tint?: "20" | "40" | "60" | "80" | "120";
  materialId: string;
  materialDescription?: string;
  materialUrl?: string;
};

export const Material = ({
  materialUrl,
  materialDescription,
  size,
  animate,
  tint,
  materialId
}: MaterialProps) => {
  let dataSize: MaterialProps["size"];
  if (size === "xsmall") {
    dataSize = "small";
  } else {
    dataSize = size;
  }
  const { data } = useGetCoverCollection({
    type: "pid",
    identifiers: [materialId],
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
  const materialCover = coverUrl && (
    <img src={coverUrl} alt={materialDescription || ""} />
  );

  return (
    <div className="material-container">
      {/**
       * Images inside links must have an non-empty alt text to meet accessibility requirements.
       * Only render the material as a link if we have both an url and a description.
       */}
      {materialUrl && materialDescription ? (
        <a href={materialUrl} className={classes.wrapper}>
          {materialCover}
        </a>
      ) : (
        <span className={classes.wrapper}>{materialCover}</span>
      )}
    </div>
  );
};
