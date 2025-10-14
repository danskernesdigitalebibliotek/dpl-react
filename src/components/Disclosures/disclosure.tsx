import React, { FC, ReactElement, ReactNode } from "react";
import clsx from "clsx";
import { DisclosureSummaryProps } from "./DisclosureSummary";

export interface DisclosureProps {
  children?: ReactNode;
  open?: boolean;
  dataCy?: string;
  className?: string;
  summary: ReactElement<DisclosureSummaryProps>;
}

const Disclosure: FC<DisclosureProps> = ({
  children,
  open,
  dataCy = "disclosure",
  className,
  summary
}) => {
  return (
    <details
      className={clsx("disclosure text-body-large", className)}
      open={open}
      data-cy={dataCy}
    >
      {summary}
      {children}
    </details>
  );
};

export default Disclosure;
