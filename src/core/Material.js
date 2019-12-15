class Material {
  /**
   * @param {object} raw OpenPlatform item (i.e. material info)
   * @returns {object} item item data with modified values and property names.
   * @returns {string} item.pid id of the material.
   * @returns {string[]} item.creators authors/creators of the material.
   * @returns {string} item.title title of the material.
   * @returns {string} item.type type of material (book, movie, etc.)
   * @returns {string} item.year year the material was published.
   * @returns {string} item.coverUrl cover of the item.
   */
  static format(raw) {
    return {
      ...raw,
      pid: raw.pid?.[0],
      creators: raw.dcCreator ? raw.dcCreator : raw.creator,
      title: raw.dcTitleFull?.[0],
      type: raw.typeBibDKType?.[0],
      year: raw.date?.[0],
      coverUrl: raw.coverUrlThumbnail?.[0]
    };
  }
}

export default Material;
