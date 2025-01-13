import { FocusTrap } from "focus-trap-react";
import React, { FC } from "react";

export default <P extends object>(Component: React.ComponentType<P>): FC<P> =>
  // eslint-disable-next-line react/display-name
  ({ ...props }) => (
    <FocusTrap
      focusTrapOptions={{
        allowOutsideClick: true
      }}
    >
      <Component {...(props as P)} />
    </FocusTrap>
  );
