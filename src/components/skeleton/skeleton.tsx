import React, { FC } from "react";

export interface SkeletonProps {
  height: string;
  width: string;
  br: string;
  mt: string;
  mb: string;
  mr: string;
  ml: string;
}

export const Skeleton: FC<SkeletonProps> = ({
  height,
  width,
  br,
  mt,
  mb,
  mr,
  ml
}) => {
  return (
    <div
      className="dpl-reset dpl-skeleton"
      style={{
        width,
        height,
        borderRadius: br,
        marginTop: mt,
        marginBottom: mb,
        marginRight: mr,
        marginLeft: ml
      }}
    />
  );
};

export default Skeleton;
