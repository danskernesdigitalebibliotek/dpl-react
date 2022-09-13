import * as React from "react";
import { FC } from "react";

export interface FindOnShelfModalProps {
  test: string;
}

const FindOnShelfModal: FC<FindOnShelfModalProps> = ({ test }) => {
  return <>Hello {test}</>;
};

export default FindOnShelfModal;
