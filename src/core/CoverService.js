import fetch from "unfetch";
import { getToken } from "./token";

/**
 * https://cover.dandigbib.org/api/v2
 *
 * @class CoverService
 */
class CoverService {
  /**
   * Creates an instance of CoverService.
   *
   * @param {object} options
   * @param {string} options.baseUrl
   * @memberof CoverService
   */
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  /**
   * @typedef {Object} ImageUrl
   * @property {?string} url - The url for the image.
   *   Null if the requested size is larger than the original.
   * @property {string} format - The format of the image
   * @property {string} size - The size of the image
   */

  /**
   * @typedef {Object} Cover
   * @property {string} id - The material id
   * @property {"pid"|"isbn"} type - The material id type
   * @property {Object<string, ImageUrl>} map from size strings to image urls
   */

  /**
   * Get a cover for a a material provided it's id.
   *
   * @param {object} options
   * @param {string | string[]} options.id the actual id(s) of the material.
   * @param {string} options.idType a material can have a multitude of id's of different types.
   * @param {string[]} options.size the relative sizes of the images to be returned.
   *
   * @returns {Cover[]} requested covers
   * @memberof CoverService
   */
  async getCover({ id, idType = "pid", size = ["default"] }) {
    if (!id) {
      throw Error("id must be specified");
    }
    const ids = Array.isArray(id) ? id : [id];
    const base = `${this.baseUrl}/covers`;
    const withId = `${base}?type=${idType}&identifiers=${ids
      .map(encodeURIComponent)
      .join(",")}`;
    const formattedSize = size.join(",");
    const url = `${withId}&sizes=${formattedSize}`;
    const raw = await fetch(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken("library")}`
      }
    });
    if (raw.status !== 200) {
      throw Error(raw.status);
    }
    return raw.json();
  }
}

export default CoverService;
