import React, { Activity } from "react";
import AdvancedSearchResultsWithFacets from "./components/AdvancedSearchResultsWithFacets";
import AdvancedSearchForm from "./components/AdvancedSearchForm";
import { useFormVisibility } from "./hooks/use-form-visibility";

interface AdvancedSearchV2Props {
  pageSize: number;
}

const AdvancedSearchV2: React.FC<AdvancedSearchV2Props> = ({ pageSize }) => {
  const { showResults } = useFormVisibility();

  return (
    <div className="advanced-search-v2">
      <h1 className="advanced-search-v2__title">Avanceret søgning</h1>

      <Activity mode={!showResults ? "visible" : "hidden"}>
        <AdvancedSearchForm />
      </Activity>

      <Activity mode={showResults ? "visible" : "hidden"}>
        <AdvancedSearchResultsWithFacets pageSize={pageSize} />
      </Activity>
    </div>
  );
};

export default AdvancedSearchV2;
