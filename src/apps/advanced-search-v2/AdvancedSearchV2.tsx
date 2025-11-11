import React from "react";
import AdvancedSearchV2Results from "./AdvancedSearchV2Results";
import SearchForm from "./components/SearchForm";
import ActionButtons from "./components/ActionButtons";
import { useSearchFormState } from "./hooks/use-search-form-state";

const AdvancedSearchV2: React.FC = () => {
  const {
    suggests,
    selects,
    updateSuggest,
    updateSelect,
    handleSearch,
    handleClearFilters
  } = useSearchFormState();

  return (
    <div
      className="advanced-search-v2"
      style={{
        maxWidth: 1200,
        margin: "20px auto"
      }}
    >
      {/* Search Form Section */}
      <section className="advanced-search-v2__form">
        <SearchForm
          suggests={suggests}
          selects={selects}
          onSuggestUpdate={updateSuggest}
          onSelectUpdate={updateSelect}
        />

        <ActionButtons onSearch={handleSearch} onClear={handleClearFilters} />
      </section>

      {/* Results Section with Facets Sidebar */}
      <AdvancedSearchV2Results />
    </div>
  );
};

export default AdvancedSearchV2;
