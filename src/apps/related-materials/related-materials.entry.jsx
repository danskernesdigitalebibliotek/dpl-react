import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import urlPropType from "url-prop-type";
import replace from "lodash/replace";

import RelatedMaterials from "./related-materials";
import OpenPlatform from "../../core/OpenPlatform";
import CoverService from "../../core/CoverService";
import Material from "../../core/Material";
import replacePlaceholders from "../../core/replacePlaceholders";

/**
 * Retrieve the materials and corresponding covers, merge the two and return the results.
 * This suggests that that a desired amount of 50 materials might only return 33 since only
 * 33 of the materials have covers.
 *
 * @param {object} options
 * @param {string} options.query sources, categories and subjects.
 * @param {number} options.offset index from where to start fetching the the results from.
 * @param {number} options.limit tha amout of materials to retrieve.
 * @param {string[]} options.fields fields to return, such as title, pid etc.
 * @param {string} options.sort in which order to return the materials.
 * @param {CoverService} options.coverClient client used to recover the cover for the materials.
 * @returns list of the materials with covers.
 */
async function getRelatedMaterials({
  query,
  offset,
  limit,
  fields,
  sort,
  coverClient
} = {}) {
  if (!fields.includes("pid")) {
    throw Error('"pid" must be included as a field.');
  }
  const openPlatformClient = new OpenPlatform();
  const materials = await openPlatformClient.search(query, {
    offset,
    limit,
    fields,
    sort
  });
  const materialIds = materials.map(material => material.pid[0]);
  // This fits our desired cover size the best.
  const coverSize = "large";
  const coverData = await coverClient.getCover({
    id: materialIds,
    size: [coverSize]
  });
  // Remove covers which do not have the requested cover size.
  const covers = coverData.filter(cover => cover.imageUrls[coverSize]?.url);

  function mergeMaterialsAndCovers(material) {
    function locateMaterialCover(cover) {
      return material.pid[0] === cover.id;
    }
    const cover = covers.find(locateMaterialCover);
    return { ...Material.format(material), cover };
  }

  const coveredMaterials = materials.map(mergeMaterialsAndCovers);
  // Remove materials without covers.
  return coveredMaterials.filter(material => material.cover);
}

/**
 * Retrieve the materials with covers until we have the desired
 * amount or until the maximum amount of tries have been reached.
 *
 * @param {object} options
 * @param {string} options.query sources, categories and subjects.
 * @param {number} options.amount how many to try and fetch.
 * @param {number} options.maxTries how many times to try and fetch the desired amount.
 * @param {string[]} options.fields fields to return, such as title, pid etc.
 * @param {string} options.sort in which order to return the materials.
 * @param {CoverService} options.coverClient client used to recover the cover for the materials.
 * @returns list of the materials with covers.
 */
function useGetRelatedMaterials({
  query,
  amount = 10,
  maxTries = 10,
  fields,
  sort,
  coverClient
} = {}) {
  const initialState = useRef({
    status: "ready",
    tries: 0,
    offset: 0,
    materials: Array.from(new Array(amount)).map((_, index) => ({
      id: index + 1,
      data: undefined
    }))
  });

  const [relatedMaterials, setRelatedMaterials] = useState({});

  // Whenever the query changes we want to re-initialize the state and re-fetch new materials.
  useEffect(() => {
    setRelatedMaterials(initialState.current);
  }, [initialState, query]);

  // This is the amount additional to the desired we want to try and fetch.
  // This is to ensure a better first hit in most instances.
  // The current overhead is based upon our own sampling.
  const aggressiveOverhead = 1.2;
  // We can't fetch more than this at the time anyway. OpenPlatform won't allow it.
  const maxLimit = 50;
  useEffect(() => {
    // Check if we are missing any materials data.
    const missing =
      relatedMaterials?.materials?.filter(material => !material.data)?.length ||
      0;
    // Do not try again if we aren't missing any data or we have tried more than enough times.
    if (missing && relatedMaterials.tries < maxTries) {
      const calculatedLimit = Math.ceil(
        missing * (relatedMaterials.tries + 1) * aggressiveOverhead
      );
      const limit = Math.min(calculatedLimit, maxLimit);
      getRelatedMaterials({
        query,
        limit,
        offset: relatedMaterials.offset,
        fields,
        sort,
        coverClient
      })
        .then(response => {
          // We use this to track where we are in the assignment of materials to the respective object.
          let relatedMaterialsOffset = 0;
          // Assign data to the appropriate relatedMaterials block.
          const related =
            relatedMaterials?.materials.map(material => {
              if (!material.data) {
                const dataFilledMaterial = {
                  ...material,
                  data: response[relatedMaterialsOffset]
                };
                relatedMaterialsOffset += 1;
                return dataFilledMaterial;
              }
              return material;
            }) || [];
          const finishedMaterials =
            related?.filter(material => material.data)?.length || 0;
          const tries = relatedMaterials.tries + 1;
          // If we have no materials to show then finish using the empty state.
          const endStatus = finishedMaterials > 0 ? "finished" : "empty";
          const status =
            finishedMaterials >= amount || tries >= maxTries
              ? endStatus
              : "processing";
          setRelatedMaterials({
            status,
            tries,
            offset: relatedMaterials.offset + limit,
            materials:
              status === "finished"
                ? related.filter(material => material.data)
                : related
          });
        })
        .catch(() => {
          setRelatedMaterials({
            status: "failed"
          });
        });
    }
  }, [
    amount,
    coverClient,
    fields,
    initialState,
    maxTries,
    query,
    relatedMaterials,
    sort
  ]);
  return relatedMaterials;
}

/**
 * Convert a string with values separated by , to an array of strings.
 *
 * This is typically used for props coming from a data attribute.
 *
 * Use \, to escape commas in values.
 *
 * Example: "wizards,rowling\\, j.k." => ["wizards", "rowling, j.k."]
 *
 * @param {string} string
 * @returns string[]
 */
function stringToArray(string) {
  // Detect \, using negative lookbehind.
  const unescapedParts = string.split(/(?<!\\),/);
  const escapedParts = unescapedParts.map(part => replace(part, "\\,", ","));
  // Remove leading and trailing spaces and empty values.
  const trimmedParts = escapedParts.map(part => part.trim());
  return trimmedParts.filter(part => part);
}

/**
 * Build a search clause.
 *
 * Example: phrase.subject=("magic" or "wizards")
 *
 * @param {string} The name of the search index to query.
 * @param {string[]} The values to query for.
 * @param {object} options
 * @param {"and|or"?} options.operator The operator to use between multiple values.
 * @param {bool?} options.negate Whether to negate the values or not.
 * @returns string
 */
function searchClause(index, values, options = {}) {
  const allOptions = { operator: "or", negate: false, ...options };
  const valuesString = values
    .map(subject => `"${subject}"`)
    .join(` ${allOptions.operator} `);
  const clause = `${index}=(${valuesString})`;
  return (allOptions.negate ? "not " : "") + clause;
}

function RelatedMaterialsEntry({
  subjects: subjectString,
  categories: categoriesString,
  sources: sourcesString,
  excludeTitle: rawExcludeTitle,
  sort,
  searchUrl: rawSearchUrl,
  materialUrl,
  coverServiceUrl,
  titleText,
  searchText,
  amount,
  maxTries,
  agencyId
}) {
  const coverClient = new CoverService({ baseUrl: coverServiceUrl });

  // We may be passed empty strings which will lead to an invalid query.
  // Compile query clauses using only arguments with actual values.
  const includes = [];
  if (subjectString) {
    const subjects = stringToArray(subjectString);
    includes.push(searchClause("phrase.subject", subjects));
  }
  if (categoriesString) {
    const categories = stringToArray(categoriesString);
    includes.push(searchClause("term.category", categories));
  }
  if (sourcesString) {
    const sources = stringToArray(sourcesString);
    includes.push(searchClause("term.acSource", sources));
  }
  // If we didn't get any criteria, just grab the world.
  if (includes.length < 1) {
    includes.push("*");
  }
  const excludes = [];
  if (rawExcludeTitle) {
    excludes.push(
      searchClause("phrase.title", [rawExcludeTitle], { negate: true })
    );
  }

  // Use join to get spacing between clauses right. Includes must be separated
  // by "and" while excludes must not. Excludes should already have "not" prepended.
  let query = [includes.join(" and "), excludes.join(" ")].join(" ");

  // One would think that we could just add the holdingsitem clause to
  // includes, but for some reason OpenPlatform does not like it there
  // and gives us an "Error: 18: Unsupported combination of indexes (,
  // holdingsitem.agencyId)" error. So we append it here.
  if (agencyId) {
    const agencyLimit = searchClause("holdingsitem.agencyid", [agencyId]);
    query = `${query} and ${agencyLimit}`;
  }

  const searchUrl = `${replacePlaceholders({
    text: rawSearchUrl,
    placeholders: {
      query: encodeURI(query),
      sort: encodeURI(sort)
    }
  })}`;

  const relatedMaterials = useGetRelatedMaterials({
    query,
    fields: [
      "dcTitleFull",
      "pid",
      "dcCreator",
      "creator",
      "typeBibDKType",
      "date"
    ],
    sort,
    amount,
    maxTries,
    coverClient
  });
  return (
    <RelatedMaterials
      status={relatedMaterials.status}
      items={relatedMaterials.materials}
      searchUrl={searchUrl}
      materialUrl={materialUrl}
      searchText={searchText}
      titleText={titleText}
    />
  );
}

RelatedMaterialsEntry.propTypes = {
  amount: PropTypes.number,
  maxTries: PropTypes.number,
  subjects: PropTypes.string.isRequired,
  categories: PropTypes.string.isRequired,
  sources: PropTypes.string.isRequired,
  excludeTitle: PropTypes.string.isRequired,
  sort: PropTypes.oneOf([
    "date_descending",
    "date_ascending",
    "rank_title",
    "rank_general",
    "rank_main_title",
    "rank_subject",
    "rank_verification",
    "rank_creator",
    "rank_none",
    "article_date_descending",
    "article_date_ascending",
    "acquisitionDate_descending",
    "acquisitionDate_ascending",
    "random"
  ]),
  searchUrl: urlPropType.isRequired,
  materialUrl: urlPropType.isRequired,
  coverServiceUrl: urlPropType.isRequired,
  searchText: PropTypes.string,
  titleText: PropTypes.string,
  agencyId: PropTypes.string
};

RelatedMaterialsEntry.defaultProps = {
  amount: 10,
  maxTries: 5,
  titleText: "Forslag med samme emner",
  searchText: "Søg på samme emner",
  sort: "date_descending",
  agencyId: ""
};

export default RelatedMaterialsEntry;
