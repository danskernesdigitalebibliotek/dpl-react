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
  removeUrlQueryParam,
  setQueryParametersInUrl
} from "../../core/utils/helpers/url";

const useFilterHandler = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filter) as Filter;

  const clearFilter = useCallback(() => {
    removeUrlQueryParam("filters");
    dispatch(clear());
  }, [dispatch]);

  const addToFilter = useCallback(
    (payload: FilterPayloadType) => {
      setQueryParametersInUrl({
        filters: "withFilters"
      });
      dispatch(add(payload));
    },
    [dispatch]
  );

  const removeFromFilter = useCallback(
    (payload: FilterPayloadType) => dispatch(remove(payload)),
    [dispatch]
  );

  return { filters, addToFilter, removeFromFilter, clearFilter };
};

export default useFilterHandler;
