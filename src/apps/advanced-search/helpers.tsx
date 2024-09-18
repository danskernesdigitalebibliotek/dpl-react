import { MultiselectOption } from "../../components/multiselect/types";
import {
  AdvancedSearchFilterData,
  AdvancedSearchQuery,
  AdvancedSearchRowData,
  advancedSearchFilters
} from "./types";

const getSpace = (currentText: string) => {
  let space = "";
  switch (currentText.trim()) {
    case "":
      space = "";
      break;
    default:
      if (currentText.trim().endsWith("=")) {
        space = "";
        break;
      }
      space = " ";
  }
  return space;
};

const translateRowsToCql = (rowsToTranslate: AdvancedSearchRowData[]) => {
  return rowsToTranslate.reduce((acc: string, curr: AdvancedSearchRowData) => {
    let rowTranslation = "";
    if (acc !== "" && curr.term.trim() !== "") {
      rowTranslation = rowTranslation.concat(" ", curr.clause.value);
    }
    if (curr.searchIndex !== "all" && curr.term.trim() !== "") {
      rowTranslation = rowTranslation.concat(" ", curr.searchIndex, "=");
    }
    if (curr.term !== "") {
      rowTranslation = rowTranslation.concat(
        getSpace(acc),
        "'",
        curr.term,
        "'"
      );
    }
    return acc + rowTranslation;
  }, "");
};

const translateFilterToCql = (
  filterToTranslate: MultiselectOption[],
  cqlKey: keyof typeof advancedSearchFilters
) => {
  let translation = filterToTranslate.reduce(
    (acc: string, curr: MultiselectOption) => {
      let filterTranslation = "";
      const relation = acc.trim() === "" ? " AND" : " OR";
      if (curr.value === "all") {
        return `${acc}`;
      }
      filterTranslation = filterTranslation.concat(
        relation,
        ` ${advancedSearchFilters[cqlKey]}=`,
        `'${curr.value}'`
      );
      return acc + filterTranslation;
    },
    ""
  );
  // If multiple values are selected in a single filter, we need to wrap them in
  // parentheses & add move the opening AND clause before the parenthesis opening.
  if (filterToTranslate.length > 1) {
    translation = ` AND (${translation.split(" AND")[1]})`;
  }
  return translation;
};

const translateFiltersToCql = (
  filtersToTranslate: AdvancedSearchFilterData
) => {
  const filtersAsArray: MultiselectOption[][] = Object.keys(
    filtersToTranslate
  ).map((key) => filtersToTranslate[key as keyof AdvancedSearchFilterData]);

  const translatedFilters = filtersAsArray.reduce(
    (acc: string, curr: MultiselectOption[], index) => {
      return (
        acc +
        translateFilterToCql(
          curr,
          Object.keys(filtersToTranslate)[
            index
          ] as keyof typeof advancedSearchFilters
        )
      );
    },
    ""
  );
  return translatedFilters;
};

export const wrapFiltersInParentheses = (filters: string) => {
  // No filters, no wrapping needed.
  if (filters.trim() === "") {
    return "";
  }
  // If there's only one clause, no wrapping is needed either.
  if (!filters.includes(" OR ")) {
    return filters;
  }
  // The filter string always start with " AND", so we can work with that.
  const splitFiltersArray = filters.split(" AND", 2);
  return `${splitFiltersArray.join(" AND (")})`;
};

export const translateSearchObjectToCql = (
  searchObject: AdvancedSearchQuery
) => {
  const rowsAsCql = translateRowsToCql(searchObject.rows);
  const filtersAsCql = translateFiltersToCql(searchObject.filters);
  return `${rowsAsCql}${filtersAsCql}`;
};

export const shouldAdvancedSearchButtonBeDisabled = (
  isAdvancedSearch: boolean,
  object: AdvancedSearchQuery,
  cql: string
) => {
  switch (isAdvancedSearch) {
    case true:
      return !(object && !!object.rows.find((row) => row.term !== ""));
    default:
      return cql.trim() === "";
  }
};

export const commaSeparatedStringToArray = (input: string): string[] => {
  return input
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
};

export default {};
