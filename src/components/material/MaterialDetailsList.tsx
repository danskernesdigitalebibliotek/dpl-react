import * as React from "react";
import { FC } from "react";
import DescriptionList from "../description-list/description-list";

// Enums for item types
export enum ListItemType {
  Standard = "standard",
  Link = "link",
  List = "list"
}

interface IListDataItem {
  label: string;
  value: string | string[];
  type?: ListItemType;
}

export type ListData = IListDataItem[];

const ListItem = ({ value }: { value: string[] }) => {
  if (value.length === 0) {
    return null;
  }

  return (
    <ul className="list-description__value--list">
      {value.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

interface MaterialDetailsListRowProps {
  value: string | string[];
  type?: ListItemType;
}

const MaterialDetailsListRow: FC<MaterialDetailsListRowProps> = ({
  type,
  value
}) => {
  switch (type) {
    case ListItemType.Link:
      return <span className="link-tag pr-4">{value}</span>;
    case ListItemType.List:
      return Array.isArray(value) ? <ListItem value={value} /> : null;
    default:
      return <span>{value}</span>;
  }
};

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
      return {
        label,
        value: <MaterialDetailsListRow type={type} value={value} />
      };
    });

  return <DescriptionList id={id} data={listData} classNames={className} />;
};

export default MaterialDetailsList;
