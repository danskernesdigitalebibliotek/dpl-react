import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  add,
  remove,
  clear,
  FilterPayloadType,
  Filter,
  FilterPayloadTypeWithOrigin
} from "../../core/filter.slice";
import { store, RootState } from "../../core/store";
import {
  getUrlQueryParam,
  removeQueryParametersFromUrl,
  setQueryParametersInUrl
} from "../../core/utils/helpers/url";
import { FacetFieldEnum } from "../../core/dbc-gateway/generated/graphql";
import { mapFacetToFilter } from "./helper";
import { useEventStatistics } from "../../core/statistics/useStatistics";
import { statistics } from "../../core/statistics/statistics";
import { getAllFilterPathsAsString } from "../../components/facet-browser/helper";

const useFilterHandler = () => {
  const { track } = useEventStatistics();
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filter) as Filter;

  const clearFilter = useCallback(() => {
    removeQueryParametersFromUrl("filters");
    dispatch(clear());
  }, [dispatch]);

  const addToFilter = useCallback(
    (payload: FilterPayloadTypeWithOrigin) => {
      if (getUrlQueryParam("filters") !== "usePersistedFilters") {
        setQueryParametersInUrl({
          filters: "usePersistedFilters"
        });
      }

      dispatch(add(payload));

      // Track the click event after updating the filters.
      // Use the store directly to get the latest filters state immediately after dispatch.
      // Determine the origin of the click event and track accordingly.
      const updatedFilters = store.getState().filter as Filter;

      if (payload.origin === "facetLine") {
        track("click", {
          id: statistics.facetsByFacetLineClick.id,
          name: statistics.facetsByFacetLineClick.name,
          trackedData: getAllFilterPathsAsString(updatedFilters, payload.origin)
        });
      }
      if (payload.origin === "facetBrowser") {
        track("click", {
          id: statistics.searchFacets.id,
          name: statistics.searchFacets.name,
          trackedData: getAllFilterPathsAsString(updatedFilters, payload.origin)
        });
      }
    },
    [dispatch, track]
  );

  const removeFromFilter = useCallback(
    (payload: FilterPayloadType) => dispatch(remove(payload)),
    [dispatch]
  );

  const addFilterFromUrlParamListener = (facet: FacetFieldEnum) => {
    const urlFilter = getUrlQueryParam(mapFacetToFilter(facet));
    if (urlFilter) {
      // We only use term from the url, therefore key is not important here.
      // We dont have a traceId, so we just use a placeholder.
      addToFilter({
        facet: mapFacetToFilter(facet),
        term: { key: "key", term: urlFilter, traceId: "traceId" },
        origin: "facetUrl"
      });
    }
  };

  return {
    filters,
    addToFilter,
    removeFromFilter,
    clearFilter,
    addFilterFromUrlParamListener
  };
};

export default useFilterHandler;
