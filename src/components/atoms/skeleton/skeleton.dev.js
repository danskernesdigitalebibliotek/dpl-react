import React from "react";
import Skeleton from "./skeleton.js";

export default { title: "Atoms|Skeleton" };

export function single() {
  return <Skeleton />;
}

export function mediaExample() {
  return (
    <React.Fragment>
      <Skeleton mb="10px" height="120px" width="160px" />
      <Skeleton width="160px" />
      <Skeleton width="120px" />
    </React.Fragment>
  );
}
