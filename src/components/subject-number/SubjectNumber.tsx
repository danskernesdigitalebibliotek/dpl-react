import * as React from "react";
import { FC } from "react";
import { Manifestation } from "../../core/utils/types/entities";

export interface SubjectNumberProps {
  className?: string;
  shelfmark: NonNullable<Manifestation["shelfmark"]>;
}

const SubjectNumber: FC<SubjectNumberProps> = ({
  shelfmark: { shelfmark },
  className = ""
}) => <div className={className}>{shelfmark}</div>;

export default SubjectNumber;
