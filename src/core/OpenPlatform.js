import fetch from "unfetch";
import { getToken } from "./token";

/**
 * A dedicated formatter for pids is required since there are some
 * quirks to it introduced from the OpenPlatform API.
 * The final pids query string needs to always have a "comma" at the end
 * to signify that it's and array of string.
 * That is not needed for "fields" or anything else I have encountered.
 * Solely "pids".
 * @param {string[]} pids
 * @returns {string} string of pids
 * @memberof OpenPlatform
 */
function formatPids(pids = []) {
  return `${pids.map(encodeURIComponent).join(",")},`;
}

/**
 * @typedef Work
 * In "definitions" look for "Work" to see all the different fields
 * one can get.
 * https://openplatform.dbc.dk/v3/swagger.json
 * https://raw.githubusercontent.com/DBCDK/serviceprovider/master/doc/work-context.jsonld
 */

class OpenPlatform {
  constructor() {
    this.token = getToken();
    this.baseUrl = "https://openplatform.dbc.dk/v3";
  }

  /**
   * Retrieve meta information about creative work(s).
   * In other words, books, cd's etc.
   *
   * @param {object} options
   * @param {string[]} options.pids - id's of the work.
   * @param {string[]} options.fields - https://raw.githubusercontent.com/DBCDK/serviceprovider/master/doc/work-context.jsonld
   * @returns {Promise<Work[]>}
   * @memberof OpenPlatform
   */
  async getWork({ pids = [], fields = ["title"] } = {}) {
    const formattedPids = formatPids(pids);
    const formattedFields = fields.map(encodeURIComponent).join(",");
    const getWorkUrl = `${this.baseUrl}/work?access_token=${this.token}&fields=${formattedFields}&pids=${formattedPids}`;

    const rawResponse = await fetch(getWorkUrl, {
      headers: { Accept: "application/json" }
    });
    const response = await rawResponse.json();
    if (response.statusCode !== 200) throw Error(response.error);
    if (!response.data) throw Error("data not found");

    return response.data;
  }
}

export default OpenPlatform;
