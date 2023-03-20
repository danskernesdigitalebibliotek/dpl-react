import React, { FC, ReactNode, useCallback, useState } from "react";

export interface DisclosureControllableProps {
  id: string;
  children?: ReactNode;
  showContent?: boolean;
  onClick?: () => void;
  cyData?: string;
  detailsClassName: string;
  summaryClassName: string;
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
    setIsOpen(!isOpen);
  }, [isOpen]);

  const disclosureId = `disclosure-${id}`;

  return (
    <div className={detailsClassName}>
      <div
        className={summaryClassName}
        data-cy={cyData}
        onClick={toggleOpen}
        onKeyDown={toggleOpen}
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
