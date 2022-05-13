import React, { useState } from "react";
import { DemoSearchBar } from "../../components/demo-search-bar/demo-search-bar";
import { DemoSuggestDropdown } from "../../components/demo-suggest-dropdown/demo-suggest-dropdown";

interface DemoSearchHeaderProps {
  searchUrl: string;
}

const DemoSearchHeader: React.FC<DemoSearchHeaderProps> = ({ searchUrl }) => {
  const [q, setQ] = useState("");

  const dropDownIsVisible = q.length >= 3;
  return (
    <div className="m-16">
      <DemoSearchBar q={q} queryHandler={setQ} searchUrl={searchUrl} />
      {dropDownIsVisible && <DemoSuggestDropdown q={q} />}
    </div>
  );
};

export default DemoSearchHeader;
