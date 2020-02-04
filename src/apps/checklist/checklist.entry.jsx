import React, { useEffect, useState } from "react";
import urlPropType from "url-prop-type";
import PropTypes from "prop-types";
import Checklist from "./checklist";
import MaterialList from "../../core/MaterialList";
import OpenPlatform from "../../core/OpenPlatform";
import Material from "../../core/Material";

/**
 * @param {object} - object with the URL for the material and author URL.
 * @memberof ChecklistEntry
 * @returns {ReactNode}
 */
function ChecklistEntry({
  materialListUrl,
  materialUrl,
  authorUrl,
  coverServiceUrl,
  removeButtonText,
  emptyListText,
  errorText,
  ofText
}) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState("inactive");

  useEffect(
    function getList() {
      setLoading("active");

      const client = new MaterialList({ baseUrl: materialListUrl });
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
          setList(result.map(Material.format));
        })
        .catch(function onError() {
          setLoading("failed");
        });
    },
    [materialListUrl]
  );

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
    const client = new MaterialList({ baseUrl: materialListUrl });
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
      coverServiceUrl={coverServiceUrl}
      removeButtonText={removeButtonText}
      emptyListText={emptyListText}
      errorText={errorText}
      ofText={ofText}
    />
  );
}

ChecklistEntry.propTypes = {
  materialListUrl: urlPropType,
  materialUrl: urlPropType.isRequired,
  authorUrl: urlPropType.isRequired,
  coverServiceUrl: urlPropType.isRequired,
  removeButtonText: PropTypes.string,
  emptyListText: PropTypes.string,
  errorText: PropTypes.string,
  ofText: PropTypes.string
};

ChecklistEntry.defaultProps = {
  materialListUrl: "https://test.materiallist.dandigbib.org",
  removeButtonText: "Fjern fra listen",
  emptyListText: "Listen er tom",
  errorText: "Noget gik galt",
  ofText: "Af"
};

export default ChecklistEntry;
