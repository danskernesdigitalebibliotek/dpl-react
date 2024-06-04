import * as React from "react";
import { FC } from "react";
import { Shelfmark } from "../../core/dbc-gateway/generated/graphql";

export interface SubjectNumberProps {
  className?: string;
  shelfmark: Shelfmark;
}

const SubjectNumber: FC<SubjectNumberProps> = ({
  shelfmark: { shelfmark },
  className = ""
}) => <div className={className}>{shelfmark}</div>;

export default SubjectNumber;
