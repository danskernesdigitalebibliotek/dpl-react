import React, { FC } from "react";
import { FaustId } from "../../core/utils/types/ids";
import SomethingSimilarList from "./SomethingSimilarList";

export interface SomethingSimilarProps {
  faust: FaustId;
}

const SomethingSimilar: FC<SomethingSimilarProps> = ({ faust }) => {
  return (
    <div className="recommender recommender--bright">
      {faust && <SomethingSimilarList faust={faust} id={faust} />}
    </div>
  );
};

export default SomethingSimilar;
