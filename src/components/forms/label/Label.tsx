import clsx from "clsx";
import React, { FC } from "react";

export interface LabelProps {
  id: string;
  children: string;
  className?: string;
  required?: boolean;
}

const Label: FC<LabelProps> = ({ id, className, children, required }) => (
  <label htmlFor={id} className={clsx(className)}>
    {children}
    {required && <span> *</span>}
  </label>
);

export default Label;
