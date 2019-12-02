import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Checklist from "./checklist";
import MaterialList from "../../core/MaterialList";
import OpenPlatform from "../../core/OpenPlatform";

const client = new MaterialList();

function format(result) {
  return result.map(item => {
    const newItem = item;

    // Use dcCreator if it exists, otherwise fallback to dcCreator.
    newItem.creator = item.dcCreator ? item.dcCreator : item.creator;
    newItem.title = item.dcTitleFull;
    newItem.type = item.typeBibDKType;
    newItem.year = item.date;

    // Delete old properties because we use new, more descriptive names.
    delete newItem.dcTitleFull;
    delete newItem.typeBibDKType;
    delete newItem.date;

    return newItem;
  });
}

function ChecklistEntry({ materialUrl, authorUrl }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState("inactive");

  useEffect(function getList() {
    setLoading("active");
    client
      .getList()
      .then(function onResult(result) {
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
      })
      .then(result => {
        setList(format(result));
      })
      .catch(function onError() {
        setList([]);
      })
      .finally(function onEnd() {
        setLoading("finished");
      });
  }, []);

  function onRemove(materialId) {
    const fallbackList = [...list];
    setList(
      list.filter(function removeMaterial(item) {
        return item.pid !== materialId;
      })
    );
    client.deleteListMaterial({ materialId }).catch(function onError() {
      setTimeout(function onRestore() {
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
    />
  );
}

ChecklistEntry.propTypes = {
  materialUrl: PropTypes.string.isRequired,
  authorUrl: PropTypes.string.isRequired
};

export default ChecklistEntry;
