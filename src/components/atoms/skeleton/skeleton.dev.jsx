import React from "react";
import Skeleton from "./skeleton";

export default { title: "Atoms/Skeleton" };

export function Single() {
  return <Skeleton />;
}

export function MediaExample() {
  return (
    <>
      <Skeleton mb="10px" height="120px" width="160px" />
      <Skeleton width="160px" />
      <Skeleton width="120px" />
    </>
  );
}
