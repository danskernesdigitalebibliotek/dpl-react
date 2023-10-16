import * as React from "react";

export interface TextLineSkeletonProps {
  width?: number;
}
const TextLineSkeleton: React.FC<TextLineSkeletonProps> = ({ width = 40 }) => (
  <div className="ssc-line w-100" style={{ width: `${width}px` }} />
);

export default TextLineSkeleton;
