import * as React from "react";

export interface TextLineSkeletonProps {
  width: number;
}
const TextLineSkeleton: React.FC<TextLineSkeletonProps> = ({ width }) => (
  <div className="ssc-line w-100" style={{ width: `${width}px` }} />
);

export default TextLineSkeleton;
