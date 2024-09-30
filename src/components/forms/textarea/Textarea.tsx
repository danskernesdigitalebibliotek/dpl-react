import clsx from "clsx";
import React, { ChangeEvent, FC } from "react";
import Label from "../label/Label";

export interface TextareaProps {
  id: string;
  name: string;
  label: string;
  rows?: number;
  cols?: number;
  className?: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  defaultValue?: string;
  dataCy?: string;
}

const Textarea: FC<TextareaProps> = ({
  id,
  name,
  label,
  rows = 8,
  cols = 80,
  className,
  placeholder,
  onChange,
  defaultValue,
  dataCy
}) => {
  return (
    <div className="dpl-input">
      <Label id={id}>{label}</Label>
      <div>
        <textarea
          data-cy={dataCy}
          className={clsx(className)}
          id={id}
          name={name}
          rows={rows}
          cols={cols}
          placeholder={placeholder}
          onChange={onChange}
          defaultValue={defaultValue}
        />
      </div>
    </div>
  );
};

export default Textarea;
