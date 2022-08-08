import * as React from "react";

export type ListData = {
  [k: string]: {
    value: null | number | string | string[];
    type: "standard" | "link";
  };
};

const ListDescription: React.FC<{ data: ListData; className?: string }> = ({
  data,
  className
}) => {
  return (
    <dl className={`list-description ${className ?? ""}`}>
      {Object.keys(data).map((key) => {
        const { value, type } = data[key as keyof ListData];

        if (value === null) {
          return null;
        }

        // Ensures that all values become an array
        const valueArray = Array.isArray(value) ? value : [value];

        return (
          <div key={key}>
            <dt>{key}:</dt>
            <dd>
              {valueArray.map((item) => {
                if (type === "link") {
                  return (
                    <span key={item} className="link-tag pr-4">
                      {item}
                    </span>
                  );
                }
                return <span key={item}>{item}</span>;
              })}
            </dd>
          </div>
        );
      })}
    </dl>
  );
};

export default ListDescription;
