import { useCallback, useState } from "react";
import { FilterItemTerm, TermOnClickHandler } from "./types";

export type Filter = {
  [key: string]: { [key: FilterItemTerm["key"]]: FilterItemTerm };
};

const useFilterHandler = () => {
  const [filters, setFilters] = useState<Filter>({});

  const filterHandler = useCallback<TermOnClickHandler>(
    ({ filterItem: { facet, term }, action }) => {
      if (action === "add") {
        if (Object.keys(filters).includes(facet)) {
          setFilters({
            ...filters,
            [facet]: { ...filters[facet], [term.term]: term }
          });
        } else {
          setFilters({
            ...filters,
            [facet]: { [term.term]: term }
          });
        }
      }

      if (action === "remove") {
        const copy = { ...filters };
        if (Object.keys(filters).includes(facet)) {
          // this removes the facet if it's the last term
          if (Object.keys(filters[facet]).length === 1) {
            delete copy[facet];
            setFilters(copy);
          } else {
            delete copy[facet][term.term];
            setFilters(copy);
          }
        }
      }
    },
    [filters]
  );

  return { filters, filterHandler };
};

export default useFilterHandler;
