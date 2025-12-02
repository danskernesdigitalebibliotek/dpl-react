import React from "react";
import clsx from "clsx";
import { useText } from "../../../core/utils/text";
import { Operator } from "../types";
import { OPERATOR_ORDER, getOperatorLabels } from "../lib/operators";

type OperatorButtonsProps = {
  value: Operator;
  onChange: (operator: Operator) => void;
};

const OperatorButtons: React.FC<OperatorButtonsProps> = ({
  value,
  onChange
}) => {
  const t = useText();
  const operatorLabels = getOperatorLabels(t);

  return (
    <div className="advanced-search-suggest__operators">
      {OPERATOR_ORDER.map((operator) => (
        <button
          key={operator}
          type="button"
          className={clsx("advanced-search-suggest__operator", {
            "advanced-search-suggest__operator--active": value === operator
          })}
          onClick={() => onChange(operator)}
        >
          {operatorLabels[operator]}
        </button>
      ))}
    </div>
  );
};

export default OperatorButtons;
