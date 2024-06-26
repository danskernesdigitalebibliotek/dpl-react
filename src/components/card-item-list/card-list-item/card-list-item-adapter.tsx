import React, { FC } from "react";
import { useGetSmallWorkQuery } from "../../../core/dbc-gateway/generated/graphql";
import { Work } from "../../../core/utils/types/entities";
import CardListItem from "./card-list-item";
import { Pid } from "../../../core/utils/types/ids";
import CardListItemSkeleton from "./card-list-item-skeleton";

export interface CardListItemAdapterProps {
  pid: Pid;
}

const CardListItemAdapter: FC<CardListItemAdapterProps> = ({ pid }) => {
  const { data, isLoading } = useGetSmallWorkQuery({
    id: pid
  });

  if (isLoading) return <CardListItemSkeleton />;

  return (
    <div>
      {data && data.work && (
        <CardListItem
          key={data.work?.workId}
          item={data.work as Work}
          coverTint="100"
          resultNumber={0}
        />
      )}
    </div>
  );
};

export default CardListItemAdapter;
