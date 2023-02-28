import React, { FC } from "react";
import clsx from "clsx";

type CoverImageType = {
  src: string;
  description?: string;
  animate: boolean;
  setImageLoaded: () => void;
  shadow?: boolean;
};

const CoverImage: FC<CoverImageType> = ({
  src,
  description,
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
    alt={description || ""}
  />
);

export default CoverImage;
