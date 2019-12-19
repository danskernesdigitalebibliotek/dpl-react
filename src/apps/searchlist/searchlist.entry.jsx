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
  emptyListText,
  errorText,
  statusText,
  goToSearchText,
  errorMaterialsText,
  newWindowText,
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

  function fetchMaterials(id) {
    const hasMaterials = searches.find(function findMaterial(search) {
      return search.id === id && search.materials;
    });
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
        })
        .catch(function onError() {
          setSearches(
            searches.map(function importMaterials(search) {
              if (search.id === id) {
                return {
                  ...search,
                  open: true,
                  materialsFailed: true
                };
              }
              return search;
            })
          );
        });
    }
  }

  function openMaterials(id) {
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
    fetchMaterials(id);
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
      onSearchLinkClick={fetchMaterials}
      newButtonText={newButtonText}
      removeButtonText={removeButtonText}
      errorText={errorText}
      errorMaterialsText={errorMaterialsText}
      newWindowText={newWindowText}
      emptyListText={emptyListText}
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
  errorText: PropTypes.string,
  newWindowText: PropTypes.string,
  emptyListText: PropTypes.string,
  goToSearchText: PropTypes.string,
  errorMaterialsText: PropTypes.string,
  statusText: PropTypes.string,
  searchUrl: urlPropType.isRequired,
  materialUrl: urlPropType.isRequired,
  authorUrl: urlPropType.isRequired
};

SearchlistEntry.defaultProps = {
  newButtonText: "Nye materialer",
  removeButtonText: "Fjern fra listen",
  newWindowText: "Åbner et nyt vindue",
  emptyListText: "Ingen gemte søgninger.",
  errorText: "Gemte søgninger kunne ikke hentes.",
  errorMaterialsText: "Materialer kunne ikke hentes.",
  statusText: ":hit_count nye materialer siden",
  goToSearchText: "Vis søgeresultat"
};

export default SearchlistEntry;
