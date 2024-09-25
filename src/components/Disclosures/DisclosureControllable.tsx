import clsx from "clsx";
import React, { FC, ReactNode, useCallback, useState } from "react";

export interface DisclosureControllableProps {
  id: string;
  children?: ReactNode;
  showContent?: boolean;
  onClick?: () => void;
  cyData?: string;
  detailsClassName?: string;
  summaryClassName?: string;
  summary: ReactNode;
}

// It was not possible to use the Disclosure component thats already in the project
// because we don't have control over the open attribute
const DisclosureControllable: FC<DisclosureControllableProps> = ({
  id,
  children,
  showContent = false,
  cyData,
  detailsClassName,
  summaryClassName,
  summary
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(showContent);

  const toggleOpen = useCallback(() => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }, []);

  const handleClick = useCallback(() => {
    toggleOpen();
  }, [toggleOpen]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        toggleOpen();
      }
    },
    [toggleOpen]
  );

  const disclosureId = `disclosure-${id}`;

  return (
    <div className={clsx(detailsClassName)}>
      <div
        className={clsx(summaryClassName)}
        data-cy={cyData}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-controls={disclosureId}
        aria-expanded={isOpen}
      >
        {summary}
      </div>
      {isOpen && <div id={disclosureId}>{children}</div>}
    </div>
  );
};

export default DisclosureControllable;
