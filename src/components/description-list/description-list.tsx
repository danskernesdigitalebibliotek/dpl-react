import * as React from "react";
import { createJSXkey } from "../../core/utils/helpers/general";

export interface DescriptionListProps {
  classNames?: string;
  data: { label: string; value: string | React.ReactNode }[];
}

const DescriptionList: React.FC<DescriptionListProps> = ({
  data,
  classNames
}) => {
  return (
    <dl className={`list-description ${classNames ?? ""}`}>
      {data.map((item, i) => {
        const { label, value } = item;
        return (
          <div key={createJSXkey([label, i])}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        );
      })}
    </dl>
  );
};

export default DescriptionList;
