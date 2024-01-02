import React, { FC, ReactNode } from "react";

export interface ListHeaderProps {
  header: string;
  amount: number;
  children?: ReactNode;
}

const ListHeader: FC<ListHeaderProps> = ({ header, amount, children }) => {
  return (
    <div className="dpl-list-buttons">
      <h2 className="dpl-list-buttons__header">
        {header}
        <span className="dpl-list-buttons__power">{amount}</span>
      </h2>
      <div className="dpl-list-buttons__buttons">{children}</div>
    </div>
  );
};
export default ListHeader;
