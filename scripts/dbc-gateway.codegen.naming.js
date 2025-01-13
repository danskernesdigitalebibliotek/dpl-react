/**
 * This file is used to convert the typescript symbols generated
 * by the graphql-codegen tool into pascal case.
 */

// Todo: Find out to format this file correctly. Possibly as a ts file.
// eslint-disable-next-line import/no-extraneous-dependencies
import { pascalCase } from "change-case-all";

/**
 * This function is used to convert the typescript symbols to pascal case
 * Since the graphql schema is not consequent in naming, we need to fix some of the names.
 *
 * @param {string*} str
 * @return {string}
 */
function PascalCaseMostly(str) {
  if (str === "moodSuggestResponse") {
    str = "MoodSuggestResponseElement";
  }
  if (str === "ComplexSearchFacets") {
    str = "ComplexSearchFacetTypes";
  }

  // If possible return the pascal case otherwise return the original string.
  return pascalCase(str) || str;
}

export default PascalCaseMostly;
