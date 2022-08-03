import * as React from "react";
import { FC } from "react";

//  TODO Move this to a global file
export function generateId(index: number | string) {
  const randomId = Math.random().toString(36);
  return randomId.concat(index.toString());
}

export type ListData = {
  [k: string]: { value: string; type: "standard" | "link" };
};

const ListDescription: React.FC<{ data: ListData; className?: string }> = ({
  data,
  className
}) => {
  return (
    <dl className={`list-description ${className ?? ""}`}>
      {Object.keys(data).map((key, index) => {
        const { value, type } = data[key as keyof ListData];
        return (
          <div key={generateId(index)}>
            <dt>{key}:</dt>
            <dd>
              {type === "standard" && value}
              {type === "link" && <span className="link-tag">{value}</span>}
            </dd>
          </div>
        );
      })}
    </dl>
  );
};

export default ListDescription;
