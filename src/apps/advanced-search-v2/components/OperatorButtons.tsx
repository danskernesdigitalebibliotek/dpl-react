import React from "react";
import clsx from "clsx";
import { useText } from "../../../core/utils/text";
import { Operator } from "../types";

type OperatorButtonsProps = {
  value: Operator;
  onChange: (operator: Operator) => void;
};

const OperatorButtons: React.FC<OperatorButtonsProps> = ({
  value,
  onChange
}) => {
  const t = useText();

  const operators: Array<{ value: Operator; label: string }> = [
    { value: "and", label: t("clauseAndText") },
    { value: "or", label: t("clauseOrText") },
    { value: "not", label: t("clauseNotText") }
  ];

  return (
    <div className="advanced-search-suggest__operators">
      {operators.map(({ value: operator, label }) => (
        <button
          key={operator}
          type="button"
          className={clsx("advanced-search-suggest__operator", {
            "advanced-search-suggest__operator--active": value === operator
          })}
          onClick={() => onChange(operator)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default OperatorButtons;
