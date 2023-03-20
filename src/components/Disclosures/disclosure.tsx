import React, { FC, ReactNode } from "react";
import { useItemHasBeenVisible } from "../../core/utils/helpers/lazy-load";

export interface DisclosureProps {
  children?: ReactNode;
  disclosureIconExpandAltText?: string;
  open?: boolean;
  dataCy?: string;
  detailsClassName: string;
  summaryClassName: string;
  summary: ReactNode;
}

const Disclosure: FC<DisclosureProps> = ({
  children,
  open,
  dataCy = "disclosure",
  detailsClassName,
  summaryClassName,
  summary
}) => {
  const { itemRef, hasBeenVisible: showItem } = useItemHasBeenVisible();

  return (
    <details className={detailsClassName} open={open} data-cy={dataCy}>
      <summary ref={itemRef} className={summaryClassName}>
        {summary}
      </summary>
      {showItem && children}
    </details>
  );
};

export default Disclosure;
