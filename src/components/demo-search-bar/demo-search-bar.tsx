import * as React from "react";

export interface DemoSearchBarProps {
  q: string;
  queryHandler: React.Dispatch<React.SetStateAction<string>>;
  searchUrl: string;
}

export const DemoSearchBar: React.FC<DemoSearchBarProps> = ({
  q,
  queryHandler
}) => {
  return (
    <input
      name="search-field"
      type="text"
      value={q}
      onChange={(e) => queryHandler(e.target.value)}
      placeholder="Try typing..."
      size={30}
    />
  );
};

export default DemoSearchBar;
