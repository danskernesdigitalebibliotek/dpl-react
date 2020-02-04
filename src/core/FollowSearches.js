import fetch from "unfetch";
import { getToken } from "./token";

/**
 * @typedef Search
 * @property {string} searchTitle
 * @property {string} searchQuery
 */

/**
 * @typedef Material
 * @property {string} pid
 */

/**
 * https://github.com/reload/follow-searches/blob/develop/spec/follow-searches-1.1.0.yaml
 *
 * @class FollowSearches
 */
class FollowSearches {
  constructor({ baseUrl }) {
    this.token = getToken();
    this.baseUrl = baseUrl;
  }

  /**
   * Get all the users searches.
   * /list/{listName}
   *
   * @param {object} options
   * @param {string} options.listName
   * @param {number} options.page min: 1 - Has no effect if not set.
   * @param {number} options.size min: 1 - If not set returns the full list.
   * @returns {Promise<Search[]>} a list of searches.
   * @memberof FollowSearches
   */
  async getSearches({ listName = "default", page, size } = {}) {
    if (!listName) {
      throw Error("listName must be provided.");
    }

    const query = [page && `page=${page}`, size && `size=${size}`]
      .filter(parameter => parameter)
      .join("&");

    const raw = await fetch(
      `${this.baseUrl}/list/${listName}${query ? `?${query}` : ""}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${this.token}`
        }
      }
    );
    if (raw.status !== 200) {
      throw Error(raw.status);
    }
    return raw.json();
  }

  /**
   * Add search to the list.
   * /list/{listName}/add
   *
   * @param {object} options
   * @param {string} options.listName
   * @param {Search} options.query
   * @returns {Promise}
   * @memberof FollowSearches
   */
  async addSearch({ listName = "default", query, title } = {}) {
    if (!query) {
      throw Error("query must be provided.");
    }
    if (!title) {
      throw Error("title must be provided");
    }

    const response = await fetch(`${this.baseUrl}/list/${listName}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`
      },
      body: JSON.stringify({ title, query })
    });
    if (response.status !== 201) {
      throw Error(response.status);
    }
  }

  /**
   * Get the search results (pids) for a specific search.
   * /list/{listName}/{searchId}
   *
   * @param {object} options
   * @param {string} options.listName
   * @param {number} options.searchId
   * @param {string[]} options.fields https://raw.githubusercontent.com/DBCDK/serviceprovider/master/doc/work-context.jsonld
   * @returns {Promise<Material[]>} materials pids of the search.
   * @memberof FollowSearches
   */
  async getResultsForSearch({
    listName = "default",
    searchId,
    fields = ["pid", "dcTitleFull"]
  } = {}) {
    if (!searchId) {
      throw Error("searchId must be provided");
    }
    const formattedFields = fields.map(encodeURIComponent).join(",");
    const raw = await fetch(
      `${this.baseUrl}/list/${listName}/${searchId}?fields=${formattedFields}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${this.token}`
        }
      }
    );
    if (raw.status !== 200) {
      throw Error(raw.status);
    }
    const response = await raw.json();
    return response.materials;
  }

  /**
   * Delete search from list.
   * /list/{listName}/{searchId}
   *
   * @param {object} options
   * @param {string} options.listName
   * @param {number} options.searchId
   * @returns {Promise}
   * @memberof FollowSearches
   */
  async deleteSearch({ listName = "default", searchId }) {
    if (!searchId) {
      throw Error("searchId must be provided");
    }

    const response = await fetch(
      `${this.baseUrl}/list/${listName}/${searchId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }
    );
    if (response.status !== 204) {
      throw Error(response.status);
    }
  }
}

export default FollowSearches;
