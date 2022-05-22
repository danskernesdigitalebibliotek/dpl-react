import { useEffect, useState } from "react";
import { getData } from "../../staticData.slice";
import { RootState, store, useSelector } from "../../store";

export const useStaticData = (
  type: "texts" | "data" = "data"
): {
  loading: boolean;
  texts?: { [key: string]: string };
  data?: { [key: string]: unknown } | null;
} => {
  const { loading, data } = useSelector((state: RootState) => state.staticData);

  useEffect(() => {
    const fetchData = async () => {
      if (!loading && !data) {
        await store.dispatch(getData());
      }
    };
    fetchData();
  }, [loading, data]);

  if (type && data?.[type]) {
    return {
      [type]: data[type],
      loading
    };
  }

  return {
    data,
    loading
  };
};

export default {};
