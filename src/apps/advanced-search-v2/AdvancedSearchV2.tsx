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

      <AdvancedSearchSelectSearch />

      <AdvancedSearchFacet />
    </div>
  );
};

export default AdvancedSearchV2;
