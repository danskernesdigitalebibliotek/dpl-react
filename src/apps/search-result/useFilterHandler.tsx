import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  add,
  remove,
  clear,
  FilterPayloadType,
  Filter
} from "../../core/filter.slice";
import { RootState } from "../../core/store";
import {
  getUrlQueryParam,
  removeQueryParametersFromUrl,
  setQueryParametersInUrl
} from "../../core/utils/helpers/url";
import { FacetFieldEnum } from "../../core/dbc-gateway/generated/graphql";
import { mapFacetToFilter } from "./helper";

const useFilterHandler = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filter) as Filter;

  const clearFilter = useCallback(() => {
    removeQueryParametersFromUrl("filters");
    dispatch(clear());
  }, [dispatch]);

  const addToFilter = useCallback(
    (payload: FilterPayloadType) => {
      if (getUrlQueryParam("filters") !== "usePersistedFilters") {
        setQueryParametersInUrl({
          filters: "usePersistedFilters"
        });
      }

      dispatch(add(payload));
    },
    [dispatch]
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
        term: { key: "key", term: urlFilter, traceId: "traceId" }
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
