import { getToken } from "./token.js";

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
   * We want a default formatter that more or less just passes the
   * data through. This allows for the consumer to design their own formatter
   * and provide it.
   *
   * @param {Work[]} work
   * @returns {object}
   * @memberof OpenPlatform
   */
  defaultWorkFormatter(work) {
    return work;
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
  async getWork({
    pids = [],
    fields = ["title"],
    formatter = this.defaultWorkFormatter
  }) {
    const formattedPids = pids.map(encodeURIComponent).join(",") + ",";
    const formattedFields = fields.map(encodeURIComponent).join(",");
    const getWorkUrl = `${this.baseUrl}/work?access_token=${this.token}&fields=${formattedFields}&pids=${formattedPids}`;

    const rawResponse = await fetch(getWorkUrl, {
      headers: { Accept: "application/json" }
    });
    if (rawResponse.status !== 200) throw Error(rawResponse.status);

    const response = await rawResponse.json();
    if (response.statusCode !== 200) throw Error(response.statusCode);
    if (!response.data) throw Error("data not found");

    return formatter(response.data);
  }
}

export default OpenPlatform;
