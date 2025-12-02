import React from "react";
import AdvancedSearchResultsWithFacets from "./components/AdvancedSearchResultsWithFacets";
import AdvancedSearchForm from "./components/AdvancedSearchForm";
import { useFormVisibility } from "./hooks/use-form-visibility";
import { useText } from "../../core/utils/text";
import { useSearchFormState } from "./hooks/use-search-form-state";
import Link from "../../components/atoms/links/Link";
import { useCqlSearchUrl } from "./hooks/use-cql-search-url";

interface AdvancedSearchV2Props {
  pageSize: number;
}

const AdvancedSearchV2: React.FC<AdvancedSearchV2Props> = ({ pageSize }) => {
  const t = useText();
  const { targetCqlUrl } = useCqlSearchUrl();
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

  const onHandleSearch = () => {
    handleSearch();
    setView("results");
  };

  return (
    <div className="advanced-search-v2">
      <h1 className="advanced-search-v2__title">
        {t("advancedSearchTitleText")}
      </h1>
      {targetCqlUrl && (
        <Link href={targetCqlUrl} className="link-tag">
          {t("advancedSearchV2ToCqlSearchButtonText")}
        </Link>
      )}

      {!showResults && (
        <AdvancedSearchForm
          suggests={suggests}
          preSearchFacets={preSearchFacets}
          updateSuggest={updateSuggest}
          updatePreSearchFacet={updatePreSearchFacet}
          addSuggest={addSuggest}
          removeSuggest={removeSuggest}
          handleSearch={onHandleSearch}
          handleClearFilters={handleClearFilters}
        />
      )}

      {showResults && (
        <AdvancedSearchResultsWithFacets
          pageSize={pageSize}
          clearFacets={clearFacets}
        />
      )}
    </div>
  );
};

export default AdvancedSearchV2;
