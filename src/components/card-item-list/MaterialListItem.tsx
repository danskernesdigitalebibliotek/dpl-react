import React, { ReactNode, forwardRef } from "react";

export interface MaterialListItemProps {
  children: ReactNode;
}

const MaterialListItem = forwardRef<HTMLLIElement, MaterialListItemProps>(
  (props, ref) => {
    return (
      <li
        ref={ref}
        // We use a ref to focus the first item in the new page programmatically when pagination occurs.
        // Set tabIndex -1 to support this without allowing keyboard focus. We have just as appropriate
        // elements within the item suitable for keyboard focus.
        tabIndex={-1}
      >
        {props.children}
      </li>
    );
  }
);

export default MaterialListItem;
