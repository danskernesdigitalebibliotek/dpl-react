import clsx from "clsx";
import React, { FC } from "react";

export interface LabelProps {
  id: string;
  children: string;
  className?: string;
}

const Label: FC<LabelProps> = ({ id, className, children }) => (
  <label htmlFor={id} className={clsx(className)}>
    {children}
  </label>
);

export default Label;
