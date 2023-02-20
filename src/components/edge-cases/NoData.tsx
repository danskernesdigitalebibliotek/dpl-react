import React, { FC } from "react";

interface NoDataProps {
  noDataText: string;
}

const NoData: FC<NoDataProps> = ({ noDataText }) => {
  return <div className="py-112 pl-48 bg-global-primary">{noDataText}</div>;
};

export default NoData;
