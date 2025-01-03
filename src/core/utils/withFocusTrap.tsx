import FocusTrap from "focus-trap-react";
import React, { FC } from "react";

export default <P extends object>(
    Component: React.ComponentType<P>
  ): FC<P & { withFocusTrap?: boolean }> =>
  ({ withFocusTrap, ...props }) => (
    <FocusTrap
      focusTrapOptions={{
        allowOutsideClick: true
      }}
    >
      <Component {...(props as P)} />
    </FocusTrap>
  );
