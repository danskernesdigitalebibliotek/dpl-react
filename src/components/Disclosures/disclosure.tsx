import React, { FC, ReactElement, ReactNode } from "react";
import { useItemHasBeenVisible } from "../../core/utils/helpers/lazy-load";
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
  const { itemRef, hasBeenVisible: showItem } = useItemHasBeenVisible();

  const summaryWithRef = React.cloneElement(summary, {
    itemRef
  });

  return (
    <details
      className={`disclosure text-body-large ${className}`}
      open={open}
      data-cy={dataCy}
    >
      {summaryWithRef}
      {showItem && children}
    </details>
  );
};

export default Disclosure;
