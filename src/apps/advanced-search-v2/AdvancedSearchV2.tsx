import React, { Activity, useEffect, useState } from "react";
import AdvancedSearchResultsWithFacets from "./components/AdvancedSearchResultsWithFacets";
import AdvancedSearchForm from "./components/AdvancedSearchForm";
import { useFormVisibility } from "./hooks/use-form-visibility";
import { useText } from "../../core/utils/text";
import { FacetState, SuggestState } from "./types";
import { INITIAL_SUGGEST_STATE } from "./lib/initial-state";
import { useSearchUrlState } from "./hooks/use-search-url-state";

const prepareSearchSuggests = (suggests: SuggestState[]) => {
  return suggests
    .filter((suggest) => suggest.query.trim())
    .map((suggest, index) => {
      // First suggest doesn't need operator field
      if (index === 0) {
        return { term: suggest.term, query: suggest.query };
      }
      return suggest;
    });
};

interface AdvancedSearchV2Props {
  pageSize: number;
}

const AdvancedSearchV2: React.FC<AdvancedSearchV2Props> = ({ pageSize }) => {
  const { showResults, setView } = useFormVisibility();
  const t = useText();
  const [suggests, setSuggests] = useState<SuggestState[]>(
    INITIAL_SUGGEST_STATE
  );
  const [preSearchFacets, setPreSearchFacets] = useState<FacetState[]>([]);
  const { urlState, setUrlState, clearUrlState } = useSearchUrlState();

  useEffect(() => {
    setSuggests(urlState.suggests);
    setPreSearchFacets(urlState.preSearchFacets);
  }, [urlState.suggests, urlState.preSearchFacets]);

  const onSearch = () => {
    const nonEmptySuggests = prepareSearchSuggests(suggests);

    setUrlState(
      {
        suggests: nonEmptySuggests.length > 0 ? nonEmptySuggests : null,
        preSearchFacets: preSearchFacets.length > 0 ? preSearchFacets : null,
        sort: null
      },
      { history: "push" }
    );
    setView("results");
  };

  const onClearFilters = () => {
    setSuggests(INITIAL_SUGGEST_STATE);
    setPreSearchFacets([]);
    clearUrlState();
  };

  return (
    <div className="advanced-search-v2">
      <h1 className="advanced-search-v2__title">
        {t("advancedSearchTitleText")}
      </h1>

      <Activity mode={!showResults ? "visible" : "hidden"}>
        <AdvancedSearchForm
          suggests={suggests}
          preSearchFacets={preSearchFacets}
          onSuggests={setSuggests}
          onPreSearchFacets={setPreSearchFacets}
          onSearch={onSearch}
          onClearFilters={onClearFilters}
        />
      </Activity>

      <Activity mode={showResults ? "visible" : "hidden"}>
        <AdvancedSearchResultsWithFacets
          suggests={suggests}
          preSearchFacets={preSearchFacets}
          pageSize={pageSize}
        />
      </Activity>
    </div>
  );
};

export default AdvancedSearchV2;
