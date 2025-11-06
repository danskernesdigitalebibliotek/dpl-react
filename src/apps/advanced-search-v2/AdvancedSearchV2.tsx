import React from "react";
import AdvancedSearchSuggestInput from "./components/AdvancedSearchSuggestInput";
import AdvancedSearchSelectSearch from "./components/AdvancedSearchSelectSearch";
import AdvancedSearchFacet from "./components/AdvancedSearchFacet";

const AdvancedSearchV2 = () => {
  return (
    <div
      style={{ display: "grid", gap: 24, maxWidth: 900, margin: "20px auto" }}
    >
      <AdvancedSearchSuggestInput />
      <AdvancedSearchSuggestInput />

      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(2, 1fr)"
        }}
      >
        <AdvancedSearchSelectSearch />
        <AdvancedSearchSelectSearch />
      </div>

      <div style={{ width: "300px" }}>
        <AdvancedSearchFacet />
        <AdvancedSearchFacet />
      </div>
    </div>
  );
};

export default AdvancedSearchV2;
