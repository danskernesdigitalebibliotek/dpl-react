import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import urlPropType from "url-prop-type";

import Searchlist from "./searchlist";
import FollowSearches from "../../core/FollowSearches";
import Material from "../../core/Material";

const client = new FollowSearches();

function SearchlistEntry({
  newButtonText,
  removeButtonText,
  statusText,
  goToSearchText,
  searchUrl,
  authorUrl,
  materialUrl
}) {
  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState("inactive");
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
    const hasMaterials = searches.find(function findMaterial(search) {
      return search.id === id && search.materials;
    });
    setSearches(
      searches.map(function openCurrentMaterial(search) {
        if (search.id === id) {
          return {
            ...search,
            open: true
          };
        }
        return search;
      })
    );
    // Do not make a second request if the materials have already been populated.
    if (!hasMaterials) {
      client
        .getResultsForSearch({
          searchId: id,
          fields: [
            "dcTitleFull",
            "pid",
            "coverUrlThumbnail",
            "dcCreator",
            "creator",
            "typeBibDKType",
            "date"
          ]
        })
        .then(function onResult(result) {
          setSearches(
            searches.map(function importMaterials(search) {
              if (search.id === id) {
                return {
                  ...search,
                  open: true,
                  materials: result.map(Material.format)
                };
              }
              return search;
            })
          );
        });
    }
  }

  function closeMaterials(id) {
    setSearches(
      searches.map(function findCurrentMaterial(search) {
        if (search.id === id) {
          return {
            ...search,
            open: false
          };
        }
        return search;
      })
    );
  }

  function removeSearch(id) {
    const fallback = [...searches];
    setSearches(searches.filter(search => search.id !== id));
    client.deleteSearch({ searchId: id }).catch(function onError() {
      setSearches(fallback);
    });
  }

  return (
    <Searchlist
      loading={loading}
      searches={searches}
      onOpenMaterials={openMaterials}
      onCloseMaterials={closeMaterials}
      onRemoveSearch={removeSearch}
      newButtonText={newButtonText}
      removeButtonText={removeButtonText}
      statusText={statusText}
      searchUrl={searchUrl}
      authorUrl={authorUrl}
      materialUrl={materialUrl}
      goToSearchText={goToSearchText}
    />
  );
}

SearchlistEntry.propTypes = {
  newButtonText: PropTypes.string,
  removeButtonText: PropTypes.string,
  goToSearchText: PropTypes.string,
  statusText: PropTypes.string,
  searchUrl: urlPropType.isRequired,
  materialUrl: urlPropType.isRequired,
  authorUrl: urlPropType.isRequired
};

SearchlistEntry.defaultProps = {
  newButtonText: "Nye materialer",
  removeButtonText: "Fjern fra listen",
  statusText: ":hit_count nye materialer siden",
  goToSearchText: "Vis søgeresultat"
};

export default SearchlistEntry;
