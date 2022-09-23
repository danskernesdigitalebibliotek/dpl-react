import * as React from "react";
import { FC } from "react";

export interface PagefoldProps {
  text: string;
  state: "success" | "alert";
}

const Pagefold: FC<PagefoldProps> = ({ text, state }) => {
  return (
    <div className="pagefold-parent--xsmall availability-label--unselected text-label availability-label">
      <div
        className={`pagefold-triangle--xsmall pagefold-triangle--xsmall--${state}`}
      />
      <p className="text-label-normal ml-24 mr-8">{text}</p>
    </div>
  );
};

export default Pagefold;
