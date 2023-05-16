import React, { FC } from "react";
import { useGetFavoriteMaterialManifestationQuery } from "../../core/dbc-gateway/generated/graphql";
import { Work } from "../../core/utils/types/entities";
import CardListItem from "./card-list-item";
import { Pid } from "../../core/utils/types/ids";

export interface CardListProps {
  pid: Pid;
}

const CardList: FC<CardListProps> = ({ pid }) => {
  const { data } = useGetFavoriteMaterialManifestationQuery({
    id: pid
  });
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

export default CardList;
