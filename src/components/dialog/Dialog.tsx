import React, { forwardRef } from "react";
import clsx from "clsx";
import iconCross from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/CloseLarge.svg";
import useEscapeKey from "./useEscapeKey";

type DialogType = {
  children: React.ReactNode;
  closeDialog: () => void;
  isSidebar?: boolean;
};

const Dialog = forwardRef<HTMLDialogElement, DialogType>(
  ({ children, closeDialog, isSidebar }, ref) => {
    useEscapeKey({ closeDialog });
    return (
      // The dialog element already has keyboard support
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
      <dialog
        className={clsx("dialog", { "dialog--sidebar": isSidebar })}
        ref={ref}
        // Close dialog when clicking outside of it (::backdrop pseudo-element)
        onClick={({ currentTarget, target }) => {
          if (currentTarget === target) {
            closeDialog();
          }
        }}
      >
        <div className="dialog__top-bar">
          <button
            type="button"
            onClick={closeDialog}
            className="dialog__close-button"
          >
            <img src={iconCross} alt="" aria-label="Close dialog" />
          </button>
        </div>
        {children}
      </dialog>
    );
  }
);

Dialog.displayName = "Dialog";
export default Dialog;
