import React, { FC } from "react";
import { useGetSmallWorkQuery } from "../../../core/dbc-gateway/generated/graphql";
import { Work } from "../../../core/utils/types/entities";
import CardListItem from "./card-list-item";
import CardListItemSkeleton from "./card-list-item-skeleton";
import { WorkId } from "../../../core/utils/types/ids";

export interface CardListItemAdapterProps {
  id: WorkId;
}

const CardListItemAdapter: FC<CardListItemAdapterProps> = ({ id }) => {
  const { data, isLoading } = useGetSmallWorkQuery({
    id
  });

  if (isLoading) return <CardListItemSkeleton />;

  return (
    <div>
      {data && data.work && (
        <CardListItem
          key={id}
          item={data.work as Work}
          coverTint="100"
          resultNumber={0}
        />
      )}
    </div>
  );
};

export default CardListItemAdapter;
