import React, { FC } from "react";

interface EmptyListProps {
  emptyListText: string;
}

const EmptyList: FC<EmptyListProps> = ({ emptyListText }) => {
  return <div className="dpl-list-empty mt-24">{emptyListText}</div>;
};

export default EmptyList;
