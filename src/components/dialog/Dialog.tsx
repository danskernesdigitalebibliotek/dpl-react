// The dialog element allready has keyboard support
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { forwardRef } from "react";
import iconCross from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-cross.svg";

type DialogType = {
  children: React.ReactNode;
  closeDialog: () => void;
};

const Dialog = forwardRef<HTMLDialogElement, DialogType>(
  ({ children, closeDialog }, ref) => {
    return (
      <dialog
        className="dialog"
        ref={ref}
        // Close dialog when clicking outside of it (::backdrop pseudo-element)
        onClick={({ currentTarget, target }) => {
          if (currentTarget === target) {
            closeDialog();
          }
        }}
      >
        <button
          type="button"
          onClick={closeDialog}
          className="dialog__close-button"
        >
          <img src={iconCross} alt="close icon" />
        </button>
        {children}
      </dialog>
    );
  }
);
export default Dialog;
