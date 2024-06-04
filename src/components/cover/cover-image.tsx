import React, { FC } from "react";
import clsx from "clsx";

type CoverImageType = {
  src: string;
  altText?: string;
  animate: boolean;
  setImageLoaded: () => void;
  shadow?: "small" | "medium";
};

const CoverImage: FC<CoverImageType> = ({
  src,
  altText,
  animate,
  setImageLoaded,
  shadow
}) => (
  <img
    onLoad={setImageLoaded}
    className={clsx(
      "cover__img",
      {
        "cover__img--animate": animate
      },
      {
        "cover__img--shadow-small": shadow === "small",
        "cover__img--shadow-medium": shadow === "medium"
      }
    )}
    src={src}
    alt={altText || ""}
  />
);

export default CoverImage;
