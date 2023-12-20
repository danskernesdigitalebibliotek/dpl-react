import React, { FC, ReactNode } from "react";

export interface ListHeaderProps {
  header: string | ReactNode;
  amount: number | null;
  children?: ReactNode;
  dataCy?: string;
}

const ListHeader: FC<ListHeaderProps> = ({
  header,
  amount,
  children,
  dataCy = "list-header"
}) => {
  return (
    <div className="dpl-list-buttons">
      <h2 data-cy={dataCy} className="dpl-list-buttons__header">
        {header}
        {amount !== null && (
          <span role="text" className="dpl-list-buttons__power">
            {amount}
          </span>
        )}
      </h2>
      <div className="dpl-list-buttons__buttons">{children}</div>
    </div>
  );
};
export default ListHeader;
