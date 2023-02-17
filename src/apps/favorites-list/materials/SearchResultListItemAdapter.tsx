import React, { FC } from "react";
import SearchResultListItem from "../../../components/search-result-list/search-result-list-item/search-result-list-item";
import { Pid } from "../../../core/utils/types/ids";
import { useGetFavoriteMaterialManifestationQuery } from "../../../core/dbc-gateway/generated/graphql";
import { Work } from "../../../core/utils/types/entities";

export interface SearchResultListItemAdapterProps {
  pid: Pid;
}

const SearchResultListItemAdapter: FC<SearchResultListItemAdapterProps> = ({
  pid
}) => {
  const { data } = useGetFavoriteMaterialManifestationQuery({
    id: pid
  });

  return (
    <div>
      {data && data.work && (
        <SearchResultListItem
          key={data.work?.workId}
          item={data.work as Work}
          coverTint="100"
          resultNumber={0}
        />
      )}
    </div>
  );
};

export default SearchResultListItemAdapter;
