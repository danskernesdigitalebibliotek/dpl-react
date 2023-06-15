import React from "react";

interface AdvancedSearchResultProps {
  q: string;
  pageSize: number;
}

const AdvancedSearchResult: React.FC<AdvancedSearchResultProps> = ({
  q,
  pageSize
}) => {
  return (
    <div>
      <h1>I am a header for {q}</h1>
      <div>I am a result</div>
      <div>I am a result</div>
      <div>I am a result</div>
      <div>I am a pager {pageSize}</div>
    </div>
  );
};

export default AdvancedSearchResult;
