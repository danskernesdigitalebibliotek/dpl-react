import React, { FC } from "react";
import { Pid } from "../../../core/utils/types/ids";
// import { useGetFavoriteMaterialManifestationQuery } from "../../../core/dbc-gateway/generated/graphql";
// eslint-disable-next-line import/extensions
import { first } from "./testData";
import { Work } from "../../../core/utils/types/entities";
import RecommendMaterial from "../recommender/RecommendMaterial";

export interface SearchResultListItemAdapterProps {
  pid: Pid;
}

const SearchResultListItemAdapter: FC<SearchResultListItemAdapterProps> = ({
  pid
}) => {
  console.log(first);
  // const { data } = useGetFavoriteMaterialManifestationQuery({
  //   id: pid
  // });

  return first?.data?.work ? (
    <RecommendMaterial work={first.data.work as unknown as Work} />
  ) : null;
};

export default SearchResultListItemAdapter;
