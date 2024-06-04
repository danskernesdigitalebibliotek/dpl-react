import React, { FC } from "react";

interface EmptyListProps {
  emptyListText: string;
  dataCy?: string;
  classNames?: string;
}

const EmptyList: FC<EmptyListProps> = ({
  emptyListText,
  dataCy = "empty-list",
  classNames = ""
}) => {
  return (
    <div data-cy={dataCy} className={`dpl-list-empty ${classNames}`}>
      {emptyListText}
    </div>
  );
};

export default EmptyList;
