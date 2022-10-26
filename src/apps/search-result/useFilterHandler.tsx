import { useState } from "react";
import { FilterItemTerm, TagOnclickHandler } from "./types";

const useFilterHandler = () => {
  const [filters, setFilters] = useState<{
    [key: string]: { [key: FilterItemTerm["key"]]: FilterItemTerm };
  }>({});

  const filterHandler: TagOnclickHandler = ({
    filterItem: { facet, term },
    action
  }) => {
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
      if (Object.keys(filters).includes(facet)) {
        const copy = { ...filters };
        delete copy[facet][term.term];
        setFilters(copy);
      }
    }
  };

  return { filters, filterHandler };
};

export default useFilterHandler;
