import React from "react";

export type CqlSearchHeaderProps = {
  dataCy?: string;
  initialCql: string;
  setCql: (newState: string) => void;
};

const CqlSearchHeader: React.FC<CqlSearchHeaderProps> = ({
  dataCy = "cql-search-header",
  initialCql,
  setCql
}) => {
  return (
    <>
      <h1
        className="text-header-h2 advanced-search__title capitalize-first"
        data-cy={dataCy}
      >
        CQL søgning
      </h1>
      <textarea
        className="advanced-search__cql-input focus-styling__input"
        cols={100}
        rows={5}
        placeholder="e.g. title=snemand*"
        onChange={(e) => setCql(e.target.value)}
      >
        {initialCql || ""}
      </textarea>
    </>
  );
};

export default CqlSearchHeader;
