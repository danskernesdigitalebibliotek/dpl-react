import * as React from "react";
import { FC } from "react";

export interface InfoLabelProps {
  dataCy?: string;
  children: React.ReactNode;
}

const InfoLabel: FC<InfoLabelProps> = ({ dataCy = "info-label", children }) => {
  return (
    <div data-cy={dataCy} className="status-label status-label--info">
      {children}
    </div>
  );
};

export default InfoLabel;
