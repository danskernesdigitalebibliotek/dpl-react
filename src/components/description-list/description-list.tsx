import * as React from "react";

export interface DescriptionListProps {
  classNames?: string;
  data: { label: string; value: string }[];
}

export const DescriptionList: React.FC<DescriptionListProps> = ({
  data,
  classNames
}) => {
  return (
    <dl className={`list-description ${classNames ?? ""}`}>
      {data.map((item, i) => {
        const { label, value } = item;
        return (
          <>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </>
        );
      })}
    </dl>
  );
};

export default DescriptionList;
