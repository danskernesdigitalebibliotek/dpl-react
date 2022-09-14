import React, { FC } from "react";

export interface TextInputProps {
  label: string;
  type: "text" | "password";
  id: string;
  description: string;
  onChange: (value: string) => void;
  value?: string;
}

const TextInput: FC<TextInputProps> = ({
  id,
  label,
  description,
  type,
  onChange,
  value
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <div className="dpl-input">
      <label htmlFor={id}>{label}</label>
      <input
        aria-describedby={`description-${id}`}
        id={id}
        type={type}
        onChange={handleChange}
        value={value}
      />
      {description && (
        <div className="dpl-input__description" id={`description-${id}`}>
          {description}
        </div>
      )}
    </div>
  );
};

export default TextInput;
