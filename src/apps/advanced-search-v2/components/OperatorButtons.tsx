import React from "react";
import clsx from "clsx";
import { useText } from "../../../core/utils/text";
import { Operator } from "../types";
import { OPERATOR_ORDER, getOperatorLabelsMap } from "../lib/operators";

type OperatorButtonsProps = {
  value: Operator;
  onChange: (operator: Operator) => void;
};

const OperatorButtons: React.FC<OperatorButtonsProps> = ({
  value,
  onChange
}) => {
  const t = useText();
  const operatorLabelsMap = getOperatorLabelsMap(t);

  return (
    <div className="search-filter__operators">
      {OPERATOR_ORDER.map((operator) => (
        <button
          key={operator}
          type="button"
          className={clsx("search-filter__operator", {
            "search-filter__operator--active": value === operator
          })}
          onClick={() => onChange(operator)}
        >
          {operatorLabelsMap[operator]}
        </button>
      ))}
    </div>
  );
};

export default OperatorButtons;
