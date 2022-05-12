import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { DemoSearchBar } from "../../components/demo-search-bar/demo-search-bar";
import { DemoSuggestDropdown } from "../../components/demo-suggest-dropdown/demo-suggest-dropdown";

interface DemoSearchHeaderProps {
  searchUrl: string;
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // We need to have some sort of client caching strategy.
      // This is for temporarily testing.
      // The cache never gets invalidated.
      staleTime: Infinity
    }
  }
});

const DemoSearchHeader: React.FC<DemoSearchHeaderProps> = ({ searchUrl }) => {
  const [q, setQ] = useState("");

  const dropDownIsVisible = q.length >= 3;
  return (
    <QueryClientProvider client={queryClient}>
      <DemoSearchBar q={q} queryHandler={setQ} searchUrl={searchUrl} />
      {dropDownIsVisible && <DemoSuggestDropdown q={q} />}
    </QueryClientProvider>
  );
};

export default DemoSearchHeader;
