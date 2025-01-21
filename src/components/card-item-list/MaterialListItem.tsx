import React, { ReactNode, forwardRef } from "react";

export interface MaterialListItemProps {
  children: ReactNode;
  className?: string;
}

const MaterialListItem = forwardRef<HTMLLIElement, MaterialListItemProps>(
  ({ children, className }, ref) => {
    return (
      <li
        className={className}
        ref={ref}
        // We use a ref to focus the first item in the new page programmatically when pagination occurs.
        // Set tabIndex -1 to support this without allowing keyboard focus. We have just as appropriate
        // elements within the item suitable for keyboard focus.
        tabIndex={-1}
      >
        {children}
      </li>
    );
  }
);

MaterialListItem.displayName = "MaterialListItem";

export default MaterialListItem;
