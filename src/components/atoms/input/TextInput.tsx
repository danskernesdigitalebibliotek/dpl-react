import React, { FC } from "react";

export interface TextInputProps {
  label: string;
  type: "text" | "password" | "number" | "email";
  id: string;
  required?: boolean;
  description?: string;
  validation?: string;
  onChange: (value: string) => void;
  value?: string | number;
  className?: string;
  pattern?: string;
  inputmode?: "numeric";
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
  pattern,
  inputmode,
  required
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <div className={`${className || "dpl-input"}`}>
      <label htmlFor={id}>{required ? `${label}*` : label}</label>
      <input
        required={required}
        aria-describedby={description ? `description-${id}` : ""}
        id={id}
        data-cy={id}
        type={type}
        pattern={pattern}
        inputMode={inputmode}
        onChange={handleChange}
        value={value}
        aria-labelledby={validation ? `validation-${id}` : ""}
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
