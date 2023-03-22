import * as React from "react";
import { FC } from "react";
import DescriptionList from "../description-list/description-list";

export type ListData = {
  label: string;
  value: string;
  type: "standard" | "link";
}[];

export interface MaterialDetailsListProps {
  className?: string;
  data: ListData;
  id: string;
}

const MaterialDetailsList: FC<MaterialDetailsListProps> = ({
  data,
  className,
  id
}) => {
  const listData = data
    .filter((item) => item.value)
    .map((item) => {
      const { label, value, type } = item;
      const rowValue =
        type === "link" ? (
          <span className="link-tag pr-4">{value}</span>
        ) : (
          <span>{value}</span>
        );
      return { label, value: rowValue };
    });

  return <DescriptionList id={id} data={listData} classNames={className} />;
};

export default MaterialDetailsList;
