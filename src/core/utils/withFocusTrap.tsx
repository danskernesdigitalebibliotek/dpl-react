import FocusTrap from "focus-trap-react";
import React, { FC } from "react";

export default <P extends object>(
    Component: React.ComponentType<P>
  ): FC<P & { withFocusTrap?: boolean }> =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ withFocusTrap, ...props }) =>
    (
      <FocusTrap
        focusTrapOptions={{
          allowOutsideClick: true
        }}
      >
        <Component {...(props as P)} />
      </FocusTrap>
    );
