import * as React from "react";
import { FC } from "react";

// export function generateId(index: number | string) {
//   const randomId = Math.random().toString(36);
//   return randomId.concat(index.toString());
// }

export type ListData = {
  [k: string]: { value: string; type: "standard" | "link" };
};

const ListDescription: React.FC<{ data: ListData; className?: string }> = ({
  data,
  className
}) => {
  return (
    <dl className={`list-description ${className ?? ""}`}>
      {Object.keys(data).map((key) => {
        const { value, type } = data[key as keyof ListData];

        // Check if value is null or undefined
        if (value === "null" || value === "undefined" || undefined || null) {
          return null;
        }
        return (
          <div key={key}>
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
