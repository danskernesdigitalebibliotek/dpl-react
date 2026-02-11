import { FocusTrap } from "focus-trap-react";
import React, { FC } from "react";

export default <P extends object>(Component: React.ComponentType<P>): FC<P> => {
  const withFocusTrap = ({ ...props }) => (
    <FocusTrap
      focusTrapOptions={{
        allowOutsideClick: true
      }}
    >
      <Component
        // TODO: Explicitly define prop types for better clarity
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...(props as P)}
      />
    </FocusTrap>
  );

  return withFocusTrap;
};
