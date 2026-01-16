import React from "react";
import { ContentsArray } from "./types";
import { MaterialContent } from "./MaterialContent";

export interface MaterialContentsProps {
  contents: ContentsArray;
}

const MaterialContents: React.FC<MaterialContentsProps> = ({ contents }) => {
  if (!contents || contents.length === 0) {
    return null;
  }

  return (
    <>
      {contents.map((contentEntity, entityIndex) => (
        <MaterialContent key={entityIndex} contentEntity={contentEntity} />
      ))}
    </>
  );
};

export default MaterialContents;
