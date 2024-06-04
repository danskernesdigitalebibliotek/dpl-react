import React, { FC } from "react";
import CheckBox from "../../../../components/checkbox/Checkbox";

export interface SelectableMaterialSkeletonProps {
  withoutLeftOffset?: boolean;
}

const SelectableMaterialSkeleton: FC<SelectableMaterialSkeletonProps> = ({
  withoutLeftOffset = false
}) => {
  return (
    <li className="ssc">
      <div className="list-materials list-materials--disabled">
        {!withoutLeftOffset && (
          <div className="list-materials__checkbox mr-16">
            <CheckBox id="" disabled isVisualOnly />
          </div>
        )}
        <div className="list-materials__content">
          <div className="list-materials__content-status">
            <div className="ssc-head-line status-label w-10" />
          </div>
          <div className="ssc-head-line status-label w-60 mt-8" />
          <div className="ssc-head-line status-label w-50" />
          <div className="ssc-line w-30" />
        </div>
        <div className="list-materials__status">
          <div>
            <div className="ssc-head-line status-label w-100 mt-8" />
            <div className="ssc-line w-100" />
          </div>
        </div>
      </div>
    </li>
  );
};

export default SelectableMaterialSkeleton;
