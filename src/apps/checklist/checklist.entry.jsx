import React, { useEffect, useState } from "react";
import urlPropType from "url-prop-type";
import PropTypes from "prop-types";
import Checklist from "./checklist";
import MaterialList from "../../core/MaterialList";
import OpenPlatform from "../../core/OpenPlatform";

const client = new MaterialList();

/**
 * @param {object} item - the OpenPlatform item (i.e. material info)
 * @memberof ChecklistEntry
 * @returns {object} item - the item data with modified values and property names.
 * @returns {string|string[]} item.creator - authors/creators of the material.
 * @returns {string} - item.title - the title of the material.
 * @returns {string} - item.type - the type of material (book, movie, etc.)
 * @returns {string} - item.year - the year the material was published.
 */
function formatResult(item) {
  return {
    ...item,
    pid: item.pid?.[0],
    creators: item.dcCreator ? item.dcCreator : item.creator,
    title: item.dcTitleFull?.[0],
    type: item.typeBibDKType?.[0],
    year: item.date?.[0],
    coverUrl: item.coverUrlThumbnail?.[0]
  };
}

/**
 * @param {object} - object with the URL for the material and author URL.
 * @memberof ChecklistEntry
 * @returns {ReactNode}
 */
function ChecklistEntry({
  materialUrl,
  authorUrl,
  removeButtonText,
  emptyListText,
  errorText,
  ofText
}) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState("inactive");

  useEffect(function getList() {
    setLoading("active");
    client
      .getList()
      .then(function onResult(result) {
        if (result && result.length) {
          const op = new OpenPlatform();
          return op.getWork({
            pids: result,
            fields: [
              "dcTitleFull",
              "pid",
              "coverUrlThumbnail",
              "dcCreator",
              "creator",
              "typeBibDKType",
              "date"
            ]
          });
        }
        return [];
      })
      .then(result => {
        setLoading("finished");
        setList(result.map(formatResult));
      })
      .catch(function onError() {
        setLoading("failed");
      });
  }, []);

  /**
   * Function to remove a material from the list.
   *
   * @param {string} materialId - the material ID / pid.
   * @memberof ChecklistEntry
   */
  function onRemove(materialId) {
    const fallbackList = [...list];
    setList(
      list.filter(function removeMaterial(item) {
        return item.pid !== materialId;
      })
    );
    client.deleteListMaterial({ materialId }).catch(function onError() {
      setLoading("failed");
      setTimeout(function onRestore() {
        setLoading("inactive");
        setList(fallbackList);
      }, 2000);
    });
  }
  return (
    <Checklist
      loading={loading}
      items={list}
      onRemove={onRemove}
      materialUrl={materialUrl}
      authorUrl={authorUrl}
      removeButtonText={removeButtonText}
      emptyListText={emptyListText}
      errorText={errorText}
      ofText={ofText}
    />
  );
}

ChecklistEntry.propTypes = {
  materialUrl: urlPropType.isRequired,
  authorUrl: urlPropType.isRequired,
  removeButtonText: PropTypes.string,
  emptyListText: PropTypes.string,
  errorText: PropTypes.string,
  ofText: PropTypes.string
};

ChecklistEntry.defaultProps = {
  removeButtonText: "Fjern fra listen",
  emptyListText: "Listen er tom",
  errorText: "Noget gik galt",
  ofText: "Af"
};

export default ChecklistEntry;
