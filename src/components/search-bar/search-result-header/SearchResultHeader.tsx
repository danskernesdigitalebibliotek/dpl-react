import React from "react";

export interface SearchResultHeaderProps {
  headerTitle: string;
  subtitleRenderProp?: React.ReactNode;
}

const SearchResultHeader: React.FC<SearchResultHeaderProps> = ({
  headerTitle,
  subtitleRenderProp
}) => {
  return (
    <div className="search__header">
      <h1
        className="search__header__title"
        data-cy="search-result-header"
        aria-live="polite"
      >
        {headerTitle}
      </h1>
      {subtitleRenderProp && (
        <h2 className="search__header__subtitle">{subtitleRenderProp}</h2>
      )}
    </div>
  );
};

export default SearchResultHeader;
