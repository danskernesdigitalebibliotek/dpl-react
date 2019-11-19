import { getToken } from "./getToken";

/**
 * https://github.com/reload/material-list/blob/develop/spec/material-list-1.0.0.yaml
 *
 * @class MaterialList
 */
class MaterialList {
  constructor() {
    this.token = getToken();
  }

  /**
   * Get list with materials.
   *
   * @param {string} listId
   * @returns {Promise<string[]>}
   * @memberof MaterialList
   */
  getList(listId) {
    return new Promise((resolve, reject) => {
      console.info(`Getting list: ${listId}`);
      try {
        setTimeout(() => {
          console.info("The list data is returned.");
          resolve([
            "96f46e13-2e38-4a22-b3f0-1d5efcfcd913",
            "7ac899d6-bad3-4fe7-b654-fc32a085deac",
            "a9c4538a-0706-4bd9-972f-6d9997854bc9"
          ]);
        }, 500);
      } catch (err) {
        reject("Unspecified error.");
      }
    });
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
  checkListMaterial({ listId, materialId }) {
    return new Promise((resolve, reject) => {
      console.info(`Checking list: ${listId} contains material: ${materialId}`);
      try {
        setTimeout(() => {
          console.info("The material exists on the list.");
          resolve(true);
        }, 500);
      } catch (err) {
        reject("Unspecified error.");
      }
    });
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
  addListMaterial({ listId, materialId }) {
    return new Promise((resolve, reject) => {
      console.info(`Adding to list: ${listId} with material: ${materialId}`);
      try {
        setTimeout(() => {
          console.info("The material was successfully added to the list.");
          resolve(true);
        }, 500);
      } catch (err) {
        reject("Unspecified error.");
      }
    });
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
  deleteListMaterial({ listId, materialId }) {
    return new Promise((resolve, reject) => {
      console.info(`Deleting from list: ${listId} material: ${materialId}`);
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

export default MaterialList;
