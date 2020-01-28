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
    this.token = getToken();
    this.baseUrl = baseUrl;
  }

  /**
   * Get a cover for a a material provided it's id.
   *
   * @param {object} options
   * @param {string} options.id the actual id of the material.
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
    const base = `${this.baseUrl}/cover/${idType}/${encodeURIComponent(id)}`;
    const formattedFormat = format.join(",");
    const formattedSize = size.join(",");
    const url = `${base}?format=${formattedFormat},&size=${formattedSize},&generic=${generic.toString()}`;
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
    // TODO: this filtering will be refactored when the service actually
    // returns whats asked of it.
    const finalImage = response.imageUrls.filter(
      image =>
        format.some(currentFormat => image.format === currentFormat) &&
        size.some(currentSize => image.size === currentSize)
    );
    return finalImage?.[0]?.url;
  }
}

export default CoverService;
