import React, { FC } from "react";

interface EmptyListProps {
  emptyListText: string;
  dataCy?: string;
}

const EmptyList: FC<EmptyListProps> = ({ emptyListText, dataCy }) => {
  return (
    <div data-cy={dataCy} className="dpl-list-empty mt-24">
      {emptyListText}
    </div>
  );
};

export default EmptyList;
