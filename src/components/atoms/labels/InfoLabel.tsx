import * as React from "react";
import { FC } from "react";

export interface InfoLabelProps {
  children: React.ReactNode;
}

const InfoLabel: FC<InfoLabelProps> = ({ children }) => {
  return <div className="status-label status-label--info">{children}</div>;
};

export default InfoLabel;
