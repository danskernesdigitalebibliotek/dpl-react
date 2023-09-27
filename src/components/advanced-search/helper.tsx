import {
  AdvancedSearchRowData,
  advancedSearchFilters
} from "../../core/utils/types/advanced-search-types";
import { MultiselectOption } from "../../core/utils/types/multiselect-types";

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

export const translateRowsToCql = (
  rowsToTranslate: AdvancedSearchRowData[]
) => {
  return rowsToTranslate.reduce((acc: string, curr: AdvancedSearchRowData) => {
    let rowTranslation = "";
    if (acc !== "" && curr.term.trim() !== "") {
      rowTranslation = rowTranslation.concat(" ", curr.clause);
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

export const translateFilterToCql = (
  filterToTranslate: MultiselectOption[],
  cqlKey: keyof typeof advancedSearchFilters
) => {
  return filterToTranslate.reduce((acc: string, curr: MultiselectOption) => {
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
  }, "");
};

export default {};
