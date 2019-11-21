import { getToken } from "./token.js";

/**
 * https://github.com/reload/material-list/blob/develop/spec/material-list-1.0.0.yaml
 *
 * @class MaterialList
 */
class MaterialList {
  constructor() {
    this.token = getToken();
    this.baseUrl = "https://test.materiallist.dandigbib.org";
  }

  /**
   * Get list with materials.
   *
   * @param {string} listId
   * @returns {Promise<string[]>}
   * @memberof MaterialList
   */
  async getList(listId = "default") {
    const rawResponse = await fetch(`${this.baseUrl}/list/${listId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${this.token}`
      }
    });
    const response = await rawResponse.json();
    return response.materials;
  }

  /**
   * Check existence of material on list.
   *
   * @param {object} options
   * @param {string} options.listId
   * @param {string} options.materialId
   * @returns {Promise<boolean>}
   * @memberof MaterialList
   */
  async checkListMaterial({ listId = "default", materialId } = {}) {
    if (!materialId) {
      console.warn("materialId was not specified.");
      return;
    }
    const rawResponse = await fetch(
      `${this.baseUrl}/list/${listId}/${materialId}`,
      {
        method: "HEAD",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${this.token}`
        }
      }
    );
    const response = await rawResponse.json();
    return Boolean(response.status === 204);
  }

  /**
   * Add material to the the list.
   *
   * @param {object} options
   * @param {string} options.listId
   * @param {string} options.materialId
   * @returns {Promise<boolean>}
   * @memberof MaterialList
   */
  async addListMaterial({ listId = "default", materialId } = {}) {
    if (!materialId) {
      console.warn("materialId was not specified.");
      return;
    }
    const response = await fetch(
      `${this.baseUrl}/list/${listId}/${materialId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }
    );
    return Boolean(response.status === 204);
  }

  /**
   * Delete material from list.
   *
   * @param {object} options
   * @param {string} options.listId
   * @param {string} options.materialId
   * @returns {Promise<boolean>}
   * @memberof MaterialList
   */
  async deleteListMaterial({ listId = "default", materialId } = {}) {
    if (!materialId) {
      console.warn("materialId was not specified.");
      return;
    }
    const response = await fetch(
      `${this.baseUrl}/list/${listId}/${materialId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${this.token}`
        }
      }
    );
    return Boolean(response.status === 204);
  }
}

export default MaterialList;
