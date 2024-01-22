import React, { FC, ReactNode } from "react";

export interface ListHeaderProps {
  header: string | ReactNode;
  amount: number | null;
  buttons?: ReactNode;
  dataCy?: string;
}

const ListHeader: FC<ListHeaderProps> = ({
  header,
  amount,
  buttons,
  dataCy = "list-header"
}) => {
  return (
    <div className="dpl-list-buttons">
      <h2 data-cy={dataCy} className="dpl-list-buttons__header">
        {header}
        {amount !== null && (
          <span className="dpl-list-buttons__power">{amount}</span>
        )}
      </h2>
      {buttons && <div className="dpl-list-buttons__buttons">{buttons}</div>}
    </div>
  );
};
export default ListHeader;
