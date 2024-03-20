// The dialog element allready has keyboard support
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { forwardRef } from "react";

type DialogType = {
  children: React.ReactNode;
  closeDialog: () => void;
};

const Dialog = forwardRef<HTMLDialogElement, DialogType>(
  ({ children, closeDialog }, ref) => {
    return (
      <dialog
        ref={ref}
        // close dialog when clicking outside of it (::backdrop pseudo-element)
        onClick={({ currentTarget, target }) => {
          if (currentTarget === target) {
            closeDialog();
          }
        }}
      >
        <button
          type="button"
          onClick={closeDialog}
          style={{
            border: "1px solid black",
            padding: "5px",
            background: "grey"
          }}
        >
          Close
        </button>
        {children}
      </dialog>
    );
  }
);
export default Dialog;
