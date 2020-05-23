import fetch from "unfetch";
import { getToken } from "./token";

/**
 * https://cover.dandigbib.org/api/
 *
 * @class CoverService
 */
class CoverService {
  /**
   *Creates an instance of CoverService.
   * @param {object} options
   * @param {string} options.baseUrl
   * @memberof CoverService
   */
  constructor({ baseUrl }) {
    this.token = getToken("library");
    this.baseUrl = baseUrl;
  }

  /**
   * Get a cover for a a material provided it's id.
   *
   * @param {object} options
   * @param {string | string[]} options.id the actual id(s) of the material.
   * @param {string} options.idType a material can have a multitude of id's of different types.
   * @param {string} options.format which format to return the image in.
   * @param {string} options.size the relative size of the image to be returned.
   * @param {boolean} options.generic if placeholders should be returned for the image if no image exists.
   *
   * @returns {string} requested cover as an url string
   * @memberof CoverService
   */
  async getCover({
    id,
    idType = "pid",
    format = ["jpeg"],
    size = ["default"],
    generic = true
  }) {
    if (!id) {
      throw Error("id must be specified");
    }
    const multipleIds = Array.isArray(id);
    const base = `${this.baseUrl}/cover/${idType}`;
    const withId = multipleIds
      ? `${base}?id=${id.map(encodeURIComponent).join(",")}&`
      : `${base}/${encodeURIComponent(id)}?`;
    const formattedFormat = format.join(",");
    const formattedSize = size.join(",");
    const url = `${withId}format=${formattedFormat},&size=${formattedSize},&generic=${generic.toString()}`;
    const raw = await fetch(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.token}`
      }
    });
    if (raw.status !== 200) {
      throw Error(raw.status);
    }
    const response = await raw.json();
    return response;
  }
}

export default CoverService;
