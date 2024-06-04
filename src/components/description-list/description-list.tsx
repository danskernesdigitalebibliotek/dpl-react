import * as React from "react";

export interface DescriptionListProps {
  classNames?: string;
  data: { label: string; value: string | React.ReactNode }[];
  id: string;
}

const DescriptionList: React.FC<DescriptionListProps> = ({
  data,
  classNames,
  id
}) => {
  return (
    <dl
      id={id}
      className={`list-description ${classNames ?? ""}`}
      data-cy="list-description"
    >
      {data.map((item) => {
        const { label, value } = item;
        return (
          <div className="list-description__item">
            <dt className="list-description__key">{label}</dt>
            <dd className="list-description__value">{value}</dd>
          </div>
        );
      })}
    </dl>
  );
};

export default DescriptionList;
