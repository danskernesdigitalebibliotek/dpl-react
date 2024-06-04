import * as React from "react";
import { FC } from "react";

export interface SimpleModalHeaderProps {
  header: string;
}

const SimpleModalHeader: FC<SimpleModalHeaderProps> = ({ header }) => {
  return (
    <div className="modal-loan__header">
      <div>
        <h2 className="modal-loan__title text-header-h2">{header}</h2>
      </div>
    </div>
  );
};

export default SimpleModalHeader;
