import lodash from "lodash";
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
import { FacetFieldEnum, SearchSortingOption } from "../../core/dbc-gateway/generated/graphql";
import { mapFacetToFilter } from "./helper";

const useFilterHandler = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => {
    return lodash.omit(state.filter || {}, ["sorting"]);
  }) as Filter;

  const sorting = useSelector((state: RootState) => {
    const activeSortingKey = Object.keys(state.filter.sorting || {})[0];

    if (!activeSortingKey) return null;

    return state.filter.sorting[activeSortingKey];
  });

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
      addToFilter({
        facet: mapFacetToFilter(facet),
        term: { key: "key", term: urlFilter }
      });
    }
  };

  const setSorting = (_sorting: SearchSortingOption | undefined) => {
    dispatch(
      add({
        facet: "sorting",
        term: { key: _sorting?.value || "", term: _sorting?.name || "" }
      })
    );
  };

  return {
    filters,
    addToFilter,
    removeFromFilter,
    clearFilter,
    addFilterFromUrlParamListener,
    sorting,
    setSorting
  };
};

export default useFilterHandler;
