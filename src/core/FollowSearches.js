import { getToken } from "./token.js";

/**
 * @typedef Search
 * @property {string} searchTitle
 * @property {string} searchQuery
 */

/**
 * https://github.com/reload/follow-searches/blob/develop/spec/follow-searches-1.0.0.yaml
 *
 * @class FollowSearches
 */
class FollowSearches {
  constructor() {
    this.token = getToken();
  }
  /**
   * Get all the users searches.
   *
   * @param {string} listName
   * @returns {Promise<Search[]>} a list of searches.
   * @memberof FollowSearches
   */
  getSearches(listName) {
    return new Promise((resolve, reject) => {
      console.info(`Getting searches: ${listName}`);
      try {
        setTimeout(() => {
          console.info("The search data is returned.");
          resolve([
            {
              searchTitle: "Harry Potter stuff",
              searchQuery: "harry potter"
            },
            {
              searchTitle: "Star wars stuff",
              searchQuery: "star wars"
            },
            {
              searchTitle: "Marvel stuff",
              searchQuery: "avengers"
            }
          ]);
        }, 500);
      } catch (err) {
        reject("Unspecified error.");
      }
    });
  }

  /**
   * Add search to the list.
   *
   * @param {object} options
   * @param {string} options.listName
   * @param {Search} options.search
   * @returns {Promise<boolean>}
   * @memberof FollowSearches
   */
  addSearch({ listName = "default", search, title } = {}) {
    return new Promise((resolve, reject) => {
      console.info(
        `Add search: ${search} to list: ${listName}, with title: ${title}`
      );
      try {
        setTimeout(() => {
          console.info("The search was successfully added to the list.");
          resolve(true);
        }, 500);
      } catch (err) {
        reject("Unspecified error.");
      }
    });
  }

  /**
   * Get the search results for a specific search.
   * @param {object} options
   * @param {string} options.listName
   * @param {string} options.searchId
   * @returns {Promise<Search>} a single search.
   * @memberof FollowSearches
   */
  getResultsForSearch({ listName, searchId }) {
    return new Promise((resolve, reject) => {
      console.info(`Check search: ${searchId} from list: ${listName}`);
      try {
        setTimeout(() => {
          console.info("The search with the specified ID exists.");
          resolve({
            searchTitle: "Marvel stuff",
            searchQuery: "avengers"
          });
        }, 500);
      } catch (err) {
        reject("Unspecified error.");
      }
    });
  }

  /**
   * Delete search from list.
   *
   * @param {object} options
   * @param {string} options.listName
   * @param {string} options.searchId
   * @returns {Promise<boolean>}
   * @memberof FollowSearches
   */
  deleteSearch({ listName, searchId }) {
    return new Promise((resolve, reject) => {
      console.info(`Delete search: ${searchId} from list: ${listName}`);
      try {
        setTimeout(() => {
          console.info("Successfully removed.");
          resolve(true);
        }, 500);
      } catch (err) {
        reject("Unspecified error.");
      }
    });
  }
}

export default FollowSearches;
