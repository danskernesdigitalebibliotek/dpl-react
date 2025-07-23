import clsx from "clsx";
import React, { FC } from "react";
import Label from "../label/Label";

export interface TextInputProps {
  label?: string;
  type: "text" | "password" | "number" | "email" | "tel";
  id: string;
  required?: boolean;
  description?: string;
  validation?: string;
  onChange: (value: string) => void;
  value?: string | number;
  className?: string;
  labelClassName?: string;
  pattern?: string;
  inputmode?: "numeric";
  title?: string;
  placeholder?: string;
  ariaLabel?: string;
}

const TextInput: FC<TextInputProps> = ({
  id,
  label,
  description,
  validation,
  type,
  onChange,
  value,
  className,
  labelClassName,
  pattern,
  inputmode,
  required,
  title,
  placeholder,
  ariaLabel
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <div
      className={clsx("dpl-input", className, [
        { "dpl-input--invalid": !!validation }
      ])}
    >
      {label && (
        <Label id={id} required={required} className={labelClassName}>
          {label}
        </Label>
      )}
      <input
        className="text-body-medium-medium"
        required={required}
        aria-describedby={description ? `description-${id}` : ""}
        id={id}
        data-cy={id}
        type={type}
        pattern={pattern}
        inputMode={inputmode}
        onChange={handleChange}
        value={value}
        aria-label={ariaLabel || ""}
        aria-labelledby={validation ? `validation-${id}` : ""}
        title={title}
        placeholder={placeholder}
      />
      {description && (
        <div className="dpl-input__description" id={`description-${id}`}>
          {description}
        </div>
      )}
      {validation && (
        <div
          id={`validation-${id}`}
          className="dpl-input__validation"
          role="alert"
        >
          {validation}
        </div>
      )}
    </div>
  );
};

export default TextInput;
