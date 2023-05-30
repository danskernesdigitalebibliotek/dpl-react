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
import { FacetField } from "../../core/dbc-gateway/generated/graphql";

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

  const addFilterFromUrlParamListener = (facet: FacetField) => {
    const urlFilter = getUrlQueryParam(facet);
    if (urlFilter) {
      addToFilter({
        facet,
        term: { key: urlFilter, term: urlFilter }
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
