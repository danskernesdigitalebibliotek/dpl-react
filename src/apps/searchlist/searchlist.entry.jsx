import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import urlPropType from "url-prop-type";

import Searchlist from "./searchlist";
import FollowSearches from "../../core/FollowSearches";

const client = new FollowSearches();

function SearchlistEntry({
  newButtonText,
  removeButtonText,
  statusText,
  searchUrl,
  authorUrl,
  materialUrl
}) {
  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState("inactive");
  const [materials, setMaterials] = useState([]);
  useEffect(function getSearches() {
    setLoading("active");
    client
      .getSearches()
      .then(function onSuccess(result) {
        setSearches(result);
        setLoading("finished");
      })
      .catch(function onError() {
        setLoading("failed");
      });
  }, []);

  function openMaterials(id) {
    const existingMaterial = materials.find(current => current.id === id);
    if (!existingMaterial) {
      setMaterials(
        materials.concat([
          {
            id,
            open: true
          }
        ])
      );
    } else {
      setMaterials(
        materials.map(material => {
          if (existingMaterial.id === material.id) {
            return {
              ...material,
              open: true
            };
          }
          return material;
        })
      );
    }
  }

  function closeMaterials(id) {
    setMaterials(
      materials.map(current => {
        if (current.id === id) {
          return {
            ...current,
            open: false
          };
        }
        return current;
      })
    );
  }

  return (
    <Searchlist
      loading={loading}
      searches={searches}
      materials={materials}
      onOpenMaterials={openMaterials}
      onCloseMaterials={closeMaterials}
      newButtonText={newButtonText}
      removeButtonText={removeButtonText}
      statusText={statusText}
      searchUrl={searchUrl}
      authorUrl={authorUrl}
      materialUrl={materialUrl}
    />
  );
}

SearchlistEntry.propTypes = {
  newButtonText: PropTypes.string,
  removeButtonText: PropTypes.string,
  statusText: PropTypes.string,
  searchUrl: urlPropType.isRequired,
  materialUrl: urlPropType.isRequired,
  authorUrl: urlPropType.isRequired
};

SearchlistEntry.defaultProps = {
  newButtonText: "Nye materialer",
  removeButtonText: "Fjern fra listen",
  statusText: ":hit_count nye materialer siden"
};

export default SearchlistEntry;
