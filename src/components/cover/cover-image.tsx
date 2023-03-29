import React, { FC } from "react";
import clsx from "clsx";

type CoverImageType = {
  src: string;
  altText?: string;
  animate: boolean;
  setImageLoaded: () => void;
  shadow?: boolean;
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
      { "cover__img--shadow": shadow }
    )}
    src={src}
    alt={altText || ""}
  />
);

export default CoverImage;
