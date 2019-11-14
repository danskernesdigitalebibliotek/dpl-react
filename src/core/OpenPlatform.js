/**
 * @typedef Work
 * In "definitions" look for "Work" to see all the different fields
 * one can get.
 * https://openplatform.dbc.dk/v3/swagger.json
 * https://raw.githubusercontent.com/DBCDK/serviceprovider/master/doc/work-context.jsonld
 */

class OpenPlatform {
  /**
   * The endpoint of OpenPlatform.
   * https://openplatform.dbc.dk/v3/
   *
   * @memberof OpenPlatform
   */
  baseUrl = "https://openplatform.dbc.dk/v3/";

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
  getWork({ pids = [], fields = [], formatter = this.defaultWorkFormatter }) {
    return new Promise((resolve, reject) => {
      console.info(`Getting work: ${JSON.stringify(pids)}`);
      const formattedPids = pids.map(pid => `pids=${pid}`).join("&");
      const formattedFields = fields.map(field => `fields=${field}`).join("&");
      const getWorkUrl = `${this.baseUrl}work?${formattedPids}&${formattedFields}`;
      console.info(`Retrieving work from: ${getWorkUrl}`);
      try {
        setTimeout(() => {
          resolve(
            formatter([
              {
                pid: ["870970"],
                dcTitleFull: ["Harry Potter og de vises sten"],
                creatorAut: ["Joanne K. Rowling"],
                date: ["2018"],
                type: ["bog"]
              },
              {
                pid: ["710100"],
                dcTitleFull: ["The way of kings"],
                creatorAut: ["Brandon Sanderson"],
                date: ["2011"],
                type: ["bog"]
              },
              {
                pid: ["510061"],
                dcTitleFull: [
                  "The way of kings : The Stormlight Archive Series, Book 1"
                ],
                creatorAut: ["Brandon Sanderson"],
                date: ["2010"],
                type: ["ebog"]
              }
            ])
          );
        }, 500);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default OpenPlatform;
