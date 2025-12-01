import React, { Activity, useState, useEffect } from "react";
import AdvancedSearchResultsWithFacets from "./components/AdvancedSearchResultsWithFacets";
import AdvancedSearchForm from "./components/AdvancedSearchForm";
import { useFormVisibility } from "./hooks/use-form-visibility";
import { useText } from "../../core/utils/text";
import { useSearchFormState } from "./hooks/use-search-form-state";

interface AdvancedSearchV2Props {
  pageSize: number;
}

const AdvancedSearchV2: React.FC<AdvancedSearchV2Props> = ({ pageSize }) => {
  const t = useText();
  const { showResults, setView } = useFormVisibility();
  const {
    suggests,
    preSearchFacets,
    updateSuggest,
    updatePreSearchFacet,
    addSuggest,
    removeSuggest,
    handleSearch,
    clearFacets,
    handleClearFilters
  } = useSearchFormState();

  // Force form remount when returning from results to clear Headless UI's
  // stale inert attributes (they persist when Activity hides with display:none)
  const [formKey, setFormKey] = useState(0);
  useEffect(() => {
    if (showResults) {
      setFormKey((k) => k + 1);
    }
  }, [showResults]);

  const onHandleSearch = () => {
    handleSearch();
    setView("results");
  };

  return (
    <div className="advanced-search-v2">
      <h1 className="advanced-search-v2__title">
        {t("advancedSearchTitleText")}
      </h1>

      <Activity mode={!showResults ? "visible" : "hidden"}>
        <AdvancedSearchForm
          key={formKey}
          suggests={suggests}
          preSearchFacets={preSearchFacets}
          updateSuggest={updateSuggest}
          updatePreSearchFacet={updatePreSearchFacet}
          addSuggest={addSuggest}
          removeSuggest={removeSuggest}
          handleSearch={onHandleSearch}
          handleClearFilters={handleClearFilters}
        />
      </Activity>

      <Activity mode={showResults ? "visible" : "hidden"}>
        <AdvancedSearchResultsWithFacets
          pageSize={pageSize}
          clearFacets={clearFacets}
        />
      </Activity>
    </div>
  );
};

export default AdvancedSearchV2;
