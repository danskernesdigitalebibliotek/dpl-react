import React from "react";
import clsx from "clsx";
import { useGetCoverCollection } from "../../core/cover-service-api/cover-service";

export type CoverProps = {
  animate: boolean;
  size: "small" | "medium" | "large" | "original";
  tint?: "20" | "40" | "60" | "80" | "120";
  materialId: string;
  description?: string;
  url?: string;
};

export const Cover = ({
  url,
  description,
  size,
  animate,
  tint,
  materialId
}: CoverProps) => {
  const { data } = useGetCoverCollection({
    type: "pid",
    identifiers: [materialId],
    sizes: [size]
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

  const coverUrl = data?.[0]?.imageUrls?.[`${size}`]?.url;
  const image = coverUrl && <img src={coverUrl} alt={description || ""} />;

  return (
    <div className="material-container">
      {/**
       * Images inside links must have an non-empty alt text to meet accessibility requirements.
       * Only render the material as a link if we have both an url and a description.
       */}
      {url && description ? (
        <a href={url} className={classes.wrapper}>
          {image}
        </a>
      ) : (
        <span className={classes.wrapper}>{image}</span>
      )}
    </div>
  );
};
