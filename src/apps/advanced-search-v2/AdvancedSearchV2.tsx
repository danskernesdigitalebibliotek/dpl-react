import React from "react";
import AdvancedSearchResultsWithFacets from "./components/AdvancedSearchResultsWithFacets";
import AdvancedSearchForm from "./components/AdvancedSearchForm";
import { useFormVisibility } from "./hooks/use-form-visibility";
import { useText } from "../../core/utils/text";
import { useSearchFormState } from "./hooks/use-search-form-state";
import { useCqlSearchUrl } from "./hooks/use-cql-search-url";

interface AdvancedSearchV2Props {
  pageSize: number;
}

const AdvancedSearchV2: React.FC<AdvancedSearchV2Props> = ({ pageSize }) => {
  const t = useText();
  const { customCqlUrl } = useCqlSearchUrl();
  const { showResults, setView } = useFormVisibility();
  const {
    filters,
    preSearchFacets,
    updateFilter,
    updatePreSearchFacet,
    addFilter,
    removeFilter,
    handleSearch,
    clearFacets,
    handleClearFilters
  } = useSearchFormState();

  const onHandleSearch = () => {
    handleSearch();
    setView("results");
  };

  return (
    <div className="advanced-search-v2">
      <h1 className="advanced-search-v2__title">
        {t("advancedSearchTitleText")}
      </h1>

      {!showResults && (
        <AdvancedSearchForm
          filters={filters}
          preSearchFacets={preSearchFacets}
          updateFilter={updateFilter}
          updatePreSearchFacet={updatePreSearchFacet}
          addFilter={addFilter}
          removeFilter={removeFilter}
          handleSearch={onHandleSearch}
          handleClearFilters={handleClearFilters}
        />
      )}

      {showResults && (
        <AdvancedSearchResultsWithFacets
          customCqlUrl={customCqlUrl ?? undefined}
          customCqlUrlLabel={t("advancedSearchV2ToCqlSearchButtonText")}
          pageSize={pageSize}
          clearFacets={clearFacets}
        />
      )}
    </div>
  );
};

export default AdvancedSearchV2;
