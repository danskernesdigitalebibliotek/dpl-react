import * as React from "react";

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
      {data.map((item) => {
        const { label, value } = item;
        return (
          <div>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        );
      })}
    </dl>
  );
};

export default DescriptionList;
